/**
 * Tests for Display components
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { DisplayComponent } from '../../src/components/display.js';
import { createMenu, createTable, createList } from '../../src/components/display.js';
import { 
  expectConsoleToContain, 
  expectBoxDrawing, 
  expectColoredOutput,
  getConsoleOutput
} from '../test-utils.js';

describe('Display Components', () => {
  let displayComponent;

  beforeEach(() => {
    resetConsoleMocks();
    displayComponent = new DisplayComponent();
  });

  describe('DisplayComponent class', () => {
    it('should create instance', () => {
      expect(displayComponent).toBeInstanceOf(DisplayComponent);
    });

    describe('Menus', () => {
      it('should display menu with title and options', () => {
        const options = ['Option 1', 'Option 2', 'Option 3'];
        displayComponent.menu('Test Menu', options);
        
        expectConsoleToContain('Test Menu');
        expectConsoleToContain('Option 1');
        expectConsoleToContain('Option 2');
        expectConsoleToContain('Option 3');
        expectColoredOutput();
      });

      it('should highlight selected option', () => {
        const options = ['First', 'Second', 'Third'];
        displayComponent.menu('Menu', options, 1); // Select second option
        
        expectConsoleToContain('First');
        expectConsoleToContain('Second');
        expectConsoleToContain('Third');
        expectConsoleToContain('►'); // Selection indicator
      });

      it('should handle default selection (first item)', () => {
        const options = ['Default', 'Other'];
        displayComponent.menu('Menu', options);
        
        expectConsoleToContain('►'); // Should highlight first item by default
      });

      it('should handle empty options array', () => {
        displayComponent.menu('Empty Menu', []);
        
        expectConsoleToContain('Empty Menu');
      });

      it('should handle single option', () => {
        displayComponent.menu('Single', ['Only Option']);
        
        expectConsoleToContain('Single');
        expectConsoleToContain('Only Option');
        expectConsoleToContain('►');
      });
    });

    describe('Tables', () => {
      it('should display table with headers and rows', () => {
        const headers = ['Name', 'Age', 'City'];
        const rows = [
          ['John', '25', 'New York'],
          ['Jane', '30', 'London'],
          ['Bob', '35', 'Tokyo']
        ];
        
        displayComponent.table(headers, rows);
        
        // Check headers
        expectConsoleToContain('Name');
        expectConsoleToContain('Age');
        expectConsoleToContain('City');
        
        // Check data
        expectConsoleToContain('John');
        expectConsoleToContain('Jane');
        expectConsoleToContain('Bob');
        
        // Check table formatting
        expectBoxDrawing();
      });

      it('should handle empty table', () => {
        displayComponent.table(['Header'], []);
        
        expectConsoleToContain('Header');
        expectBoxDrawing();
      });

      it('should handle table with mixed data types', () => {
        const headers = ['Item', 'Count', 'Active'];
        const rows = [
          ['Widget', 42, true],
          ['Gadget', 0, false]
        ];
        
        displayComponent.table(headers, rows);
        
        expectConsoleToContain('Widget');
        expectConsoleToContain('42');
        expectConsoleToContain('true');
        expectConsoleToContain('false');
      });

      it('should handle null/undefined values in table', () => {
        const headers = ['Name', 'Value'];
        const rows = [
          ['Test', null],
          [undefined, 'Data']
        ];
        
        displayComponent.table(headers, rows);
        
        expectConsoleToContain('Name');
        expectConsoleToContain('Value');
        expectConsoleToContain('Test');
        expectConsoleToContain('Data');
      });

      it('should handle varying column widths', () => {
        const headers = ['Short', 'Very Long Header Name'];
        const rows = [
          ['A', 'Short'],
          ['Very Long Data Entry', 'B']
        ];
        
        displayComponent.table(headers, rows);
        
        expectConsoleToContain('Very Long Header Name');
        expectConsoleToContain('Very Long Data Entry');
        expectBoxDrawing();
      });
    });

    describe('Lists', () => {
      it('should display basic list', () => {
        const items = ['First item', 'Second item', 'Third item'];
        displayComponent.list('My List', items);
        
        expectConsoleToContain('My List');
        expectConsoleToContain('First item');
        expectConsoleToContain('Second item');
        expectConsoleToContain('Third item');
        expectConsoleToContain('•'); // Bullet point
      });

      it('should display numbered list', () => {
        const items = ['Step one', 'Step two'];
        displayComponent.list('Steps', items, { numbered: true });
        
        expectConsoleToContain('Steps');
        expectConsoleToContain('Step one');
        expectConsoleToContain('Step two');
        expectConsoleToContain('1.');
        expectConsoleToContain('2.');
      });

      it('should display colored list', () => {
        const items = ['Success item', 'Another item'];
        displayComponent.list('Colored List', items, { color: 'green' });
        
        expectConsoleToContain('Success item');
        expectConsoleToContain('Another item');
        expectColoredOutput();
      });

      it('should handle empty list', () => {
        displayComponent.list('Empty List', []);
        
        expectConsoleToContain('Empty List');
      });

      it('should handle list with one item', () => {
        displayComponent.list('Single Item', ['Only one']);
        
        expectConsoleToContain('Single Item');
        expectConsoleToContain('Only one');
        expectConsoleToContain('•');
      });

      it('should handle numbered and colored list', () => {
        const items = ['Item A', 'Item B'];
        displayComponent.list('Fancy List', items, { 
          numbered: true, 
          color: 'blue' 
        });
        
        expectConsoleToContain('Item A');
        expectConsoleToContain('Item B');
        expectConsoleToContain('1.');
        expectConsoleToContain('2.');
        expectColoredOutput();
      });
    });
  });

  describe('Standalone functions', () => {
    it('should export createMenu function', () => {
      expect(typeof createMenu).toBe('function');
      
      createMenu('Function Menu', ['Option A', 'Option B']);
      
      expectConsoleToContain('Function Menu');
      expectConsoleToContain('Option A');
      expectConsoleToContain('Option B');
    });

    it('should export createTable function', () => {
      expect(typeof createTable).toBe('function');
      
      createTable(['Col1', 'Col2'], [['Data1', 'Data2']]);
      
      expectConsoleToContain('Col1');
      expectConsoleToContain('Col2');
      expectConsoleToContain('Data1');
      expectConsoleToContain('Data2');
    });

    it('should export createList function', () => {
      expect(typeof createList).toBe('function');
      
      createList('Function List', ['Item 1', 'Item 2']);
      
      expectConsoleToContain('Function List');
      expectConsoleToContain('Item 1');
      expectConsoleToContain('Item 2');
    });
  });

  describe('Edge cases', () => {
    it('should handle special characters in menu options', () => {
      const options = ['🚀 Launch', '⚙️ Settings', '❌ Exit'];
      displayComponent.menu('Emoji Menu', options);
      
      expectConsoleToContain('🚀 Launch');
      expectConsoleToContain('⚙️ Settings');
      expectConsoleToContain('❌ Exit');
    });

    it('should handle very long menu titles', () => {
      const longTitle = 'This is a very long menu title that should still work properly';
      displayComponent.menu(longTitle, ['Option']);
      
      expectConsoleToContain(longTitle);
    });

    it('should handle special characters in table data', () => {
      const headers = ['Symbol', 'Code'];
      const rows = [
        ['€', '&euro;'],
        ['©', '&copy;'],
        ['™', '&trade;']
      ];
      
      displayComponent.table(headers, rows);
      
      expectConsoleToContain('€');
      expectConsoleToContain('©');
      expectConsoleToContain('™');
    });

    it('should handle list items with different lengths', () => {
      const items = [
        'Short',
        'This is a much longer list item that contains more text',
        'Medium length item'
      ];
      
      displayComponent.list('Mixed Lengths', items);
      
      items.forEach(item => {
        expectConsoleToContain(item);
      });
    });
  });
});