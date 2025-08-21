#!/usr/bin/env node

/**
 * CLI UI - Simple Command Interface
 * Quick pattern demonstrations with command-line arguments
 */

import { CLIUI } from '../src/index.js';

const ui = new CLIUI();

const commands = {
  demo: 'Run interactive demo tool',
  header: 'Show header examples',
  progress: 'Show progress bar examples', 
  messages: 'Show message examples',
  table: 'Show table example',
  menu: 'Show menu example',
  flow: 'Show flow diagram examples',
  help: 'Show this help message'
};

function showHelp() {
  ui.clear();
  ui.header('CLI UI', 'Beautiful CLI interface patterns');
  
  ui.info('Usage: cli-ui [command]');
  ui.info('       cli-ui-demo (interactive mode)');
  console.log();
  
  ui.section('Available Commands');
  Object.entries(commands).forEach(([cmd, desc]) => {
    console.log(`  ${cmd.padEnd(10)} ${desc}`);
  });
  
  console.log();
  ui.section('Examples');
  console.log('  cli-ui demo         # Interactive demo');
  console.log('  cli-ui header       # Show header patterns');  
  console.log('  cli-ui progress     # Show progress patterns');
  console.log('  cli-ui messages     # Show message patterns');
  console.log();
  
  ui.success('Try: cli-ui demo for full interactive experience!');
}

async function showHeaderExamples() {
  ui.clear();
  ui.section('Header Examples', 'Different header styles');
  
  ui.header('Basic Header', 'Simple and clean');
  console.log();
  
  ui.gradientHeader('🌈 Gradient Header');
  console.log();
  
  ui.header('Custom Colors', 'With styling options', {
    borderColor: 'magenta',
    titleColor: 'yellow'
  });
  console.log();
  
  ui.success('Header examples complete!');
}

async function showProgressExamples() {
  ui.clear(); 
  ui.section('Progress Examples', 'Progress bars and status');
  
  // Static progress examples
  ui.statusBar('Loading files', 25, '1/4 complete');
  ui.statusBar('Processing data', 50, '2/4 complete');
  ui.statusBar('Generating output', 75, '3/4 complete');
  ui.statusBar('Finishing up', 100, '4/4 complete');
  
  console.log();
  ui.info('Progress bar patterns: ' + ui.createProgressBar(75, 30));
  
  console.log();
  ui.success('Progress examples complete!');
}

function showMessageExamples() {
  ui.clear();
  ui.section('Message Examples', 'Different message types');
  
  ui.success('Operation completed successfully!');
  ui.info('Here\'s some helpful information');
  ui.warning('Please check your configuration');
  ui.error('Something went wrong (demo only!)');
  
  console.log();
  ui.info('Links: ' + ui.link('Visit GitHub', 'https://github.com'));
  ui.info('Gradients: ' + ui.gradient('Beautiful colored text!'));
  
  console.log();
  ui.divider();
  ui.success('Message examples complete!');
}

function showTableExample() {
  ui.clear();
  ui.section('Table Example', 'Structured data display');
  
  const headers = ['Package', 'Version', 'Status', 'Size'];
  const rows = [
    ['chalk', '^5.4.1', '✅ Current', '45KB'],
    ['inquirer', '^9.2.15', '✅ Current', '234KB'], 
    ['ora', '^8.0.1', '⚠️  Update', '67KB'],
    ['boxen', '^7.1.1', '✅ Current', '89KB']
  ];
  
  ui.table(headers, rows);
  
  console.log();
  ui.success('Table example complete!');
}

function showMenuExample() {
  ui.clear();
  ui.section('Menu Example', 'Navigation interface');
  
  ui.menu('PROJECT ACTIONS', [
    '📦 Install Dependencies',
    '🔨 Build Project',
    '🧪 Run Tests', 
    '📖 View Documentation',
    '🚀 Deploy to Production',
    '❌ Exit'
  ], 2); // Highlight "Run Tests"
  
  console.log();
  ui.success('Menu example complete!');
}

function showFlowExamples() {
  ui.clear();
  ui.section('Flow Diagram Examples', 'Process visualization');
  
  // Show legend
  ui.createFlowLegend(['success', 'active', 'warning', 'pending']);
  
  // Simple horizontal flow
  ui.info('Horizontal Flow - Development Pipeline:');
  const devFlow = [
    { content: 'Code', status: 'success' },
    { content: 'Test', status: 'success' },
    { content: 'Build', status: 'active' },
    { content: 'Deploy', status: 'pending' }
  ];
  
  ui.flowHorizontal(devFlow);
  console.log();
  
  // Vertical flow
  ui.info('Vertical Flow - Data Processing:');
  const processFlow = [
    { content: 'Input', status: 'success' },
    { content: 'Validate', status: 'success' },
    { content: 'Transform', status: 'warning' },
    { content: 'Output', status: 'ready' }
  ];
  
  ui.flowVertical(processFlow);
  console.log();
  
  ui.success('Flow diagram examples complete!');
}

async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  
  switch (command) {
    case 'demo':
      // Launch interactive demo
      const { spawn } = await import('child_process');
      spawn('node', ['bin/cli-ui-demo.js'], { stdio: 'inherit' });
      break;
      
    case 'header':
      await showHeaderExamples();
      break;
      
    case 'progress':
      await showProgressExamples();
      break;
      
    case 'messages':
      showMessageExamples();
      break;
      
    case 'table':
      showTableExample();
      break;
      
    case 'menu':
      showMenuExample();
      break;
      
    case 'flow':
      showFlowExamples();
      break;
      
    case 'help':
    case '--help':
    case '-h':
    default:
      showHelp();
      if (command !== 'help' && command !== '--help' && command !== '-h') {
        ui.warning(`Unknown command: ${command}`);
      }
      break;
  }
}

main().catch(error => {
  ui.error(`CLI Error: ${error.message}`);
  process.exit(1);
});