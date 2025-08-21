/**
 * Tests for Progress components
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { ProgressComponent } from '../../src/components/progress.js';
import { createProgressBar, createStatusBar, createStepTracker } from '../../src/components/progress.js';
import { 
  expectConsoleToContain, 
  expectProgressBar,
  createMockSteps,
  getConsoleOutput
} from '../test-utils.js';

describe('Progress Components', () => {
  let progressComponent;

  beforeEach(() => {
    resetConsoleMocks();
    progressComponent = new ProgressComponent();
  });

  describe('ProgressComponent class', () => {
    it('should create instance', () => {
      expect(progressComponent).toBeInstanceOf(ProgressComponent);
    });

    describe('Progress bars', () => {
      it('should create progress bar with correct length', () => {
        const bar = progressComponent.bar(50, 10);
        expect(bar).toHaveLength(10);
        expect(bar).toMatch(/[█░]/);
      });

      it('should create full progress bar', () => {
        const bar = progressComponent.bar(100, 10);
        expect(bar).toBe('██████████');
      });

      it('should create empty progress bar', () => {
        const bar = progressComponent.bar(0, 10);
        expect(bar).toBe('░░░░░░░░░░');
      });

      it('should handle edge percentages', () => {
        const bar1 = progressComponent.bar(1, 10);
        const bar99 = progressComponent.bar(99, 10);
        
        expect(bar1).toMatch(/[█░]/);
        expect(bar99).toMatch(/[█░]/);
      });

      it('should use default width', () => {
        const bar = progressComponent.bar(50);
        expect(bar).toHaveLength(20); // default width
      });
    });

    describe('Status bars', () => {
      it('should display status bar with all components', () => {
        progressComponent.statusBar('Loading data', 75, 'Almost complete');
        
        expectConsoleToContain('Loading data');
        expectConsoleToContain('75%');
        expectConsoleToContain('Almost complete');
        expectProgressBar();
      });

      it('should handle default progress', () => {
        progressComponent.statusBar('Processing');
        
        expectConsoleToContain('Processing');
        expectConsoleToContain('0%');
      });

      it('should handle empty details', () => {
        progressComponent.statusBar('Working', 50, '');
        
        expectConsoleToContain('Working');
        expectConsoleToContain('50%');
      });
    });

    describe('Step tracker', () => {
      it('should create step tracker', () => {
        const steps = createMockSteps(3);
        const mockUI = { statusBar: vi.fn() };
        const tracker = progressComponent.tracker(steps, mockUI);
        
        expect(tracker).toBeDefined();
        expect(typeof tracker.start).toBe('function');
        expect(typeof tracker.next).toBe('function');
        expect(typeof tracker.complete).toBe('function');
      });

      it('should track progress through steps', () => {
        const steps = createMockSteps(2);
        const mockUI = { statusBar: vi.fn() };
        const tracker = progressComponent.tracker(steps, mockUI);
        
        tracker.start();
        expect(mockUI.statusBar).toHaveBeenCalled();
        
        tracker.next();
        expect(mockUI.statusBar).toHaveBeenCalledTimes(2);
        
        tracker.complete();
        expectConsoleToContain('All steps completed!');
      });

      it('should not advance beyond last step', () => {
        const steps = createMockSteps(1);
        const mockUI = { statusBar: vi.fn() };
        const tracker = progressComponent.tracker(steps, mockUI);
        
        tracker.start();
        tracker.next(); // Should not advance past the end
        
        expect(mockUI.statusBar).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Standalone functions', () => {
    it('should export createProgressBar function', () => {
      expect(typeof createProgressBar).toBe('function');
      
      const bar = createProgressBar(60, 15);
      expect(bar).toHaveLength(15);
      expect(bar).toMatch(/[█░]/);
    });

    it('should export createStatusBar function', () => {
      expect(typeof createStatusBar).toBe('function');
      
      createStatusBar('Test operation', 80, 'Test details');
      
      expectConsoleToContain('Test operation');
      expectConsoleToContain('80%');
      expectConsoleToContain('Test details');
    });

    it('should export createStepTracker function', () => {
      expect(typeof createStepTracker).toBe('function');
      
      const steps = createMockSteps(2);
      const tracker = createStepTracker(steps);
      
      expect(tracker).toBeDefined();
    });
  });

  describe('Edge cases', () => {
    it('should handle negative percentages', () => {
      const bar = progressComponent.bar(-10, 10);
      expect(bar).toBe('░░░░░░░░░░'); // Should treat as 0%
    });

    it('should handle percentages over 100', () => {
      const bar = progressComponent.bar(150, 10);
      expect(bar).toBe('██████████'); // Should treat as 100%
    });

    it('should handle zero width', () => {
      const bar = progressComponent.bar(50, 0);
      expect(bar).toBe('');
    });

    it('should handle empty steps array', () => {
      const mockUI = { statusBar: vi.fn() };
      const tracker = progressComponent.tracker([], mockUI);
      
      tracker.start();
      tracker.complete();
      
      expectConsoleToContain('All steps completed!');
    });
  });
});