import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock IntersectionObserver for tests
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback;
  }
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

window.IntersectionObserver = MockIntersectionObserver;

// Mock window.scrollTo
window.scrollTo = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
