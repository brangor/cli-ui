#!/usr/bin/env node

/**
 * Basic usage example for @brangor/cli-ui
 */

import { CLIUI } from '../src/index.js';

const ui = new CLIUI();

async function basicDemo() {
    // Clear screen and show welcome
    ui.clear();

    // Create a beautiful header
    ui.header('CLI UI Demo', 'Basic usage example');

    // Show some success/info messages
    ui.success('Package installed successfully!');
    ui.info('Starting basic demo...');

    // Create a simple menu
    ui.menu('DEMO MENU', [
        '📦 Show Package Info',
        '🔄 Run Simple Task',
        '📊 Display Data',
        '❌ Exit'
    ]);

    // Interactive prompt
    try {
        const choice = await ui.select('Choose an option:', [
            'Option 1 - Quick Start',
            'Option 2 - Advanced Features',
            'Option 3 - Exit Demo'
        ]);

        ui.info(`You selected: ${choice}`);

        // Show a simple progress example
        ui.section('Progress Demo', 'Showing progress indicators');
        
        for (let i = 0; i <= 100; i += 20) {
            ui.statusBar('Processing data', i, `Step ${i/20 + 1} of 6`);
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        ui.success('Demo completed successfully!');
    } catch (error) {
        ui.error(`Demo failed: ${error.message}`);
    }
}

// Run the demo if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    basicDemo().catch(console.error);
}

export { basicDemo };