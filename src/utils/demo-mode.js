/**
 * Demo Mode Utility
 * Automated demo functionality for CLI applications
 */

export function createDemoMode(cliPath, steps, options = {}) {
  return {
    async run() {
      console.log(`Running demo for ${cliPath}...`);
      
      for (const [index, step] of steps.entries()) {
        console.log(`Step ${index + 1}: ${step.description}`);
        await new Promise(resolve => setTimeout(resolve, options.delay || 1000));
      }
      
      console.log('Demo completed!');
    }
  };
}