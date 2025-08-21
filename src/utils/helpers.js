/**
 * Helper Utilities
 * Common utility functions for CLI formatting and styling
 */

import chalk from 'chalk';
import gradient from 'gradient-string';
import terminalLink from 'terminal-link';

export class HelperUtils {
  constructor(options = {}) {
    this.options = options;
  }

  link(text, url) {
    return terminalLink(text, url);
  }

  gradient(text, colors = ['#00d4ff', '#ff6b6b']) {
    return gradient(colors)(text);
  }

  divider(char = '─', length = 80) {
    console.log(chalk.gray(char.repeat(length)));
  }

  section(title, subtitle = '') {
    console.log('\n' + chalk.cyan.bold(title));
    if (subtitle) {
      console.log(chalk.gray(subtitle));
    }
    this.divider('─', title.length);
  }

  createDemoMode(cliPath, steps, options = {}, ui) {
    return new DemoMode(cliPath, steps, options, ui);
  }
}

class DemoMode {
  constructor(cliPath, steps, options = {}, ui) {
    this.cliPath = cliPath;
    this.steps = steps;
    this.options = {
      delay: 2000,
      showProgress: true,
      filterOutput: true,
      ...options
    };
    this.ui = ui;
  }

  async run() {
    const tracker = this.ui.createStepTracker(this.steps);
    tracker.start();

    for (let i = 0; i < this.steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, this.options.delay));
      tracker.next();
    }

    tracker.complete();
  }
}

export function createGradient(text, colors) {
  return new HelperUtils().gradient(text, colors);
}

export function createLink(text, url) {
  return new HelperUtils().link(text, url);
}

export function createDivider(char, length) {
  return new HelperUtils().divider(char, length);
}

export function createSection(title, subtitle) {
  return new HelperUtils().section(title, subtitle);
}