import { describe, expect, it } from 'vitest';
import { certifications, combatLanguages, courses, education, tacticalFrameworks } from '@/constants/credentials';

describe('credentials constants', () => {
  it('exports non-empty certifications, courses, and education arrays', () => {
    expect(certifications.length).toBeGreaterThan(0);
    expect(courses.length).toBeGreaterThan(0);
    expect(education.length).toBeGreaterThan(0);
  });

  it('exports non-empty combat languages and tactical frameworks', () => {
    expect(combatLanguages.length).toBeGreaterThan(0);
    expect(tacticalFrameworks.length).toBeGreaterThan(0);
  });

  it('defines valid course URLs and topic lists', () => {
    for (const course of courses) {
      expect(course.id).toBeTruthy();
      expect(course.title).toBeTruthy();
      expect(['Udemy', 'Coursera']).toContain(course.platform);
      expect(course.topics.length).toBeGreaterThan(0);
      expect(() => new URL(course.url)).not.toThrow();
    }
  });

  it('defines education entries with detail fields', () => {
    for (const entry of education) {
      expect(entry.level).toBeTruthy();
      expect(entry.title).toBeTruthy();
      expect(entry.institution).toBeTruthy();
      expect(entry.fields.length).toBeGreaterThan(0);
      for (const field of entry.fields) {
        expect(field.label).toBeTruthy();
        expect(field.value).toBeTruthy();
      }
    }
  });
});
