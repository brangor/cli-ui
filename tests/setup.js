/**
 * Test setup for CLI UI
 * Mocks console methods and provides test utilities
 */

import { vi } from 'vitest';

// Mock console methods to capture output instead of printing
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  clear: console.clear
};

// Storage for captured output
global.consoleMocks = {
  logs: [],
  errors: [],
  warns: [],
  clears: 0
};

// Mock console methods
console.log = vi.fn((...args) => {
  global.consoleMocks.logs.push(args.join(' '));
});

console.error = vi.fn((...args) => {
  global.consoleMocks.errors.push(args.join(' '));
});

console.warn = vi.fn((...args) => {
  global.consoleMocks.warns.push(args.join(' '));
});

console.clear = vi.fn(() => {
  global.consoleMocks.clears++;
});

// Utility to reset console mocks between tests
global.resetConsoleMocks = () => {
  global.consoleMocks.logs = [];
  global.consoleMocks.errors = [];
  global.consoleMocks.warns = [];
  global.consoleMocks.clears = 0;
  vi.clearAllMocks();
};

// Utility to restore original console (for debugging tests)
global.restoreConsole = () => {
  console.log = originalConsole.log;
  console.error = originalConsole.error;
  console.warn = originalConsole.warn;
  console.clear = originalConsole.clear;
};

// Mock process.stdout.write for progress indicators
const originalWrite = process.stdout.write;
global.stdoutMocks = {
  writes: []
};

process.stdout.write = vi.fn((data) => {
  global.stdoutMocks.writes.push(data.toString());
  return true;
});

global.resetStdoutMocks = () => {
  global.stdoutMocks.writes = [];
  vi.mocked(process.stdout.write).mockClear();
};

global.restoreStdout = () => {
  process.stdout.write = originalWrite;
};