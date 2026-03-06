import { describe, it, expect } from 'vitest';
import { labCards } from '@/constants/lab';

describe('labCards', () => {
  it('has at least one card', () => {
    expect(labCards.length).toBeGreaterThan(0);
  });

  it('every card has required fields', () => {
    for (const card of labCards) {
      expect(card.id).toBeTruthy();
      expect(card.codename).toBeTruthy();
      expect(card.title).toBeTruthy();
      expect(card.desc).toBeTruthy();
      expect(card.status).toBeTruthy();
      expect(card.statusColor).toBeTruthy();
      expect(['primary', 'hazard', 'alert']).toContain(card.color);
      expect(card.stats).toBeTruthy();
      expect(card.action).toBeTruthy();
      expect(card.icon).toBeTruthy();
    }
  });

  it('ids are unique', () => {
    const ids = labCards.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('NEXUS-FORGE card has a link', () => {
    const nexus = labCards.find((c) => c.title === 'NEXUS-FORGE');
    expect(nexus).toBeDefined();
    expect(nexus!.link).toBeTruthy();
  });

  it('link field is a valid URL when present', () => {
    for (const card of labCards) {
      if (card.link !== undefined) {
        expect(() => new URL(card.link!)).not.toThrow();
      }
    }
  });
});
