/**
 * TypeScript declarations for @brangor/cli-ui
 */

export interface CLIUIOptions {
  theme?: string;
  colors?: {
    primary?: string;
    secondary?: string;
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
    muted?: string;
  };
}

export interface HeaderOptions {
  borderColor?: string;
  titleColor?: string;
  subtitleColor?: string;
  borderStyle?: string;
  backgroundColor?: string;
}

export interface Step {
  description: string;
}

export interface StepTracker {
  start(): void;
  next(): void;
  complete(): void;
  updateDisplay(): void;
}

export interface PromptOptions {
  default?: any;
  validate?: (input: any) => boolean | string;
}

export interface ListOptions {
  numbered?: boolean;
  color?: string;
}

export interface TableOptions {
  [key: string]: any;
}

export interface DemoMode {
  run(): Promise<void>;
}

export interface DemoModeOptions {
  delay?: number;
  showProgress?: boolean;
  filterOutput?: boolean;
}

export interface FlowNode {
  content: string;
  status?: 'pending' | 'ready' | 'active' | 'success' | 'error' | 'warning';
  options?: FlowNodeOptions;
}

export interface FlowNodeOptions {
  width?: number;
  showStatus?: boolean;
}

export interface FlowOptions {
  direction?: 'horizontal' | 'vertical';
  spacing?: number;
  showArrows?: boolean;
  connector?: string;
  verticalConnector?: string;
  arrow?: string;
  verticalArrow?: string;
}

export interface CreatedFlowNode {
  content: string;
  lines: string[];
  width: number;
  height: number;
  status: string;
}

export declare class CLIUI {
  constructor(options?: CLIUIOptions);
  
  // Header methods
  header(title: string, subtitle?: string, options?: HeaderOptions): void;
  gradientHeader(title: string, colors?: string[]): void;
  box(content: string, options?: HeaderOptions): void;
  
  // Progress methods
  createStepTracker(steps: Step[]): StepTracker;
  statusBar(operation: string, progress?: number, details?: string): void;
  createProgressBar(percentage: number, width?: number): string;
  
  // Prompt methods
  prompt(question: string, options?: PromptOptions): Promise<string>;
  select(question: string, choices: string[], options?: PromptOptions): Promise<string>;
  checkbox(question: string, choices: string[], options?: PromptOptions): Promise<string[]>;
  confirm(question: string, defaultValue?: boolean): Promise<boolean>;
  
  // Display methods
  menu(title: string, options: string[], selectedIndex?: number): void;
  table(headers: string[], rows: any[][], options?: TableOptions): void;
  list(title: string, items: string[], options?: ListOptions): void;
  
  // Animation methods
  startSpinner(text?: string): any;
  stopSpinner(success?: boolean, text?: string): void;
  loading(text?: string, frames?: string[]): { stop: (finalText?: string) => void };
  countdown(seconds: number, text?: string): Promise<void>;
  
  // Message methods
  success(message: string): void;
  error(message: string): void;
  warning(message: string): void;
  info(message: string): void;
  
  // Utility methods
  clear(): void;
  link(text: string, url: string): string;
  gradient(text: string, colors?: string[]): string;
  divider(char?: string, length?: number): void;
  section(title: string, subtitle?: string): void;
  
  // Flow diagram methods
  createFlow(nodes: FlowNode[], options?: FlowOptions): string;
  createFlowNode(content: string, status?: string, options?: FlowNodeOptions): CreatedFlowNode;
  createFlowLegend(statuses?: string[]): void;
  flowHorizontal(nodes: FlowNode[], options?: FlowOptions): string;
  flowVertical(nodes: FlowNode[], options?: FlowOptions): string;
  
  // Demo mode
  createDemoMode(cliPath: string, steps: Step[], options?: DemoModeOptions): DemoMode;
  
  // Cleanup
  close(): void;
}

// Component exports
export function createBox(content: string, options?: HeaderOptions): void;
export function createGradientHeader(title: string, colors?: string[]): void;
export function createHeader(title: string, subtitle?: string, options?: HeaderOptions): void;
export function createProgressBar(percentage: number, width?: number): string;
export function createStatusBar(operation: string, progress: number, details: string): void;
export function createStepTracker(steps: Step[]): StepTracker;
export function createCheckbox(question: string, choices: string[], options?: PromptOptions): Promise<string[]>;
export function createConfirm(question: string, defaultValue?: boolean): Promise<boolean>;
export function createPrompt(question: string, options?: PromptOptions): Promise<string>;
export function createSelect(question: string, choices: string[], options?: PromptOptions): Promise<string>;
export function createList(title: string, items: string[], options?: ListOptions): void;
export function createMenu(title: string, options: string[], selectedIndex?: number): void;
export function createTable(headers: string[], rows: any[][], options?: TableOptions): void;
export function createCountdown(seconds: number, text?: string): Promise<void>;
export function createLoading(text?: string, frames?: string[]): { stop: (finalText?: string) => void };
export function createSpinner(text?: string): any;
export function createError(message: string): void;
export function createInfo(message: string): void;
export function createSuccess(message: string): void;
export function createWarning(message: string): void;
export function createDivider(char?: string, length?: number): void;
export function createGradient(text: string, colors?: string[]): string;
export function createLink(text: string, url: string): string;
export function createSection(title: string, subtitle?: string): void;
export function createDemoMode(cliPath: string, steps: Step[], options?: DemoModeOptions): DemoMode;
export function createFlow(nodes: FlowNode[], options?: FlowOptions): string;
export function createFlowNode(content: string, status?: string, options?: FlowNodeOptions): CreatedFlowNode;
export function createFlowLegend(statuses?: string[]): void;

// Default export
export default CLIUI;