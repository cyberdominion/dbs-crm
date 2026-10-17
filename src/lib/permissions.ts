import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const PERMISSIONS = {
  PROSPECT_CREATE: 'prospect:create',
  PROSPECT_READ_ANY: 'prospect:read:any',
  PROSPECT_READ_ASSIGNED: 'prospect:read:assigned',
  PROSPECT_UPDATE_ANY: 'prospect:update:any',
  PROSPECT_UPDATE_ASSIGNED: 'prospect:update:assigned',
  PROSPECT_ASSIGN: 'prospect:assign',
  ACTIVITY_CREATE: 'activity:create',
  TASK_MANAGE_ANY: 'task:manage:any',
  REPORT_SUBMIT: 'report:submit',
  REPORT_REVIEW: 'report:review',
  USER_MANAGE: 'user:manage',
  AUDIT_READ: 'audit:read',
  EXPORT_EXECUTE: 'export:execute',
} as const;

export type Role = 'CEO' | 'ASSISTANT';

const ROLE_PERMISSIONS: Record<Role, string[]> = {
  CEO: Object.values(PERMISSIONS),
  ASSISTANT: [
    PERMISSIONS.PROSPECT_CREATE,
    PERMISSIONS.PROSPECT_READ_ASSIGNED,
    PERMISSIONS.PROSPECT_UPDATE_ASSIGNED,
    PERMISSIONS.ACTIVITY_CREATE,
    PERMISSIONS.TASK_MANAGE_ANY,
    PERMISSIONS.REPORT_SUBMIT,
  ],
};

export function hasPermission(role: Role, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export async function getSession() {
  return getServerSession(authOptions);
}

export async function assertPermission(permission: string) {
  const session = await getSession();
  if (!session?.user) {
    throw new Error('Unauthenticated');
  }
  const role = session.user.role as Role;
  if (!hasPermission(role, permission)) {
    throw new Error('Forbidden');
  }
  return session;
}
