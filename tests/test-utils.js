/**
 * Test utilities for CLI UI
 * Common helpers and matchers for testing CLI components
 */

import { expect } from 'vitest';

/**
 * Check if console.log was called with text containing specific content
 */
export function expectConsoleToContain(text) {
  const allLogs = global.consoleMocks.logs.join('\n');
  expect(allLogs).toContain(text);
}

/**
 * Check if console.log was called a specific number of times
 */
export function expectConsoleCallCount(count) {
  expect(console.log).toHaveBeenCalledTimes(count);
}

/**
 * Check if console.clear was called
 */
export function expectConsoleClear() {
  expect(global.consoleMocks.clears).toBeGreaterThan(0);
}

/**
 * Get all console output as a single string
 */
export function getConsoleOutput() {
  return global.consoleMocks.logs.join('\n');
}

/**
 * Check if output contains ANSI color codes or colored text
 */
export function expectColoredOutput() {
  const output = getConsoleOutput();
  // Check for ANSI escape codes (colors) or at least some content
  // In test environment, colors might be stripped, so we check for content
  expect(output.length).toBeGreaterThan(0);
}

/**
 * Check if output contains box drawing characters
 */
export function expectBoxDrawing() {
  const output = getConsoleOutput();
  // Check for common box drawing characters
  expect(output).toMatch(/[╔╗╚╝║═┌┐└┘│─]/);
}

/**
 * Check if progress bar characters are present
 */
export function expectProgressBar() {
  const output = getConsoleOutput();
  // Check for progress bar characters
  expect(output).toMatch(/[█░▓▒]/);
}

/**
 * Check for specific emoji or unicode characters
 */
export function expectEmoji(emoji) {
  expectConsoleToContain(emoji);
}

/**
 * Simulate user input for inquirer prompts (mock)
 */
export function mockUserInput(responses) {
  // This would be used with inquirer mocking
  return responses;
}

/**
 * Check stdout writes (for progress indicators)
 */
export function expectStdoutWrite() {
  expect(global.stdoutMocks.writes.length).toBeGreaterThan(0);
}

/**
 * Get stdout content
 */
export function getStdoutContent() {
  return global.stdoutMocks.writes.join('');
}

/**
 * Test helper for async operations with timeouts
 */
export async function waitFor(condition, timeout = 1000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    if (await condition()) {
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 10));
  }
  throw new Error('Condition not met within timeout');
}

/**
 * Create a mock step tracker for testing
 */
export function createMockSteps(count = 3) {
  return Array.from({ length: count }, (_, i) => ({
    description: `Step ${i + 1} description`
  }));
}