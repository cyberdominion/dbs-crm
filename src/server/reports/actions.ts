import { db } from '@/lib/db';
import { auditLog } from '@/server/audit/actions';

export async function submitReport(data: any, userId: string, organizationId: string) {
  const report = await db.dailyReport.create({
    data: {
      ...data,
      organizationId,
      userId,
    },
  });

  await auditLog({
    organizationId,
    userId,
    action: 'REPORT_SUBMIT',
    entityType: 'DailyReport',
    entityId: report.id,
    metadata: JSON.stringify({ businessDate: data.businessDate }),
  });

  return report;
}

export async function reviewReport(
  id: string,
  status: 'REVIEWED' | 'REJECTED',
  reviewerId: string,
  organizationId: string
) {
  const report = await db.dailyReport.update({
    where: { id },
    data: { status, reviewedAt: new Date(), reviewerId },
  });

  await auditLog({
    organizationId,
    userId: reviewerId,
    action: 'REPORT_REVIEW',
    entityType: 'DailyReport',
    entityId: id,
    metadata: JSON.stringify({ status }),
  });

  return report;
}

export async function getReports(organizationId: string, userId?: string) {
  return db.dailyReport.findMany({
    where: { organizationId, ...(userId ? { userId } : {}) },
    include: { user: { select: { id: true, name: true, role: true } } },
    orderBy: { businessDate: 'desc' },
  });
}
