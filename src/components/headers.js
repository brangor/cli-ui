/**
 * Header Component
 * 
 * Handles creation of headers, gradient headers, and boxed content
 * with customizable styling and retrofuturistic aesthetics.
 */

import boxen from 'boxen';
import chalk from 'chalk';
import gradient from 'gradient-string';

export class HeaderComponent {
  constructor(options = {}) {
    this.options = options;
  }

  /**
   * Create a retrofuturistic header box
   */
  create(title, subtitle = '', options = {}) {
    const defaultOptions = {
      padding: 1,
      margin: 1,
      borderStyle: 'double',
      borderColor: 'cyan',
      backgroundColor: 'black',
      titleColor: 'cyan',
      subtitleColor: 'gray'
    };

    const config = { ...defaultOptions, ...options };
    
    const headerContent = [
      chalk[config.titleColor].bold(title),
      subtitle ? chalk[config.subtitleColor](subtitle) : ''
    ].filter(Boolean).join('\n');

    const box = boxen(headerContent, {
      padding: config.padding,
      margin: config.margin,
      borderStyle: config.borderStyle,
      borderColor: config.borderColor,
      backgroundColor: config.backgroundColor
    });

    console.log(box);
  }

  /**
   * Create a gradient header with animation
   */
  gradient(title, colors = ['#00d4ff', '#ff6b6b', '#51cf66']) {
    const gradientTitle = gradient(colors)(title);
    console.log('\n' + gradientTitle + '\n');
  }

  /**
   * Create a boxed content
   */
  box(content, options = {}) {
    const defaultOptions = {
      padding: 1,
      margin: 1,
      borderStyle: 'single',
      borderColor: 'cyan',
      backgroundColor: 'black'
    };

    const config = { ...defaultOptions, ...options };
    
    const box = boxen(content, config);
    console.log(box);
    return box;
  }
}

// Standalone function exports
export const createHeader = (title, subtitle, options) => {
  const component = new HeaderComponent();
  return component.create(title, subtitle, options);
};

export const createGradientHeader = (title, colors) => {
  const component = new HeaderComponent();
  return component.gradient(title, colors);
};

export const createBox = (content, options) => {
  const component = new HeaderComponent();
  component.box(content, options);
}; 