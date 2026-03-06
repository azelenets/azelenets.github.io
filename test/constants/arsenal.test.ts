import { describe, it, expect } from 'vitest';
import { stackColumns, specCards } from '@/constants/arsenal';

describe('stackColumns', () => {
  it('has at least one column', () => {
    expect(stackColumns.length).toBeGreaterThan(0);
  });

  it('every column has required fields', () => {
    for (const col of stackColumns) {
      expect(col.type).toBeTruthy();
      expect(col.title).toBeTruthy();
      expect(col.id).toBeTruthy();
      expect(col.desc).toBeTruthy();
      expect(Array.isArray(col.items)).toBe(true);
      expect(col.items.length).toBeGreaterThan(0);
    }
  });

  it('column ids are unique', () => {
    const ids = stackColumns.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every tech item has name, version, and status', () => {
    for (const col of stackColumns) {
      for (const item of col.items) {
        expect(item.name).toBeTruthy();
        expect(item.version).toBeTruthy();
        expect(item.status).toBeTruthy();
      }
    }
  });

  it('isCritical and isMaster are booleans when present', () => {
    for (const col of stackColumns) {
      for (const item of col.items) {
        if (item.isCritical !== undefined) expect(typeof item.isCritical).toBe('boolean');
        if (item.isMaster !== undefined) expect(typeof item.isMaster).toBe('boolean');
      }
    }
  });
});

describe('specCards', () => {
  it('has exactly 4 spec cards', () => {
    expect(specCards).toHaveLength(4);
  });

  it('every spec card has title, subtitle, and img', () => {
    for (const card of specCards) {
      expect(card.title).toBeTruthy();
      expect(card.subtitle).toBeTruthy();
      expect(card.img).toBeTruthy();
    }
  });
});
