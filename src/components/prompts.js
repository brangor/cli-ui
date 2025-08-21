/**
 * Prompt Components
 * Handles user input prompts and interactions
 */

import inquirer from 'inquirer';

export class PromptComponent {
  constructor(options = {}) {
    this.options = options;
  }

  async text(question, options = {}) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'value',
        message: question,
        default: options.default,
        validate: options.validate
      }
    ]);
    return answers.value;
  }

  async choice(question, choices, options = {}) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'value',
        message: question,
        choices: choices,
        default: options.default
      }
    ]);
    return answers.value;
  }

  async multiChoice(question, choices, options = {}) {
    const answers = await inquirer.prompt([
      {
        type: 'checkbox',
        name: 'value',
        message: question,
        choices: choices,
        default: options.default
      }
    ]);
    return answers.value;
  }

  async confirm(question, defaultValue = false) {
    const answers = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'value',
        message: question,
        default: defaultValue
      }
    ]);
    return answers.value;
  }
}

export function createPrompt(question, options) {
  return new PromptComponent().text(question, options);
}

export function createSelect(question, choices, options) {
  return new PromptComponent().choice(question, choices, options);
}

export function createCheckbox(question, choices, options) {
  return new PromptComponent().multiChoice(question, choices, options);
}

export function createConfirm(question, defaultValue) {
  return new PromptComponent().confirm(question, defaultValue);
}