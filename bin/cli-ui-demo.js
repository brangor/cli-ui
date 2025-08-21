#!/usr/bin/env node

/**
 * CLI Demo Tool for @brangor/cli-ui
 * Interactive demonstration of all CLI patterns
 */

import { CLIUI } from '../src/index.js';

const ui = new CLIUI();

const demoModes = {
  'all': 'Complete walkthrough of all features',
  'headers': 'Header and layout demonstrations',
  'progress': 'Progress bars and step tracking',
  'prompts': 'Interactive prompts and inputs',
  'display': 'Menus, tables, and lists',
  'animations': 'Spinners and loading animations',
  'messages': 'Success, error, warning, info messages',
  'flow': 'Flow diagrams and process visualization'
};

async function showWelcome() {
  ui.clear();
  ui.gradientHeader('🎨 CLI UI Demo Tool');
  ui.header('Interactive Pattern Showcase', 'Explore beautiful CLI interface patterns');
  
  ui.info('Welcome to the CLI UI demo tool!');
  ui.success('This tool lets you explore all the available UI patterns interactively.');
  console.log();
}

async function showMainMenu() {
  const choices = Object.entries(demoModes).map(([key, desc]) => 
    `${key.padEnd(12)} - ${desc}`
  );
  choices.push('exit         - Exit demo tool');

  const choice = await ui.select('Choose a demo mode:', choices);
  return choice.split(' ')[0];
}

async function demoHeaders() {
  ui.clear();
  ui.section('Header Demonstrations', 'Various header styles and layouts');
  
  // Basic header
  ui.header('Basic Header', 'Simple title with subtitle');
  
  await ui.countdown(2, 'Next demo in');
  
  // Gradient header
  ui.gradientHeader('🌈 Gradient Header');
  
  await ui.countdown(2, 'Next demo in');
  
  // Custom styled header
  ui.header('Custom Header', 'With custom styling', {
    borderColor: 'magenta',
    titleColor: 'yellow'
  });
  
  ui.success('Header demos complete!');
  await ui.prompt('Press Enter to continue...');
}

async function demoProgress() {
  ui.clear();
  ui.section('Progress Demonstrations', 'Progress bars and step tracking');
  
  // Progress bar demo
  ui.info('Demonstrating progress bars...');
  for (let i = 0; i <= 100; i += 10) {
    ui.statusBar('Loading data', i, `${i}% complete`);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  await ui.countdown(2, 'Step tracker demo in');
  
  // Step tracker demo
  const steps = [
    { description: 'Initializing system...' },
    { description: 'Loading configuration...' },
    { description: 'Connecting to services...' },
    { description: 'Ready!' }
  ];
  
  const tracker = ui.createStepTracker(steps);
  tracker.start();
  
  for (let i = 0; i < steps.length; i++) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    tracker.next();
  }
  
  tracker.complete();
  await ui.prompt('Press Enter to continue...');
}

async function demoPrompts() {
  ui.clear();
  ui.section('Interactive Prompts', 'User input demonstrations');
  
  try {
    // Text input
    const name = await ui.prompt('What\'s your name?');
    ui.success(`Hello, ${name}!`);
    
    // Selection
    const color = await ui.select('What\'s your favorite color?', [
      'Red', 'Green', 'Blue', 'Purple', 'Orange'
    ]);
    ui.info(`Great choice! ${color} is awesome.`);
    
    // Multiple choice
    const hobbies = await ui.checkbox('What are your hobbies?', [
      'Reading', 'Gaming', 'Cooking', 'Sports', 'Music', 'Art'
    ]);
    ui.success(`Cool hobbies: ${hobbies.join(', ')}`);
    
    // Confirmation
    const happy = await ui.confirm('Are you happy with this demo?', true);
    if (happy) {
      ui.success('Awesome! Glad you liked it!');
    } else {
      ui.info('Thanks for the feedback - we\'ll keep improving!');
    }
    
  } catch (error) {
    ui.error('Demo interrupted');
  }
}

async function demoDisplay() {
  ui.clear();
  ui.section('Display Components', 'Menus, tables, and lists');
  
  // Menu demo
  ui.menu('SAMPLE MENU', [
    '📦 Load Project',
    '🔨 Build Project', 
    '🧪 Run Tests',
    '🚀 Deploy',
    '❌ Exit'
  ], 2); // Highlight "Run Tests"
  
  await ui.countdown(3, 'Table demo in');
  
  // Table demo
  const headers = ['File', 'Status', 'Size', 'Modified'];
  const rows = [
    ['package.json', '✅ Clean', '2.1 KB', '2 hours ago'],
    ['src/index.js', '⚠️  Modified', '5.7 KB', '1 hour ago'],
    ['README.md', '✅ Clean', '8.9 KB', '3 days ago'],
    ['bin/demo.js', '🆕 New', '3.2 KB', 'Just now']
  ];
  
  ui.table(headers, rows);
  
  await ui.countdown(3, 'List demo in');
  
  // List demo
  ui.list('Generated Files', [
    'dist/bundle.js',
    'dist/bundle.css', 
    'dist/assets/logo.png',
    'dist/index.html'
  ], { numbered: true, color: 'green' });
  
  await ui.prompt('Press Enter to continue...');
}

async function demoAnimations() {
  ui.clear();
  ui.section('Animation Components', 'Spinners and loading effects');
  
  // Spinner demo
  ui.info('Starting spinner demo...');
  const spinner = ui.startSpinner('Processing data...');
  await new Promise(resolve => setTimeout(resolve, 3000));
  ui.stopSpinner(true, 'Data processed successfully!');
  
  await ui.countdown(2, 'Custom loading demo in');
  
  // Custom loading demo
  const loading = ui.loading('Deploying application...', ['🚀', '🌟', '✨', '💫']);
  await new Promise(resolve => setTimeout(resolve, 4000));
  loading.stop('Application deployed!');
  
  await ui.prompt('Press Enter to continue...');
}

async function demoMessages() {
  ui.clear();
  ui.section('Message Types', 'Different message styles');
  
  ui.success('Operation completed successfully!');
  ui.info('Here\'s some helpful information.');
  ui.warning('Please check your configuration.');
  ui.error('Something went wrong, but it\'s just a demo!');
  
  console.log();
  ui.divider('═', 50);
  console.log();
  
  ui.info('You can also create links: ' + ui.link('Visit GitHub', 'https://github.com'));
  ui.info('And gradients: ' + ui.gradient('Beautiful colored text!'));
  
  await ui.prompt('Press Enter to continue...');
}

async function demoFlow() {
  ui.clear();
  ui.section('Flow Diagrams', 'Process visualization with status colors');
  
  // Show legend first
  ui.createFlowLegend();
  
  await ui.countdown(2, 'Horizontal flow demo in');
  
  // Horizontal flow demo
  ui.info('Horizontal Flow - CI/CD Pipeline:');
  const cicdFlow = [
    { content: 'Code Commit', status: 'success' },
    { content: 'Build', status: 'success' },
    { content: 'Tests', status: 'active' },
    { content: 'Deploy', status: 'pending' }
  ];
  
  ui.flowHorizontal(cicdFlow);
  
  await ui.countdown(3, 'Vertical flow demo in');
  
  // Vertical flow demo
  ui.info('Vertical Flow - Data Processing:');
  const dataFlow = [
    { content: 'Data Ingestion', status: 'success' },
    { content: 'Validation', status: 'success' },
    { content: 'Transform', status: 'warning' },
    { content: 'Store', status: 'ready' },
    { content: 'Analyze', status: 'pending' }
  ];
  
  ui.flowVertical(dataFlow);
  
  await ui.countdown(3, 'Complex flow demo in');
  
  // Branched flow demo
  ui.info('Branched Flow - Request Processing:');
  const mainFlow = [
    { content: 'Request', status: 'success' },
    { content: 'Auth Check', status: 'success' },
    { content: 'Route', status: 'active' }
  ];
  
  const branches = [
    [
      { content: 'API Handler', status: 'ready' },
      { content: 'Response', status: 'pending' }
    ],
    [
      { content: 'Web Handler', status: 'ready' },
      { content: 'Render', status: 'pending' }
    ]
  ];
  
  ui.flow.createBranched(mainFlow, branches);
  
  await ui.countdown(2, 'Status examples in');
  
  // Different status examples
  ui.info('Status Examples:');
  const statusFlow = [
    { content: 'Success Step', status: 'success' },
    { content: 'Error Step', status: 'error' },
    { content: 'Warning Step', status: 'warning' },
    { content: 'Ready Step', status: 'ready' }
  ];
  
  ui.flowHorizontal(statusFlow, { spacing: 3 });
  
  ui.success('Flow diagram demos complete!');
  await ui.prompt('Press Enter to continue...');
}

async function demoAll() {
  ui.info('Running complete demo...');
  await demoHeaders();
  await demoProgress();
  await demoPrompts();
  await demoDisplay();
  await demoAnimations();
  await demoMessages();
  await demoFlow();
  ui.success('🎉 Complete demo finished!');
}

async function main() {
  await showWelcome();
  
  while (true) {
    try {
      const choice = await showMainMenu();
      
      switch (choice) {
        case 'all':
          await demoAll();
          break;
        case 'headers':
          await demoHeaders();
          break;
        case 'progress':
          await demoProgress();
          break;
        case 'prompts':
          await demoPrompts();
          break;
        case 'display':
          await demoDisplay();
          break;
        case 'animations':
          await demoAnimations();
          break;
        case 'messages':
          await demoMessages();
          break;
        case 'flow':
          await demoFlow();
          break;
        case 'exit':
          ui.clear();
          ui.success('Thanks for exploring CLI UI! 👋');
          ui.info('Check out the README for usage examples.');
          process.exit(0);
          break;
        default:
          ui.warning('Unknown option, please try again.');
      }
    } catch (error) {
      if (error.message === 'User force closed the prompt with ctrl+c') {
        ui.clear();
        ui.info('Demo interrupted. Thanks for trying CLI UI! 👋');
        process.exit(0);
      } else {
        ui.error(`Demo error: ${error.message}`);
        await ui.prompt('Press Enter to continue...');
      }
    }
  }
}

// Handle Ctrl+C gracefully
process.on('SIGINT', () => {
  ui.clear();
  ui.info('\nDemo interrupted. Thanks for trying CLI UI! 👋');
  process.exit(0);
});

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});