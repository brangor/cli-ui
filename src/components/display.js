/**
 * Display Components
 * Handles menus, tables, lists, and data presentation
 */

import chalk from 'chalk';

export class DisplayComponent {
  constructor(options = {}) {
    this.options = options;
  }

  menu(title, options, selectedIndex = 0) {
    console.log(chalk.cyan.bold(`\n${title}`));
    console.log(chalk.gray('─'.repeat(title.length)));
    
    options.forEach((option, index) => {
      const prefix = index === selectedIndex ? chalk.green('►') : ' ';
      const color = index === selectedIndex ? chalk.white.bold : chalk.gray;
      console.log(`${prefix} ${color(option)}`);
    });
    console.log();
  }

  table(headers, rows) {
    // Simple table implementation
    const colWidths = headers.map((header, i) => {
      const headerLength = header ? header.length : 0;
      const cellLengths = rows.map(row => {
        const cell = row[i];
        const cellValue = cell === null || cell === undefined ? '' : cell.toString();
        return cellValue.length;
      });
      return Math.max(headerLength, ...cellLengths);
    });

    // Header
    const headerRow = headers.map((header, i) => 
      header.padEnd(colWidths[i])
    ).join(' │ ');
    
    console.log(chalk.cyan('┌' + colWidths.map(w => '─'.repeat(w + 2)).join('┼') + '┐'));
    console.log(chalk.cyan('│ ') + chalk.bold(headerRow) + chalk.cyan(' │'));
    console.log(chalk.cyan('├' + colWidths.map(w => '─'.repeat(w + 2)).join('┼') + '┤'));

    // Rows
    rows.forEach(row => {
      const formattedRow = row.map((cell, i) => {
        const cellValue = cell === null || cell === undefined ? '' : cell.toString();
        return cellValue.padEnd(colWidths[i]);
      }).join(' │ ');
      console.log(chalk.cyan('│ ') + formattedRow + chalk.cyan(' │'));
    });

    console.log(chalk.cyan('└' + colWidths.map(w => '─'.repeat(w + 2)).join('┴') + '┘'));
  }

  list(title, items, options = {}) {
    console.log(chalk.cyan.bold(`\n${title}`));
    console.log(chalk.gray('─'.repeat(title.length)));
    
    items.forEach((item, index) => {
      const prefix = options.numbered ? `${index + 1}.` : '•';
      const color = options.color ? chalk[options.color] : chalk.white;
      console.log(`  ${chalk.gray(prefix)} ${color(item)}`);
    });
    console.log();
  }
}

export function createMenu(title, options, selectedIndex) {
  return new DisplayComponent().menu(title, options, selectedIndex);
}

export function createTable(headers, rows, options) {
  return new DisplayComponent().table(headers, rows, options);
}

export function createList(title, items, options) {
  return new DisplayComponent().list(title, items, options);
}