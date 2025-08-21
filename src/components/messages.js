/**
 * Message Components
 * Handles success, error, warning, and info messages
 */

import chalk from 'chalk';

export class MessageComponent {
  constructor(options = {}) {
    this.options = options;
    this.colors = options.colors || {
      success: '#51cf66',
      error: '#ff6b6b',
      warning: '#ffd43b',
      info: '#74c0fc'
    };
  }

  success(message) {
    console.log(chalk.green('✓') + ' ' + chalk.white(message));
  }

  error(message) {
    console.log(chalk.red('✗') + ' ' + chalk.white(message));
  }

  warning(message) {
    console.log(chalk.yellow('⚠') + ' ' + chalk.white(message));
  }

  info(message) {
    console.log(chalk.blue('ℹ') + ' ' + chalk.white(message));
  }
}

export function createSuccess(message) {
  return new MessageComponent().success(message);
}

export function createError(message) {
  return new MessageComponent().error(message);
}

export function createWarning(message) {
  return new MessageComponent().warning(message);
}

export function createInfo(message) {
  return new MessageComponent().info(message);
}