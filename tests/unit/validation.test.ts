import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { prospectSchema, activitySchema, taskSchema, reportSchema } from '@/lib/validation';

describe('prospect validation', () => {
  it('accepts valid prospect input', () => {
    const result = prospectSchema.safeParse({
      businessName: 'Acme Ltd',
      stage: 'NEW',
      priority: 'HIGH',
      email: 'test@example.com',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing business name', () => {
    const result = prospectSchema.safeParse({ stage: 'NEW' });
    expect(result.success).toBe(false);
  });
});

describe('activity validation', () => {
  it('accepts valid activity input', () => {
    const result = activitySchema.safeParse({
      prospectId: 'c1',
      type: 'CALL',
      eventAt: '2026-10-16T10:00:00Z',
      summary: 'Called prospect',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing summary', () => {
    const result = activitySchema.safeParse({
      prospectId: 'c1',
      type: 'CALL',
      eventAt: '2026-10-16T10:00:00Z',
    });
    expect(result.success).toBe(false);
  });
});

describe('task validation', () => {
  it('accepts valid task input', () => {
    const result = taskSchema.safeParse({
      title: 'Follow up',
      assigneeId: 'u1',
    });
    expect(result.success).toBe(true);
  });

  it('rejects missing title', () => {
    const result = taskSchema.safeParse({ assigneeId: 'u1' });
    expect(result.success).toBe(false);
  });
});

describe('report validation', () => {
  it('accepts valid report input', () => {
    const result = reportSchema.safeParse({
      businessDate: '2026-10-16',
      prospectsIdentified: 5,
    });
    expect(result.success).toBe(true);
  });

  it('rejects negative metrics', () => {
    const result = reportSchema.safeParse({
      businessDate: '2026-10-16',
      prospectsIdentified: -1,
    });
    expect(result.success).toBe(false);
  });
});
