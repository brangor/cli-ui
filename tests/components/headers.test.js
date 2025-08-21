/**
 * Tests for Header components
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { HeaderComponent } from '../../src/components/headers.js';
import { createBox, createHeader, createGradientHeader } from '../../src/components/headers.js';
import { 
  expectConsoleToContain, 
  expectBoxDrawing, 
  expectColoredOutput, 
  getConsoleOutput 
} from '../test-utils.js';

describe('Header Components', () => {
  let headerComponent;

  beforeEach(() => {
    resetConsoleMocks();
    headerComponent = new HeaderComponent();
  });

  describe('HeaderComponent class', () => {
    it('should create instance with default options', () => {
      expect(headerComponent).toBeInstanceOf(HeaderComponent);
    });

    it('should create basic header', () => {
      headerComponent.create('Test Title', 'Test Subtitle');
      
      expectConsoleToContain('Test Title');
      expectConsoleToContain('Test Subtitle');
      expectBoxDrawing();
    });

    it('should create header with custom options', () => {
      headerComponent.create('Custom Title', 'Custom Subtitle', {
        borderColor: 'red',
        titleColor: 'yellow'
      });
      
      expectConsoleToContain('Custom Title');
      expectConsoleToContain('Custom Subtitle');
      expectBoxDrawing();
      expectColoredOutput();
    });

    it('should create gradient header', () => {
      headerComponent.gradient('Gradient Title', ['#ff0000', '#00ff00']);
      
      expectConsoleToContain('Gradient Title');
      expectColoredOutput();
    });

    it('should create box', () => {
      headerComponent.box('Box Content');
      
      expectConsoleToContain('Box Content');
      expectBoxDrawing();
    });

    it('should handle empty subtitle', () => {
      headerComponent.create('Title Only', '');
      
      expectConsoleToContain('Title Only');
      expectBoxDrawing();
    });

    it('should handle long titles', () => {
      const longTitle = 'This is a very long title that should still work properly';
      headerComponent.create(longTitle, 'Subtitle');
      
      expectConsoleToContain(longTitle);
      expectConsoleToContain('Subtitle');
      expectBoxDrawing();
    });
  });

  describe('Standalone functions', () => {
    it('should export createHeader function', () => {
      expect(typeof createHeader).toBe('function');
      
      createHeader('Function Title', 'Function Subtitle');
      
      expectConsoleToContain('Function Title');
      expectConsoleToContain('Function Subtitle');
    });

    it('should export createGradientHeader function', () => {
      expect(typeof createGradientHeader).toBe('function');
      
      createGradientHeader('Gradient Function');
      
      expectConsoleToContain('Gradient Function');
    });

    it('should export createBox function', () => {
      expect(typeof createBox).toBe('function');
      
      createBox('Box Function Content');
      
      expectConsoleToContain('Box Function Content');
    });
  });

  describe('Edge cases', () => {
    it('should handle special characters in title', () => {
      headerComponent.create('Title with émojis 🚀', 'Subtitle with ñ');
      
      expectConsoleToContain('🚀');
      expectConsoleToContain('ñ');
      expectBoxDrawing();
    });

    it('should handle undefined subtitle', () => {
      headerComponent.create('Title', undefined);
      
      expectConsoleToContain('Title');
      expectBoxDrawing();
    });

    it('should handle empty options object', () => {
      headerComponent.create('Title', 'Subtitle', {});
      
      expectConsoleToContain('Title');
      expectConsoleToContain('Subtitle');
      expectBoxDrawing();
    });
  });
});