import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'examples/',
        'bin/',
        '*.config.js',
        'coverage/',
        'dist/'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    },
    // Mock console methods to avoid cluttering test output
    setupFiles: ['./tests/setup.js'],
    // Allow longer timeouts for CLI animations
    testTimeout: 10000
  }
});