import { db } from '@/lib/db';

export async function auditLog(data: {
  organizationId?: string;
  userId?: string;
  action: string;
  entityType?: string;
  entityId?: string;
  metadata?: string;
  correlationId?: string;
}) {
  return db.auditLog.create({
    data: {
      organizationId: data.organizationId ?? null,
      userId: data.userId ?? null,
      action: data.action,
      entityType: data.entityType ?? null,
      entityId: data.entityId ?? null,
      metadata: data.metadata ?? null,
      correlationId: data.correlationId ?? null,
    },
  });
}

export async function getAuditLogs(organizationId: string, limit = 100) {
  return db.auditLog.findMany({
    where: { organizationId },
    include: { user: { select: { id: true, name: true, role: true } } },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}
