# @brangor/cli-ui

A utility library for creating CLI interfaces with a teeny bit of razmataz.

## 🚀 Features

- **Box Drawing & Layout**: Create beautiful ASCII art boxes and layouts
- **Progress Tracking**: Step-by-step progress indicators with status bars
- **Interactive Menus**: Consistent menu systems with navigation
- **Color Schemes**: Predefined retrofuturistic color palettes
- **Animation & Effects**: Loading spinners, countdowns, and visual effects
- **Form Validation**: Interactive prompts with validation
- **Tables & Lists**: Structured data display
- **Flow Diagrams**: NEW! ASCII flow charts with status-based colors and arrows
- **Demo Mode**: Automated demo workflows with progress tracking

## 📦 Installation

```bash
npm install @brangor/cli-ui
```

## 🎯 CLI Demo Tool

After installation, you can explore all the patterns interactively:

```bash
# Interactive demo with all features
cli-ui-demo

# Quick pattern examples
cli-ui header     # Show header patterns
cli-ui progress   # Show progress patterns  
cli-ui messages   # Show message patterns
cli-ui table      # Show table example
cli-ui menu       # Show menu example
cli-ui flow       # Show flow diagram examples
cli-ui help       # Show all commands
```

The CLI tools are perfect for:
- 🎨 **Exploring patterns** before implementing
- 📖 **Learning the API** interactively  
- 🚀 **Quick prototyping** of CLI interfaces
- 👥 **Demonstrating** to team members

## 🎯 Quick Start

```javascript
import { CLIUI } from '@brangor/cli-ui';

const ui = new CLIUI();

// Clear screen and show welcome
ui.clear();

// Create a beautiful header
ui.header('Welcome to My CLI App', 'A retrofuturistic experience');

// Show a menu
ui.menu('MAIN MENU', [
  '📦 Load Data',
  '🔄 Process',
  '📊 Analyze',
  '❌ Exit'
]);

// Interactive prompt
const choice = await ui.select('Choose an option:', ['Option 1', 'Option 2']);

// Progress tracking
const steps = [
  { description: 'Loading...' },
  { description: 'Processing...' },
  { description: 'Complete!' }
];
const tracker = ui.createStepTracker(steps);
tracker.start();
// ... do work ...
tracker.next();
tracker.complete();

// Flow diagrams
const pipelineFlow = [
  { content: 'Code', status: 'success' },
  { content: 'Test', status: 'active' },
  { content: 'Deploy', status: 'pending' }
];
ui.flowHorizontal(pipelineFlow);
ui.createFlowLegend();
```

## 📚 API Reference

### Core Methods

#### `new CLIUI(options)`
Create a new CLI UI instance with optional configuration.

```javascript
const ui = new CLIUI({
  theme: 'retrofuturistic',
  colors: {
    primary: '#00d4ff',
    secondary: '#ff6b6b',
    success: '#51cf66',
    warning: '#ffd43b',
    error: '#ff6b6b',
    info: '#74c0fc',
    muted: '#868e96'
  }
});
```

#### `ui.clear()`
Clear the terminal screen.

#### `ui.header(title, subtitle, options)`
Create a boxed header with title and subtitle.

```javascript
ui.header(
  'My Application',
  'A beautiful CLI interface',
  {
    borderColor: 'cyan',
    titleColor: 'cyan',
    subtitleColor: 'gray'
  }
);
```

#### `ui.gradientHeader(title, colors)`
Create a gradient header with animated colors.

```javascript
ui.gradientHeader('My App', ['#00d4ff', '#ff6b6b', '#51cf66']);
```

### Menu & Navigation

#### `ui.menu(title, options, selectedIndex)`
Display a menu with options.

```javascript
ui.menu('MAIN MENU', [
  '📦 Load Data',
  '🔄 Process',
  '📊 Analyze'
], 0);
```

#### `ui.section(title, subtitle)`
Create a section header with divider.

```javascript
ui.section('Data Processing', 'Working with your data');
```

### Interactive Prompts

#### `ui.prompt(question, options)`
Create a text input prompt.

```javascript
const name = await ui.prompt('What is your name?');
```

#### `ui.select(question, choices, options)`
Create a selection prompt.

```javascript
const choice = await ui.select('Choose platform:', [
  'MUI',
  'M3',
  'Figma'
]);
```

#### `ui.checkbox(question, choices, options)`
Create a multi-selection prompt.

```javascript
const platforms = await ui.checkbox('Select platforms:', [
  'MUI',
  'M3',
  'Figma'
]);
```

#### `ui.confirm(question, defaultValue)`
Create a confirmation prompt.

```javascript
const confirmed = await ui.confirm('Proceed?', true);
```

### Progress & Status

#### `ui.statusBar(operation, progress, details)`
Display a status bar with progress.

```javascript
ui.statusBar('Processing data', 75, 'Almost complete...');
```

#### `ui.createProgressBar(percentage, width)`
Create a progress bar string.

```javascript
const bar = ui.createProgressBar(50, 20); // "██████████░░░░░░░░░░"
```

#### `ui.createStepTracker(steps)`
Create a step-by-step progress tracker.

```javascript
const steps = [
  { description: 'Loading...' },
  { description: 'Processing...' },
  { description: 'Complete!' }
];
const tracker = ui.createStepTracker(steps);
tracker.start();
tracker.next();
tracker.complete();
```

### Animations & Effects

#### `ui.startSpinner(text)`
Start a loading spinner.

```javascript
const spinner = ui.startSpinner('Loading data...');
// ... do work ...
ui.stopSpinner(true, 'Data loaded!');
```

#### `ui.loading(text, frames)`
Create a custom loading animation.

```javascript
const loading = ui.loading('Processing...');
// ... do work ...
loading.stop('Complete!');
```

#### `ui.countdown(seconds, text)`
Create a countdown timer.

```javascript
await ui.countdown(3, 'Starting in');
```

### Data Display

#### `ui.table(headers, rows, options)`
Display data in a table format.

```javascript
const headers = ['Name', 'Status', 'Size'];
const rows = [
  ['File 1', '✅ Complete', '1.2 KB'],
  ['File 2', '⚠️  Partial', '3.4 KB']
];
ui.table(headers, rows);
```

#### `ui.list(title, items, options)`
Display a list of items.

```javascript
const files = ['file1.txt', 'file2.txt', 'file3.txt'];
ui.list('Generated Files', files, { numbered: true, color: 'green' });
```

### Messages

#### `ui.success(message)`
Display a success message.

```javascript
ui.success('Operation completed successfully!');
```

#### `ui.error(message)`
Display an error message.

```javascript
ui.error('Something went wrong!');
```

#### `ui.warning(message)`
Display a warning message.

```javascript
ui.warning('Please check your input.');
```

#### `ui.info(message)`
Display an info message.

```javascript
ui.info('Processing your request...');
```

### Flow Diagrams

#### `ui.flowHorizontal(nodes, options)`
Create a horizontal flow diagram.

```javascript
const pipeline = [
  { content: 'Build', status: 'success' },
  { content: 'Test', status: 'active' },
  { content: 'Deploy', status: 'pending' }
];
ui.flowHorizontal(pipeline);
```

#### `ui.flowVertical(nodes, options)`
Create a vertical flow diagram.

```javascript
ui.flowVertical(pipeline, { spacing: 3 });
```

#### `ui.createFlow(nodes, options)`
Create a flow diagram with custom options.

```javascript
ui.createFlow(pipeline, {
  direction: 'horizontal',
  showArrows: false,
  spacing: 4
});
```

#### `ui.createFlowLegend(statuses)`
Display a status legend.

```javascript
ui.createFlowLegend(['success', 'active', 'pending']);
```

#### Status Types
- `pending` ○ - Gray, single border
- `ready` ◐ - Cyan, single border  
- `active` ● - Yellow, double border
- `success` ✓ - Green, single border
- `error` ✗ - Red, single border
- `warning` ⚠ - Yellow, single border

### Demo Mode

#### `ui.createDemoMode(cliPath, steps, options)`
Create an automated demo mode.

```javascript
const demoMode = ui.createDemoMode('./src/cli/interactive.ts', demoSteps, {
  delay: 2000,
  showProgress: true,
  filterOutput: true
});
await demoMode.run();
```

## 🔄 Migration Guide

### Before (Old Way)
```javascript
// Lots of repetitive code
console.log(chalk.cyan.bold(`
╔══════════════════════════════════════════════════════════════════════════════╗
║                    🚀 TOKEN PROCESSOR INTERACTIVE SHELL 🚀                    ║
╚══════════════════════════════════════════════════════════════════════════════╝
`));

// Manual progress tracking
function updateStatusBar(step, description) {
  const progress = Math.round((step / demoSteps.length) * 100);
  const progressBar = '█'.repeat(Math.floor(progress / 5)) + '░'.repeat(20 - Math.floor(progress / 5));
  // ... more repetitive code
}
```

### After (New Way)
```javascript
// Clean, reusable code
const ui = new CLIUI();
ui.gradientHeader('🚀 TOKEN PROCESSOR INTERACTIVE SHELL');
ui.header('Token Processor', 'Interactive Shell');

// Built-in progress tracking
const tracker = ui.createStepTracker(demoSteps);
tracker.start();
tracker.next();
tracker.complete();
```

## 🎨 Customization

### Custom Themes
```javascript
const ui = new CLIUI({
  theme: 'custom',
  colors: {
    primary: '#your-color',
    secondary: '#your-color',
    // ... more colors
  }
});
```

### Custom Box Styles
```javascript
ui.header('Title', 'Subtitle', {
  borderStyle: 'double',
  borderColor: 'magenta',
  backgroundColor: 'black',
  titleColor: 'yellow',
  subtitleColor: 'gray'
});
```

## 📝 Examples

### CLI Demo Tools
```bash
cli-ui-demo        # Full interactive demo
cli-ui header      # Header patterns
cli-ui progress    # Progress patterns
cli-ui table       # Table examples
```

### Code Examples
See the `examples/` directory for comprehensive usage examples:

- `basic-usage.js` - Basic functionality demonstration  
- Run: `node examples/basic-usage.js`

## 🚀 Benefits

1. **Consistency**: All CLI interfaces use the same styling and patterns
2. **Maintainability**: Changes to UI patterns only need to be made in one place
3. **Enhanced UX**: Better animations, progress tracking, and visual feedback
4. **Reduced Code**: Eliminates repetitive UI code across multiple scripts
5. **Easy Customization**: Centralized theming and styling options
6. **Better Testing**: Consistent UI components are easier to test

## 🔧 Development

To contribute to this package:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers. 