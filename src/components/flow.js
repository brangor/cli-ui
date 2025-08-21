/**
 * Flow Diagram Components
 * Creates ASCII flow diagrams with connected boxes, status colors, and arrows
 */

import chalk from 'chalk';
import boxen from 'boxen';

export class FlowComponent {
  constructor(options = {}) {
    this.options = options;
    this.statusStyles = {
      pending: {
        color: 'gray',
        borderColor: 'gray',
        borderStyle: 'single',
        symbol: '○'
      },
      ready: {
        color: 'cyan',
        borderColor: 'cyan',
        borderStyle: 'single',
        symbol: '◐'
      },
      active: {
        color: 'yellow',
        borderColor: 'yellow',
        borderStyle: 'double',
        symbol: '●'
      },
      success: {
        color: 'green',
        borderColor: 'green',
        borderStyle: 'single',
        symbol: '✓'
      },
      error: {
        color: 'red',
        borderColor: 'red',
        borderStyle: 'single',
        symbol: '✗'
      },
      warning: {
        color: 'yellow',
        borderColor: 'yellow',
        borderStyle: 'single',
        symbol: '⚠'
      }
    };
  }

  /**
   * Create a flow diagram with connected nodes
   */
  create(nodes, options = {}) {
    const config = {
      direction: 'horizontal', // horizontal | vertical
      spacing: 2,
      showArrows: true,
      connector: '─', // horizontal connector
      verticalConnector: '│',
      arrow: '→',
      verticalArrow: '↓',
      ...options
    };

    if (config.direction === 'horizontal') {
      return this._createHorizontalFlow(nodes, config);
    } else {
      return this._createVerticalFlow(nodes, config);
    }
  }

  /**
   * Create a single flow node
   */
  createNode(content, status = 'pending', options = {}) {
    const style = this.statusStyles[status] || this.statusStyles.pending;
    const config = {
      padding: 1,
      margin: 0,
      borderStyle: style.borderStyle,
      borderColor: style.borderColor,
      textColor: style.color,
      showStatus: true,
      width: options.width || null,
      ...options
    };

    // Add status symbol to content if enabled
    const nodeContent = config.showStatus 
      ? `${style.symbol} ${content}` 
      : content;

    // Apply text color
    const coloredContent = chalk[style.color](nodeContent);

    const box = boxen(coloredContent, {
      padding: config.padding,
      margin: config.margin,
      borderStyle: config.borderStyle,
      borderColor: config.borderColor,
      width: config.width,
      textAlignment: 'center'
    });

    return {
      content: box,
      lines: box.split('\n'),
      width: this._getBoxWidth(box),
      height: box.split('\n').length,
      status
    };
  }

  /**
   * Create horizontal flow diagram
   */
  _createHorizontalFlow(nodes, config) {
    const nodeBoxes = nodes.map(node => 
      this.createNode(node.content, node.status, node.options)
    );

    const maxHeight = Math.max(...nodeBoxes.map(box => box.height));
    const result = [];

    // Create each line of the flow diagram
    for (let lineIndex = 0; lineIndex < maxHeight; lineIndex++) {
      let line = '';
      
      for (let nodeIndex = 0; nodeIndex < nodeBoxes.length; nodeIndex++) {
        const box = nodeBoxes[nodeIndex];
        const boxLine = box.lines[lineIndex] || ' '.repeat(box.width);
        
        line += boxLine;

        // Add connector between nodes (except after last node)
        if (nodeIndex < nodeBoxes.length - 1 && config.showArrows) {
          const isMiddleLine = lineIndex === Math.floor(maxHeight / 2);
          
          if (isMiddleLine) {
            // Middle line gets the arrow
            const connector = config.connector.repeat(config.spacing - 1) + config.arrow;
            line += chalk.gray(connector);
          } else {
            // Other lines get spaces
            line += ' '.repeat(config.spacing);
          }
        }
      }
      
      result.push(line);
    }

    console.log(result.join('\n'));
    return result.join('\n');
  }

  /**
   * Create vertical flow diagram
   */
  _createVerticalFlow(nodes, config) {
    const nodeBoxes = nodes.map(node => 
      this.createNode(node.content, node.status, node.options)
    );

    const result = [];

    for (let nodeIndex = 0; nodeIndex < nodeBoxes.length; nodeIndex++) {
      const box = nodeBoxes[nodeIndex];
      
      // Add the node box
      result.push(...box.lines);

      // Add vertical connector (except after last node)
      if (nodeIndex < nodeBoxes.length - 1 && config.showArrows) {
        const boxWidth = box.width;
        const centerPos = Math.floor(boxWidth / 2);
        
        for (let i = 0; i < config.spacing; i++) {
          let connectorLine = ' '.repeat(boxWidth);
          
          if (i === config.spacing - 1) {
            // Last line gets the arrow
            connectorLine = connectorLine.substring(0, centerPos) + 
                          chalk.gray(config.verticalArrow) + 
                          connectorLine.substring(centerPos + 1);
          } else {
            // Other lines get vertical connector
            connectorLine = connectorLine.substring(0, centerPos) + 
                          chalk.gray(config.verticalConnector) + 
                          connectorLine.substring(centerPos + 1);
          }
          
          result.push(connectorLine);
        }
      }
    }

    console.log(result.join('\n'));
    return result.join('\n');
  }

  /**
   * Create a complex flow with branches (simple implementation)
   */
  createBranched(mainFlow, branches = [], options = {}) {
    console.log('Main Flow:');
    const mainResult = this.create(mainFlow, options);
    
    branches.forEach((branch, index) => {
      console.log(`\nBranch ${index + 1}:`);
      this.create(branch, { ...options, direction: 'horizontal' });
    });

    return mainResult;
  }

  /**
   * Get the display width of a box (without ANSI codes)
   */
  _getBoxWidth(boxString) {
    const lines = boxString.split('\n');
    const firstLine = lines[0] || '';
    // Remove ANSI escape sequences to get actual width
    // eslint-disable-next-line no-control-regex
    const cleanLine = firstLine.replace(/\u001b\[[0-9;]*m/g, '');
    return cleanLine.length;
  }

  /**
   * Create a status legend
   */
  createLegend(statuses = ['pending', 'ready', 'active', 'success', 'error']) {
    console.log('\nStatus Legend:');
    console.log('─'.repeat(20));
    
    statuses.forEach(status => {
      const style = this.statusStyles[status];
      if (style) {
        const symbol = chalk[style.color](style.symbol);
        const name = status.charAt(0).toUpperCase() + status.slice(1);
        console.log(`${symbol} ${name}`);
      }
    });
    console.log();
  }
}

// Standalone function exports
export function createFlow(nodes, options = {}) {
  return new FlowComponent().create(nodes, options);
}

export function createFlowNode(content, status, options = {}) {
  return new FlowComponent().createNode(content, status, options);
}

export function createFlowLegend(statuses) {
  return new FlowComponent().createLegend(statuses);
}