/**
 * CLI UI - Main Entry Point
 * 
 * A utility library for creating CLI interfaces with a teeny bit of razmataz
 * 
 * @module cli-ui-helper
 */

// Main class export
export { CLIUI } from './cli-ui.js';

// Component exports
export {
    createBox, createGradientHeader, createHeader
} from './components/headers.js';

export {
    createProgressBar, createStatusBar, createStepTracker
} from './components/progress.js';

export {
    createCheckbox,
    createConfirm, createPrompt,
    createSelect
} from './components/prompts.js';

export {
    createList,
    createMenu, createTable
} from './components/display.js';

export {
    createCountdown, createLoading, createSpinner
} from './components/animations.js';

export {
    createError, createInfo, createSuccess, createWarning
} from './components/messages.js';

export {
    createFlow, createFlowNode, createFlowLegend
} from './components/flow.js';

// Utility exports
export {
    createDivider, createGradient, createLink, createSection
} from './utils/helpers.js';

// Demo mode export
export { createDemoMode } from './utils/demo-mode.js';

// Default export
export { default } from './cli-ui.js';
