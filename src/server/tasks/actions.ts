import { db } from '@/lib/db';
import { auditLog } from '@/server/audit/actions';

export async function createTask(data: any, userId: string, organizationId: string) {
  const task = await db.task.create({
    data: {
      ...data,
      organizationId,
      creatorId: userId,
    },
  });

  await auditLog({
    organizationId,
    userId,
    action: 'TASK_CREATE',
    entityType: 'Task',
    entityId: task.id,
  });

  return task;
}

export async function completeTask(id: string, userId: string, organizationId: string) {
  const task = await db.task.update({
    where: { id },
    data: { status: 'COMPLETED', completedAt: new Date(), updatedAt: new Date() },
  });

  await auditLog({
    organizationId,
    userId,
    action: 'TASK_COMPLETE',
    entityType: 'Task',
    entityId: id,
  });

  return task;
}

export async function getTasks(organizationId: string, assigneeId?: string) {
  return db.task.findMany({
    where: { organizationId, ...(assigneeId ? { assigneeId } : {}) },
    include: { assignee: { select: { id: true, name: true } }, prospect: true },
    orderBy: { dueAt: 'asc' },
  });
}
