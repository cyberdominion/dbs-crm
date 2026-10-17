import { db } from '@/lib/db';
import { auditLog } from '@/server/audit/actions';
import { assertPermission, getSession, PERMISSIONS } from '@/lib/permissions';
import { hash } from 'bcryptjs';

export async function getUsers(organizationId: string) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error('Unauthenticated');
  }

  return db.user.findMany({
    where: { organizationId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
      _count: { select: { prospects: true, tasks: true, submittedReports: true } },
    },
    orderBy: { createdAt: 'asc' },
  });
}

export async function createUser(data: {
  email: string;
  name: string;
  role: 'CEO' | 'ASSISTANT';
  password: string;
}) {
  const session = await assertPermission(PERMISSIONS.USER_MANAGE);
  const organizationId = session.user.organizationId;

  const existing = await db.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new Error('A user with this email already exists');
  }

  const passwordHash = await hash(data.password, 12);

  const user = await db.user.create({
    data: {
      email: data.email,
      name: data.name,
      role: data.role,
      organizationId,
      emailVerified: new Date(),
      passwordHash,
    },
  });

  await auditLog({
    organizationId,
    userId: session.user.id,
    action: 'USER_CREATE',
    entityType: 'User',
    entityId: user.id,
  });

  return user;
}

export async function updateUserRole(id: string, role: 'CEO' | 'ASSISTANT') {
  const session = await assertPermission(PERMISSIONS.USER_MANAGE);
  const organizationId = session.user.organizationId;

  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  if (user.organizationId !== organizationId) {
    throw new Error('Forbidden');
  }
  if (user.id === session.user.id && role !== user.role) {
    throw new Error('Cannot change your own role');
  }

  const updated = await db.user.update({
    where: { id },
    data: { role },
  });

  await auditLog({
    organizationId,
    userId: session.user.id,
    action: 'USER_UPDATE',
    entityType: 'User',
    entityId: id,
    metadata: JSON.stringify({ changedField: 'role', newValue: role }),
  });

  return updated;
}

export async function deleteUser(id: string) {
  const session = await assertPermission(PERMISSIONS.USER_MANAGE);
  const organizationId = session.user.organizationId;

  const user = await db.user.findUnique({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  if (user.organizationId !== organizationId) {
    throw new Error('Forbidden');
  }
  if (user.id === session.user.id) {
    throw new Error('Cannot delete yourself');
  }

  await db.user.delete({ where: { id } });

  await auditLog({
    organizationId,
    userId: session.user.id,
    action: 'USER_DELETE',
    entityType: 'User',
    entityId: id,
  });
}
