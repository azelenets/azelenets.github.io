import '@testing-library/jest-dom';

Object.defineProperty(window, 'scrollTo', {
  value: () => {},
  writable: true,
});

globalThis.IntersectionObserver = class {
  observe() {}
  disconnect() {}
  unobserve() {}
} as unknown as typeof IntersectionObserver;
