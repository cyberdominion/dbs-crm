import { describe, it, expect } from 'vitest';
import { hasPermission, PERMISSIONS, type Role } from '@/lib/permissions';

describe('role permissions', () => {
  it('CEO has all permissions', () => {
    for (const perm of Object.values(PERMISSIONS)) {
      expect(hasPermission('CEO' as Role, perm)).toBe(true);
    }
  });

  it('assistant cannot manage users', () => {
    expect(hasPermission('ASSISTANT' as Role, PERMISSIONS.USER_MANAGE)).toBe(false);
  });

  it('assistant cannot read audit', () => {
    expect(hasPermission('ASSISTANT' as Role, PERMISSIONS.AUDIT_READ)).toBe(false);
  });

  it('assistant can submit reports', () => {
    expect(hasPermission('ASSISTANT' as Role, PERMISSIONS.REPORT_SUBMIT)).toBe(true);
  });

  it('assistant cannot review reports', () => {
    expect(hasPermission('ASSISTANT' as Role, PERMISSIONS.REPORT_REVIEW)).toBe(false);
  });
});
