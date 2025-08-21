/**
 * Tests for Message components
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { MessageComponent } from '../../src/components/messages.js';
import { createSuccess, createError, createWarning, createInfo } from '../../src/components/messages.js';
import { expectConsoleToContain, expectColoredOutput } from '../test-utils.js';

describe('Message Components', () => {
  let messageComponent;

  beforeEach(() => {
    resetConsoleMocks();
    messageComponent = new MessageComponent();
  });

  describe('MessageComponent class', () => {
    it('should create instance with default colors', () => {
      expect(messageComponent).toBeInstanceOf(MessageComponent);
    });

    it('should create instance with custom colors', () => {
      const customComponent = new MessageComponent({
        colors: {
          success: '#00ff00',
          error: '#ff0000'
        }
      });
      
      expect(customComponent.colors.success).toBe('#00ff00');
      expect(customComponent.colors.error).toBe('#ff0000');
    });

    describe('Success messages', () => {
      it('should display success message with checkmark', () => {
        messageComponent.success('Operation completed');
        
        expectConsoleToContain('Operation completed');
        expectConsoleToContain('✓');
        expectColoredOutput();
      });

      it('should handle empty message', () => {
        messageComponent.success('');
        
        expectConsoleToContain('✓');
      });

      it('should handle multiline message', () => {
        const multilineMessage = 'Line 1\nLine 2';
        messageComponent.success(multilineMessage);
        
        expectConsoleToContain('Line 1');
        expectConsoleToContain('Line 2');
        expectConsoleToContain('✓');
      });
    });

    describe('Error messages', () => {
      it('should display error message with X mark', () => {
        messageComponent.error('Something went wrong');
        
        expectConsoleToContain('Something went wrong');
        expectConsoleToContain('✗');
        expectColoredOutput();
      });

      it('should handle error objects', () => {
        messageComponent.error('Error: File not found');
        
        expectConsoleToContain('Error: File not found');
        expectConsoleToContain('✗');
      });
    });

    describe('Warning messages', () => {
      it('should display warning message with warning symbol', () => {
        messageComponent.warning('Check your configuration');
        
        expectConsoleToContain('Check your configuration');
        expectConsoleToContain('⚠');
        expectColoredOutput();
      });

      it('should handle long warning messages', () => {
        const longMessage = 'This is a very long warning message that should still display properly with the warning symbol';
        messageComponent.warning(longMessage);
        
        expectConsoleToContain(longMessage);
        expectConsoleToContain('⚠');
      });
    });

    describe('Info messages', () => {
      it('should display info message with info symbol', () => {
        messageComponent.info('Here is some information');
        
        expectConsoleToContain('Here is some information');
        expectConsoleToContain('ℹ');
        expectColoredOutput();
      });

      it('should handle numeric info', () => {
        messageComponent.info('Progress: 75%');
        
        expectConsoleToContain('Progress: 75%');
        expectConsoleToContain('ℹ');
      });
    });
  });

  describe('Standalone functions', () => {
    it('should export createSuccess function', () => {
      expect(typeof createSuccess).toBe('function');
      
      createSuccess('Success from function');
      
      expectConsoleToContain('Success from function');
      expectConsoleToContain('✓');
    });

    it('should export createError function', () => {
      expect(typeof createError).toBe('function');
      
      createError('Error from function');
      
      expectConsoleToContain('Error from function');
      expectConsoleToContain('✗');
    });

    it('should export createWarning function', () => {
      expect(typeof createWarning).toBe('function');
      
      createWarning('Warning from function');
      
      expectConsoleToContain('Warning from function');
      expectConsoleToContain('⚠');
    });

    it('should export createInfo function', () => {
      expect(typeof createInfo).toBe('function');
      
      createInfo('Info from function');
      
      expectConsoleToContain('Info from function');
      expectConsoleToContain('ℹ');
    });
  });

  describe('Special characters and formatting', () => {
    it('should handle messages with emojis', () => {
      messageComponent.success('Deployment successful! 🚀');
      
      expectConsoleToContain('🚀');
      expectConsoleToContain('✓');
    });

    it('should handle messages with special characters', () => {
      messageComponent.info('File: ~/Documents/test-file.txt');
      
      expectConsoleToContain('~/Documents/test-file.txt');
      expectConsoleToContain('ℹ');
    });

    it('should handle messages with numbers and symbols', () => {
      messageComponent.warning('Memory usage: 85% (>80%)');
      
      expectConsoleToContain('Memory usage: 85% (>80%)');
      expectConsoleToContain('⚠');
    });
  });

  describe('Edge cases', () => {
    it('should handle null message', () => {
      messageComponent.success(null);
      
      expectConsoleToContain('✓');
    });

    it('should handle undefined message', () => {
      messageComponent.error(undefined);
      
      expectConsoleToContain('✗');
    });

    it('should handle boolean message', () => {
      messageComponent.info(true);
      
      expectConsoleToContain('true');
      expectConsoleToContain('ℹ');
    });

    it('should handle number message', () => {
      messageComponent.warning(42);
      
      expectConsoleToContain('42');
      expectConsoleToContain('⚠');
    });
  });
});