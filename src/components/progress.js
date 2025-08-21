/**
 * Progress Components
 * Handles progress bars, status displays, and step tracking
 */

import chalk from 'chalk';

export class ProgressComponent {
  constructor(options = {}) {
    this.options = options;
  }

  bar(percentage, width = 20) {
    // Clamp percentage between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    const filled = Math.floor((clampedPercentage / 100) * width);
    const empty = Math.max(0, width - filled);
    
    return '█'.repeat(Math.max(0, filled)) + '░'.repeat(empty);
  }

  statusBar(operation, progress = 0, details = '') {
    const progressBar = this.bar(progress, 20);
    const progressText = `${progress}%`.padStart(4);
    console.log(`\n${chalk.cyan('►')} ${operation}`);
    console.log(`  ${chalk.blue(progressBar)} ${chalk.yellow(progressText)} ${chalk.gray(details)}`);
  }

  tracker(steps, ui) {
    return new StepTracker(steps, ui);
  }
}

class StepTracker {
  constructor(steps, ui) {
    this.steps = steps;
    this.ui = ui;
    this.currentStep = 0;
    this.started = false;
  }

  start() {
    this.started = true;
    this.updateDisplay();
  }

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.updateDisplay();
    }
  }

  complete() {
    this.currentStep = this.steps.length;
    this.updateDisplay();
    console.log(chalk.green('\n✅ All steps completed!'));
  }

  updateDisplay() {
    const progress = Math.round((this.currentStep / this.steps.length) * 100);
    const currentStepInfo = this.steps[this.currentStep];
    this.ui.statusBar('Progress', progress, currentStepInfo?.description || 'Complete');
  }
}

export function createProgressBar(percentage, width = 20) {
  return new ProgressComponent().bar(percentage, width);
}

export function createStatusBar(operation, progress, details) {
  return new ProgressComponent().statusBar(operation, progress, details);
}

export function createStepTracker(steps) {
  return new ProgressComponent().tracker(steps);
}