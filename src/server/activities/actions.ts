import { db } from '@/lib/db';
import { auditLog } from '@/server/audit/actions';

export async function logActivity(
  prospectId: string,
  data: any,
  userId: string,
  organizationId: string
) {
  const activity = await db.activity.create({
    data: {
      ...data,
      prospectId,
      organizationId,
      userId,
    },
  });

  await auditLog({
    organizationId,
    userId,
    action: 'ACTIVITY_CREATE',
    entityType: 'Activity',
    entityId: activity.id,
    metadata: JSON.stringify({ prospectId, type: activity.type }),
  });

  return activity;
}

export async function getActivitiesForProspect(prospectId: string) {
  return db.activity.findMany({
    where: { prospectId },
    include: { user: { select: { id: true, name: true, role: true } } },
    orderBy: { eventAt: 'desc' },
  });
}
