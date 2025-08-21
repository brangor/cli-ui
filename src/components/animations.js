/**
 * Animation Components
 * Handles spinners, loading animations, and effects
 */

import ora from 'ora';
import chalk from 'chalk';

export class AnimationComponent {
  constructor(options = {}) {
    this.options = options;
  }

  spinner(text = 'Loading...') {
    return ora({
      text: text,
      color: 'cyan',
      spinner: 'dots'
    }).start();
  }

  stopSpinner(spinner, success = true, text = '') {
    if (success) {
      spinner.succeed(text || 'Complete!');
    } else {
      spinner.fail(text || 'Failed!');
    }
  }

  loading(text = 'Loading...', frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']) {
    let frameIndex = 0;
    let isRunning = true;

    const interval = setInterval(() => {
      if (!isRunning) return;
      process.stdout.write(`\r${chalk.cyan(frames[frameIndex])} ${text}`);
      frameIndex = (frameIndex + 1) % frames.length;
    }, 100);

    return {
      stop: (finalText = 'Complete!') => {
        isRunning = false;
        clearInterval(interval);
        process.stdout.write(`\r${chalk.green('✓')} ${finalText}\n`);
      }
    };
  }

  async countdown(seconds, text = 'Starting in') {
    for (let i = seconds; i > 0; i--) {
      process.stdout.write(`\r${chalk.yellow(text)} ${chalk.bold(i)}...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    process.stdout.write(`\r${chalk.green('✓')} ${text} now!\n`);
  }
}

export function createSpinner(text) {
  return new AnimationComponent().spinner(text);
}

export function createLoading(text, frames) {
  return new AnimationComponent().loading(text, frames);
}

export function createCountdown(seconds, text) {
  return new AnimationComponent().countdown(seconds, text);
}