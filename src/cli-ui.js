/**
 * CLIUI - Core Class
 * 
 * Main class that orchestrates all CLI UI components and provides
 * a unified interface for creating beautiful CLI applications.
 */

import { AnimationComponent } from './components/animations.js';
import { DisplayComponent } from './components/display.js';
import { FlowComponent } from './components/flow.js';
import { HeaderComponent } from './components/headers.js';
import { MessageComponent } from './components/messages.js';
import { ProgressComponent } from './components/progress.js';
import { PromptComponent } from './components/prompts.js';
import { HelperUtils } from './utils/helpers.js';

export class CLIUI {
  constructor(options = {}) {
    this.options = {
      theme: 'retrofuturistic',
      colors: {
        primary: '#00d4ff',
        secondary: '#ff6b6b',
        success: '#51cf66',
        warning: '#ffd43b',
        error: '#ff6b6b',
        info: '#74c0fc',
        muted: '#868e96'
      },
      ...options
    };
    
    // Initialize components
    this.headers = new HeaderComponent(this.options);
    this.progress = new ProgressComponent(this.options);
    this.prompts = new PromptComponent(this.options);
    this.display = new DisplayComponent(this.options);
    this.animations = new AnimationComponent(this.options);
    this.messages = new MessageComponent(this.options);
    this.flow = new FlowComponent(this.options);
    this.utils = new HelperUtils(this.options);
    
    // Initialize readline interface
    this.rl = null;
    this.spinner = null;
  }

  // Header methods
  header(title, subtitle = '', options = {}) {
    return this.headers.create(title, subtitle, options);
  }

  gradientHeader(title, colors = ['#00d4ff', '#ff6b6b', '#51cf66']) {
    return this.headers.gradient(title, colors);
  }

  box(content, options = {}) {
    return this.headers.box(content, options);
  }

  // Progress methods
  createStepTracker(steps) {
    return this.progress.tracker(steps, this);
  }

  statusBar(operation, progress = 0, details = '') {
    return this.progress.statusBar(operation, progress, details);
  }

  createProgressBar(percentage, width = 20) {
    return this.progress.bar(percentage, width);
  }

  // Prompt methods
  async prompt(question, options = {}) {
    return this.prompts.text(question, options);
  }

  async select(question, choices, options = {}) {
    return this.prompts.choice(question, choices, options);
  }

  async checkbox(question, choices, options = {}) {
    return this.prompts.multiChoice(question, choices, options);
  }

  async confirm(question, defaultValue = false) {
    return this.prompts.confirm(question, defaultValue);
  }

  // Display methods
  menu(title, options, selectedIndex = 0) {
    return this.display.menu(title, options, selectedIndex);
  }

  table(headers, rows, options = {}) {
    return this.display.table(headers, rows, options);
  }

  list(title, items, options = {}) {
    return this.display.list(title, items, options);
  }

  // Animation methods
  startSpinner(text = 'Loading...') {
    this.spinner = this.animations.spinner(text);
    return this.spinner;
  }

  stopSpinner(success = true, text = '') {
    if (this.spinner) {
      this.animations.stopSpinner(this.spinner, success, text);
      this.spinner = null;
    }
  }

  loading(text = 'Loading...', frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']) {
    return this.animations.loading(text, frames);
  }

  async countdown(seconds, text = 'Starting in') {
    return this.animations.countdown(seconds, text);
  }

  // Message methods
  success(message) {
    return this.messages.success(message);
  }

  error(message) {
    return this.messages.error(message);
  }

  warning(message) {
    return this.messages.warning(message);
  }

  info(message) {
    return this.messages.info(message);
  }

  // Utility methods
  clear() {
    console.clear();
  }

  link(text, url) {
    return this.utils.link(text, url);
  }

  gradient(text, colors = ['#00d4ff', '#ff6b6b']) {
    return this.utils.gradient(text, colors);
  }

  divider(char = '─', length = 80) {
    return this.utils.divider(char, length);
  }

  section(title, subtitle = '') {
    return this.utils.section(title, subtitle);
  }

  // Flow diagram methods
  createFlow(nodes, options = {}) {
    return this.flow.create(nodes, options);
  }

  createFlowNode(content, status = 'pending', options = {}) {
    return this.flow.createNode(content, status, options);
  }

  createFlowLegend(statuses) {
    return this.flow.createLegend(statuses);
  }

  flowHorizontal(nodes, options = {}) {
    return this.flow.create(nodes, { direction: 'horizontal', ...options });
  }

  flowVertical(nodes, options = {}) {
    return this.flow.create(nodes, { direction: 'vertical', ...options });
  }

  // Demo mode
  createDemoMode(cliPath, steps, options = {}) {
    return this.utils.createDemoMode(cliPath, steps, options, this);
  }

  // Cleanup
  close() {
    if (this.rl) {
      this.rl.close();
    }
  }
}

// Default export
export default CLIUI; 