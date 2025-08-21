/**
 * Tests for Flow components
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { FlowComponent } from '../../src/components/flow.js';
import { createFlow, createFlowNode, createFlowLegend } from '../../src/components/flow.js';
import { 
  expectConsoleToContain, 
  expectBoxDrawing, 
  expectColoredOutput,
  getConsoleOutput
} from '../test-utils.js';

describe('Flow Components', () => {
  let flowComponent;

  beforeEach(() => {
    resetConsoleMocks();
    flowComponent = new FlowComponent();
  });

  describe('FlowComponent class', () => {
    it('should create instance with default status styles', () => {
      expect(flowComponent).toBeInstanceOf(FlowComponent);
      expect(flowComponent.statusStyles).toBeDefined();
      expect(flowComponent.statusStyles.success).toBeDefined();
      expect(flowComponent.statusStyles.error).toBeDefined();
    });

    it('should have all required status styles', () => {
      const requiredStatuses = ['pending', 'ready', 'active', 'success', 'error', 'warning'];
      requiredStatuses.forEach(status => {
        expect(flowComponent.statusStyles[status]).toBeDefined();
        expect(flowComponent.statusStyles[status].color).toBeDefined();
        expect(flowComponent.statusStyles[status].symbol).toBeDefined();
      });
    });
  });

  describe('Node creation', () => {
    it('should create a single node with default status', () => {
      const node = flowComponent.createNode('Test Node');
      
      expect(node).toBeDefined();
      expect(node.content).toBeDefined();
      expect(node.lines).toBeInstanceOf(Array);
      expect(node.width).toBeGreaterThan(0);
      expect(node.height).toBeGreaterThan(0);
      expect(node.status).toBe('pending');
    });

    it('should create node with specific status', () => {
      const node = flowComponent.createNode('Success Node', 'success');
      
      expect(node.status).toBe('success');
      expect(node.content).toContain('✓');
    });

    it('should create node with custom options', () => {
      const node = flowComponent.createNode('Custom Node', 'active', {
        showStatus: false
      });
      
      expect(node.status).toBe('active');
      // Should not contain status symbol when showStatus is false
      expect(node.content).not.toContain('●');
    });

    it('should handle different status types', () => {
      const statuses = ['pending', 'ready', 'active', 'success', 'error', 'warning'];
      
      statuses.forEach(status => {
        const node = flowComponent.createNode(`${status} node`, status);
        expect(node.status).toBe(status);
        expect(node.content).toBeDefined();
      });
    });

    it('should fallback to pending for unknown status', () => {
      const node = flowComponent.createNode('Unknown Status Node', 'unknown');
      expect(node.status).toBe('unknown');
      expect(node.content).toContain('○'); // pending symbol
    });
  });

  describe('Horizontal flow creation', () => {
    it('should create horizontal flow with multiple nodes', () => {
      const nodes = [
        { content: 'Start', status: 'success' },
        { content: 'Process', status: 'active' },
        { content: 'End', status: 'pending' }
      ];

      flowComponent.create(nodes, { direction: 'horizontal' });

      const output = getConsoleOutput();
      expect(output).toContain('Start');
      expect(output).toContain('Process');
      expect(output).toContain('End');
      expect(output).toContain('→'); // Arrow
      expectBoxDrawing();
    });

    it('should handle single node flow', () => {
      const nodes = [{ content: 'Single Node', status: 'success' }];

      flowComponent.create(nodes, { direction: 'horizontal' });

      expectConsoleToContain('Single Node');
      expectBoxDrawing();
    });

    it('should create flow without arrows when disabled', () => {
      const nodes = [
        { content: 'Node 1', status: 'success' },
        { content: 'Node 2', status: 'ready' }
      ];

      flowComponent.create(nodes, { 
        direction: 'horizontal',
        showArrows: false 
      });

      const output = getConsoleOutput();
      expect(output).not.toContain('→');
      expectConsoleToContain('Node 1');
      expectConsoleToContain('Node 2');
    });

    it('should handle custom spacing', () => {
      const nodes = [
        { content: 'A', status: 'success' },
        { content: 'B', status: 'success' }
      ];

      flowComponent.create(nodes, { 
        direction: 'horizontal',
        spacing: 5
      });

      expectConsoleToContain('A');
      expectConsoleToContain('B');
    });
  });

  describe('Vertical flow creation', () => {
    it('should create vertical flow with multiple nodes', () => {
      const nodes = [
        { content: 'Top', status: 'success' },
        { content: 'Middle', status: 'active' },
        { content: 'Bottom', status: 'pending' }
      ];

      flowComponent.create(nodes, { direction: 'vertical' });

      const output = getConsoleOutput();
      expect(output).toContain('Top');
      expect(output).toContain('Middle');
      expect(output).toContain('Bottom');
      expect(output).toContain('↓'); // Vertical arrow
      expectBoxDrawing();
    });

    it('should handle single node vertical flow', () => {
      const nodes = [{ content: 'Single Vertical', status: 'ready' }];

      flowComponent.create(nodes, { direction: 'vertical' });

      expectConsoleToContain('Single Vertical');
      expectBoxDrawing();
    });

    it('should create vertical flow without arrows when disabled', () => {
      const nodes = [
        { content: 'Top Node', status: 'success' },
        { content: 'Bottom Node', status: 'ready' }
      ];

      flowComponent.create(nodes, { 
        direction: 'vertical',
        showArrows: false 
      });

      const output = getConsoleOutput();
      expect(output).not.toContain('↓'); // No down arrow
      expectConsoleToContain('Top Node');
      expectConsoleToContain('Bottom Node');
      // Should still have the boxes but no connecting arrows
      expectBoxDrawing();
    });
  });

  describe('Branched flows', () => {
    it('should create branched flow diagram', () => {
      const mainFlow = [
        { content: 'Start', status: 'success' },
        { content: 'Decision', status: 'active' }
      ];

      const branches = [
        [{ content: 'Branch A', status: 'ready' }],
        [{ content: 'Branch B', status: 'pending' }]
      ];

      flowComponent.createBranched(mainFlow, branches);

      expectConsoleToContain('Main Flow:');
      expectConsoleToContain('Branch 1:');
      expectConsoleToContain('Branch 2:');
      expectConsoleToContain('Start');
      expectConsoleToContain('Decision');
      expectConsoleToContain('Branch A');
      expectConsoleToContain('Branch B');
    });

    it('should handle main flow without branches', () => {
      const mainFlow = [
        { content: 'Simple', status: 'success' }
      ];

      flowComponent.createBranched(mainFlow);

      expectConsoleToContain('Main Flow:');
      expectConsoleToContain('Simple');
    });
  });

  describe('Legend creation', () => {
    it('should create status legend with default statuses', () => {
      flowComponent.createLegend();

      expectConsoleToContain('Status Legend:');
      expectConsoleToContain('Pending');
      expectConsoleToContain('Ready');
      expectConsoleToContain('Active');
      expectConsoleToContain('Success');
      expectConsoleToContain('Error');
    });

    it('should create legend with custom statuses', () => {
      flowComponent.createLegend(['success', 'error']);

      expectConsoleToContain('Status Legend:');
      expectConsoleToContain('Success');
      expectConsoleToContain('Error');
      expect(getConsoleOutput()).not.toContain('Pending');
    });

    it('should handle empty status list', () => {
      flowComponent.createLegend([]);

      expectConsoleToContain('Status Legend:');
    });

    it('should skip unknown statuses in legend', () => {
      flowComponent.createLegend(['success', 'unknown', 'error']);

      expectConsoleToContain('Success');
      expectConsoleToContain('Error');
      // Unknown status should be skipped, not cause error
    });
  });

  describe('Standalone functions', () => {
    it('should export createFlow function', () => {
      expect(typeof createFlow).toBe('function');
      
      const nodes = [{ content: 'Test', status: 'success' }];
      createFlow(nodes);
      
      expectConsoleToContain('Test');
    });

    it('should export createFlowNode function', () => {
      expect(typeof createFlowNode).toBe('function');
      
      const node = createFlowNode('Test Node', 'success');
      
      expect(node).toBeDefined();
      expect(node.status).toBe('success');
    });

    it('should export createFlowLegend function', () => {
      expect(typeof createFlowLegend).toBe('function');
      
      createFlowLegend(['success']);
      
      expectConsoleToContain('Status Legend:');
      expectConsoleToContain('Success');
    });
  });

  describe('Edge cases', () => {
    it('should handle empty content', () => {
      const node = flowComponent.createNode('', 'success');
      expect(node).toBeDefined();
      expect(node.content).toContain('✓'); // Should still show status symbol
    });

    it('should handle very long content', () => {
      const longContent = 'This is a very long piece of content that should still work properly';
      const node = flowComponent.createNode(longContent, 'success');
      
      expect(node).toBeDefined();
      expect(node.width).toBeGreaterThan(longContent.length);
    });

    it('should handle empty node list', () => {
      flowComponent.create([]);
      
      // Should not crash, might produce empty output
      expect(true).toBe(true);
    });

    it('should handle missing node properties', () => {
      const nodes = [
        { content: 'Good Node', status: 'success' },
        { content: 'Node without status' },
        { status: 'error' } // Missing content
      ];

      // Should not crash
      expect(() => {
        flowComponent.create(nodes, { direction: 'horizontal' });
      }).not.toThrow();
    });

    it('should handle special characters in content', () => {
      const node = flowComponent.createNode('Node with émojis 🚀 and symbols @#$', 'success');
      
      expect(node).toBeDefined();
      expect(node.content).toContain('🚀');
      expect(node.content).toContain('émojis');
    });
  });
});