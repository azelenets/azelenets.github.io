import { describe, expect, it } from 'vitest';
import { protocolCards } from '@/constants/protocols';

describe('protocolCards', () => {
  it('contains the expected number of protocol cards', () => {
    expect(protocolCards.length).toBeGreaterThan(0);
  });

  it('defines valid card metadata', () => {
    for (const card of protocolCards) {
      expect(card.id).toBeTruthy();
      expect(card.icon).toBeTruthy();
      expect(card.title).toBeTruthy();
      expect(card.status).toBeTruthy();
      expect(card.description).toBeTruthy();
      expect(card.dots).toBeGreaterThan(0);
    }
  });
});
