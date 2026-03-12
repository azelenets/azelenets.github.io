import { describe, expect, it } from 'vitest';
import { missions } from '@/constants/missions';

describe('missions', () => {
  it('contains at least one mission', () => {
    expect(missions.length).toBeGreaterThan(0);
  });

  it('defines required fields for each mission', () => {
    for (const mission of missions) {
      expect(mission.date).toBeTruthy();
      expect(mission.title).toBeTruthy();
      expect(mission.role).toBeTruthy();
      expect(mission.scanId).toBeTruthy();
      expect(mission.objective).toBeTruthy();
      expect(mission.tactics.length).toBeGreaterThan(0);
      expect(mission.outcome).toBeTruthy();
      expect(mission.status).toBeTruthy();
      expect(mission.statusColor).toBeTruthy();
      expect(['left', 'right']).toContain(mission.align);
      if (mission.tools) expect(mission.tools.length).toBeGreaterThan(0);
      if (mission.imageUrl) expect(mission.imageUrl.startsWith('/images/')).toBe(true);
    }
  });

  it('uses unique mission titles', () => {
    const titles = missions.map((mission) => mission.title);
    expect(new Set(titles).size).toBe(titles.length);
  });
});
