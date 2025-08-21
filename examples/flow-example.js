#!/usr/bin/env node

/**
 * Flow Diagram Examples for CLI UI
 * Demonstrates different flow diagram patterns and use cases
 */

import { CLIUI } from '../src/index.js';

const ui = new CLIUI();

function showBasicFlows() {
  ui.clear();
  ui.header('Flow Diagram Examples', 'Process visualization made simple');
  
  // Show legend first
  ui.createFlowLegend();
  
  console.log('1. Simple Horizontal Flow - Build Pipeline:');
  const buildFlow = [
    { content: 'Code', status: 'success' },
    { content: 'Test', status: 'success' },
    { content: 'Build', status: 'active' },
    { content: 'Deploy', status: 'pending' }
  ];
  
  ui.flowHorizontal(buildFlow);
  console.log();
  
  console.log('2. Vertical Flow - Data Pipeline:');
  const dataFlow = [
    { content: 'Raw Data', status: 'success' },
    { content: 'Clean & Validate', status: 'success' },
    { content: 'Transform', status: 'warning' },
    { content: 'Load to DB', status: 'ready' },
    { content: 'Index & Search', status: 'pending' }
  ];
  
  ui.flowVertical(dataFlow);
  console.log();
}

function showCustomizedFlows() {
  console.log('3. Custom Spacing & No Arrows:');
  const customFlow = [
    { content: 'Step A', status: 'success' },
    { content: 'Step B', status: 'error' },
    { content: 'Step C', status: 'warning' }
  ];
  
  ui.createFlow(customFlow, {
    direction: 'horizontal',
    spacing: 4,
    showArrows: false
  });
  console.log();
  
  console.log('4. Different Status States:');
  const statusFlow = [
    { content: 'Pending Task', status: 'pending' },
    { content: 'Ready Task', status: 'ready' },
    { content: 'Active Task', status: 'active' },
    { content: 'Success Task', status: 'success' },
    { content: 'Warning Task', status: 'warning' },
    { content: 'Error Task', status: 'error' }
  ];
  
  ui.flowHorizontal(statusFlow, { spacing: 1 });
  console.log();
}

function showComplexFlows() {
  console.log('5. Branched Flow - Request Processing:');
  const mainFlow = [
    { content: 'HTTP Request', status: 'success' },
    { content: 'Auth & Validation', status: 'success' },
    { content: 'Route Decision', status: 'active' }
  ];
  
  const branches = [
    [
      { content: 'API Endpoint', status: 'ready' },
      { content: 'JSON Response', status: 'pending' }
    ],
    [
      { content: 'Web Page', status: 'ready' },
      { content: 'HTML Render', status: 'pending' }
    ]
  ];
  
  ui.flow.createBranched(mainFlow, branches);
  console.log();
}

function showRealWorldExamples() {
  console.log('6. Real-World Example - CI/CD Pipeline:');
  const cicdNodes = [
    { content: 'Git Push', status: 'success' },
    { content: 'Webhook Trigger', status: 'success' },
    { content: 'Build Container', status: 'success' },
    { content: 'Run Tests', status: 'active' },
    { content: 'Security Scan', status: 'pending' },
    { content: 'Deploy Staging', status: 'pending' },
    { content: 'Deploy Prod', status: 'pending' }
  ];
  
  ui.flowHorizontal(cicdNodes);
  console.log();
  
  console.log('7. Microservice Architecture:');
  const serviceFlow = [
    { content: 'API Gateway', status: 'success' },
    { content: 'Auth Service', status: 'success' },
    { content: 'User Service', status: 'warning' },
    { content: 'Database', status: 'error' }
  ];
  
  ui.flowVertical(serviceFlow);
  console.log();
  
  ui.success('🎉 Flow diagram examples complete!');
  console.log();
  ui.info('Use these patterns in your applications:');
  console.log('  • Build & deployment pipelines');
  console.log('  • Data processing workflows');
  console.log('  • System architecture diagrams');
  console.log('  • Process status visualization');
  console.log('  • Error and warning states');
}

// Run all examples
showBasicFlows();
showCustomizedFlows();
showComplexFlows();
showRealWorldExamples();