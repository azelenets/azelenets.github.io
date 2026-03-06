import { describe, it, expect } from 'vitest';
import { navItems } from '@/constants/navigation';

describe('navItems', () => {
  it('has 6 items', () => {
    expect(navItems).toHaveLength(6);
  });

  it('every item has label, num, and path', () => {
    for (const item of navItems) {
      expect(item.label).toBeTruthy();
      expect(item.num).toBeTruthy();
      expect(item.path).toBeTruthy();
    }
  });

  it('first item is root path', () => {
    expect(navItems[0].path).toBe('/');
  });

  it('all paths start with /', () => {
    for (const item of navItems) {
      expect(item.path).toMatch(/^\//);
    }
  });

  it('nums are zero-padded two-digit strings in order', () => {
    const nums = navItems.map((i) => i.num);
    expect(nums).toEqual(['01', '02', '03', '04', '05', '06']);
  });

  it('paths are unique', () => {
    const paths = navItems.map((i) => i.path);
    expect(new Set(paths).size).toBe(paths.length);
  });
});
