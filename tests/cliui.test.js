/**
 * Tests for CLIUI core class
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CLIUI } from '../src/index.js';
import { 
  expectConsoleToContain, 
  expectConsoleClear, 
  expectColoredOutput, 
  expectBoxDrawing,
  expectProgressBar,
  getConsoleOutput
} from './test-utils.js';

describe('CLIUI Core Class', () => {
  let ui;

  beforeEach(() => {
    resetConsoleMocks();
    resetStdoutMocks();
    ui = new CLIUI();
  });

  describe('Constructor', () => {
    it('should create instance with default options', () => {
      expect(ui).toBeInstanceOf(CLIUI);
      expect(ui.options.theme).toBe('retrofuturistic');
      expect(ui.options.colors.primary).toBe('#00d4ff');
    });

    it('should accept custom options', () => {
      const customUI = new CLIUI({
        theme: 'custom',
        colors: { primary: '#ff0000' }
      });
      
      expect(customUI.options.theme).toBe('custom');
      expect(customUI.options.colors.primary).toBe('#ff0000');
    });
  });

  describe('Header Methods', () => {
    it('should create basic header', () => {
      ui.header('Test Title', 'Test Subtitle');
      
      expectConsoleToContain('Test Title');
      expectConsoleToContain('Test Subtitle');
      expectBoxDrawing();
    });

    it('should create gradient header', () => {
      ui.gradientHeader('Gradient Test');
      
      expectConsoleToContain('Gradient Test');
      expectColoredOutput();
    });

    it('should handle empty subtitle', () => {
      ui.header('Title Only');
      
      expectConsoleToContain('Title Only');
      expectBoxDrawing();
    });
  });

  describe('Message Methods', () => {
    it('should display success message', () => {
      ui.success('Success message');
      
      expectConsoleToContain('Success message');
      expectConsoleToContain('✓');
    });

    it('should display error message', () => {
      ui.error('Error message');
      
      expectConsoleToContain('Error message');
      expectConsoleToContain('✗');
    });

    it('should display warning message', () => {
      ui.warning('Warning message');
      
      expectConsoleToContain('Warning message');
      expectConsoleToContain('⚠');
    });

    it('should display info message', () => {
      ui.info('Info message');
      
      expectConsoleToContain('Info message');
      expectConsoleToContain('ℹ');
    });
  });

  describe('Progress Methods', () => {
    it('should create progress bar', () => {
      const bar = ui.createProgressBar(50, 10);
      
      expect(bar).toMatch(/[█░]/);
      expect(bar).toHaveLength(10);
    });

    it('should display status bar', () => {
      ui.statusBar('Loading', 75, 'Almost done');
      
      expectConsoleToContain('Loading');
      expectConsoleToContain('75%');
      expectConsoleToContain('Almost done');
      expectProgressBar();
    });

    it('should create step tracker', () => {
      const steps = [
        { description: 'Step 1' },
        { description: 'Step 2' }
      ];
      
      const tracker = ui.createStepTracker(steps);
      
      expect(tracker).toBeDefined();
      expect(typeof tracker.start).toBe('function');
      expect(typeof tracker.next).toBe('function');
      expect(typeof tracker.complete).toBe('function');
    });
  });

  describe('Display Methods', () => {
    it('should display menu', () => {
      const options = ['Option 1', 'Option 2', 'Option 3'];
      ui.menu('Test Menu', options);
      
      expectConsoleToContain('Test Menu');
      expectConsoleToContain('Option 1');
      expectConsoleToContain('Option 2');
      expectConsoleToContain('Option 3');
    });

    it('should display table', () => {
      const headers = ['Name', 'Age'];
      const rows = [['John', '25'], ['Jane', '30']];
      
      ui.table(headers, rows);
      
      expectConsoleToContain('Name');
      expectConsoleToContain('Age');
      expectConsoleToContain('John');
      expectConsoleToContain('Jane');
      expectBoxDrawing();
    });

    it('should display list', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      ui.list('Test List', items);
      
      expectConsoleToContain('Test List');
      expectConsoleToContain('Item 1');
      expectConsoleToContain('Item 2');
      expectConsoleToContain('Item 3');
    });

    it('should display numbered list', () => {
      const items = ['First', 'Second'];
      ui.list('Numbered List', items, { numbered: true });
      
      expectConsoleToContain('1.');
      expectConsoleToContain('2.');
      expectConsoleToContain('First');
      expectConsoleToContain('Second');
    });
  });

  describe('Utility Methods', () => {
    it('should clear console', () => {
      ui.clear();
      expectConsoleClear();
    });

    it('should create divider', () => {
      ui.divider('=', 20);
      
      const output = getConsoleOutput();
      expect(output).toContain('='.repeat(20));
    });

    it('should create section', () => {
      ui.section('Section Title', 'Section subtitle');
      
      expectConsoleToContain('Section Title');
      expectConsoleToContain('Section subtitle');
    });

    it('should create links', () => {
      const link = ui.link('GitHub', 'https://github.com');
      expect(link).toBeDefined();
      expect(typeof link).toBe('string');
    });

    it('should create gradient text', () => {
      const gradient = ui.gradient('Colorful text');
      expect(gradient).toBeDefined();
      expect(typeof gradient).toBe('string');
    });
  });

  describe('Animation Methods', () => {
    it('should start and stop spinner', async () => {
      const spinner = ui.startSpinner('Loading...');
      expect(spinner).toBeDefined();
      
      // Simulate some work
      await new Promise(resolve => setTimeout(resolve, 100));
      
      ui.stopSpinner(true, 'Done!');
      expect(ui.spinner).toBeNull();
    });

    it('should create loading animation', () => {
      const loading = ui.loading('Processing...');
      expect(loading).toBeDefined();
      expect(typeof loading.stop).toBe('function');
      
      loading.stop('Complete!');
    });

    it('should create countdown', async () => {
      // Mock setTimeout to speed up test
      vi.useFakeTimers();
      
      const countdownPromise = ui.countdown(1, 'Starting in');
      
      // Advance timers step by step
      await vi.advanceTimersByTimeAsync(1000);
      
      await countdownPromise;
      
      vi.useRealTimers();
    }, 15000);
  });

  describe('Cleanup', () => {
    it('should close properly', () => {
      ui.close();
      // Should not throw errors
      expect(true).toBe(true);
    });
  });
});