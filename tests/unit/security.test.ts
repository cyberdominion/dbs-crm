import { describe, it, expect } from 'vitest';
import { normalizeName, slugify } from '@/lib/security';

describe('security helpers', () => {
  it('normalizes names to lowercase single-spaced', () => {
    expect(normalizeName('  Example   Enterprise Ltd  ')).toBe('example enterprise ltd');
    expect(normalizeName('Acme-Corp LLC')).toBe('acme corp llc');
  });

  it('slugifies names', () => {
    expect(slugify('Example Enterprise Ltd')).toBe('example-enterprise-ltd');
    expect(slugify('  Acme   Corp  ')).toBe('acme-corp');
  });
});
