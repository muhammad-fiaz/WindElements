import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import ora from 'ora';
import { fileURLToPath } from 'url';

interface Config {
  typescript: boolean;
  componentDir: string;
  utilsDir: string;
  cssFile: string;
  tailwindConfig: string;
}

export async function init(options: { overwrite?: boolean } = {}) {
  console.log(chalk.blue.bold('\n✨ Welcome to WindElements!\n'));
  
  const cwd = process.cwd();
  const configPath = path.join(cwd, 'components.json');
  
  // Check if already initialized
  if (await fs.pathExists(configPath)) {
    if (!options.overwrite) {
      const { overwrite } = await prompts({
        type: 'confirm',
        name: 'overwrite',
        message: 'components.json already exists. Overwrite?',
        initial: false
      });
      
      if (!overwrite) {
        console.log(chalk.yellow('\n❌ Cancelled initialization\n'));
        return;
      }
    }
  }
  
  // Detect project type
  const hasTypeScript = await fs.pathExists(path.join(cwd, 'tsconfig.json'));
  const hasTailwind = await fs.pathExists(path.join(cwd, 'tailwind.config.js')) || 
                       await fs.pathExists(path.join(cwd, 'tailwind.config.ts'));
  
  // Check if TypeScript is configured
  if (!hasTypeScript) {
    console.error(chalk.red('\n❌ TypeScript is not configured in this project. Please set up TypeScript first.'));
    console.log(chalk.white('Run: npx tsc --init'));
    process.exit(1);
  }
  
  const responses = await prompts([
    {
      type: 'text',
      name: 'componentDir',
      message: 'Where would you like to install components?',
      initial: 'src/components/ui'
    },
    {
      type: 'text',
      name: 'utilsDir',
      message: 'Where would you like to install utilities?',
      initial: 'src/lib'
    },
    {
      type: 'text',
      name: 'cssFile',
      message: 'Path to your global CSS file:',
      initial: 'src/styles/globals.css'
    }
  ]);
  
  if (!responses.componentDir) {
    console.log(chalk.yellow('\n❌ Cancelled initialization\n'));
    return;
  }
  
  const config: Config = {
    typescript: true,
    componentDir: responses.componentDir,
    utilsDir: responses.utilsDir,
    cssFile: responses.cssFile,
    tailwindConfig: hasTailwind ? 'tailwind.config.js' : ''
  };
  
  const spinner = ora('Creating configuration file...').start();
  
  try {
    // Check if package.json exists and has Tailwind CSS v4+ installed
    const packageJsonPath = path.join(cwd, 'package.json');
    let hasValidTailwind = false;
    
    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
      
      if (deps.tailwindcss) {
        // Check version - need v4 or above
        const version = deps.tailwindcss.replace(/[^\d.]/g, '').split('.')[0];
        if (parseInt(version) >= 4) {
          hasValidTailwind = true;
        }
      }
    } else {
      spinner.warn('No package.json found!');
      console.log(chalk.yellow('\n⚠️  package.json not found. Please initialize your project first:\n'));
      console.log(chalk.white('  npm init -y\n'));
      process.exit(1);
    }
    
    if (!hasValidTailwind) {
      spinner.warn('Tailwind CSS v4+ not found!');
      console.log(chalk.yellow('\n⚠️  Tailwind CSS v4.1 or higher is required. Please install it:\n'));
      console.log(chalk.white('  bun add -d tailwindcss@^4.1.0\n'));
      console.log(chalk.gray('  # or with npm: npm install -D tailwindcss@^4.1.0\n'));
      console.log(chalk.gray('  # or with yarn: yarn add -D tailwindcss@^4.1.0\n'));
      
      const { proceed } = await prompts({
        type: 'confirm',
        name: 'proceed',
        message: 'Continue anyway?',
        initial: false
      });
      
      if (!proceed) {
        process.exit(1);
      }
      spinner.start('Creating configuration file...');
    }
    
    // Create config file
    await fs.writeJson(configPath, config, { spaces: 2 });
    
    // Create directories
    await fs.ensureDir(path.join(cwd, config.componentDir));
    await fs.ensureDir(path.join(cwd, config.utilsDir));
    
    // Ensure CSS file directory exists
    const cssDir = path.dirname(path.join(cwd, config.cssFile));
    await fs.ensureDir(cssDir);
    
    // Add theme CSS to global file
    await addThemeToCSS(cwd, config.cssFile, spinner);
    
    // Copy utility files
    await copyUtilityFiles(cwd, config, spinner);
    
    spinner.succeed('Configuration created successfully!');
    
    console.log(chalk.green('\n✅ WindElements initialized!\n'));
    console.log(chalk.cyan('Next steps:'));
    console.log(chalk.white('  1. Add components: ') + chalk.yellow('bunx --bun windelements add button'));
    console.log(chalk.white('  2. Or add all: ') + chalk.yellow('bunx --bun windelements add --all\n'));
    
  } catch (error) {
    spinner.fail('Failed to initialize');
    console.error(chalk.red('\n❌ Error:'), error);
    process.exit(1);
  }
}

const THEME_CSS = `
:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}
 
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}
`;

async function addThemeToCSS(cwd: string, cssFile: string, spinner: any): Promise<void> {
  const cssPath = path.join(cwd, cssFile);
  
  // Create CSS file if it doesn't exist
  if (!await fs.pathExists(cssPath)) {
    await fs.writeFile(cssPath, `@import "tailwindcss";\n${THEME_CSS}`);
    spinner.info('Created CSS file with theme');
    return;
  }
  
  // Read existing CSS
  let cssContent = await fs.readFile(cssPath, 'utf-8');
  
  // Check if theme already exists
  if (cssContent.includes('--radius') || cssContent.includes(':root')) {
    spinner.info('Theme variables already exist in CSS file');
    return;
  }
  
  // Check if Tailwind import exists
  if (!cssContent.includes('@import "tailwindcss"') && !cssContent.includes('@tailwind')) {
    cssContent = `@import "tailwindcss";\n${cssContent}`;
  }
  
  // Append theme
  cssContent += `\n${THEME_CSS}`;
  
  await fs.writeFile(cssPath, cssContent);
  spinner.info('Added theme variables to CSS file');
}

async function copyUtilityFiles(cwd: string, config: Config, spinner: any): Promise<void> {
  const utilsDestDir = path.join(cwd, config.utilsDir);
  const ext = config.typescript ? 'ts' : 'js';
  
  // Get the source utils from our package
  const utilsIndexContent = await fs.readFile(
    path.join(path.dirname(fileURLToPath(import.meta.url)), '../../utils/index.' + ext),
    'utf-8'
  ).catch(() => {
    // Fallback: create utils inline
    return getUtilsTemplate(ext);
  });
  
  const utilsTypesContent = await fs.readFile(
    path.join(path.dirname(fileURLToPath(import.meta.url)), '../../utils/types.' + ext),
    'utf-8'
  ).catch(() => {
    return getTypesTemplate(ext);
  });
  
  await fs.writeFile(path.join(utilsDestDir, `utils.${ext}`), utilsIndexContent);
  if (config.typescript) {
    await fs.writeFile(path.join(utilsDestDir, `types.${ext}`), utilsTypesContent);
  }
  
  spinner.info('Copied utility files');
}

function getUtilsTemplate(ext: string): string {
  const focusTrapClassJS = `
export class FocusTrap {
  constructor(element) {
    this.element = element;
    this.previousFocus = null;
    this.isActive = false;
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  activate() {
    if (this.isActive) return;
    
    this.previousFocus = document.activeElement;
    this.isActive = true;
    
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    this.element.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate() {
    if (!this.isActive) return;
    
    this.isActive = false;
    this.element.removeEventListener('keydown', this.handleKeyDown);
    
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  handleKeyDown(e) {
    if (e.key !== 'Tab') return;
    
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }

  getFocusableElements() {
    const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(this.element.querySelectorAll(selector));
  }
}`;

  const portalClassJS = `
export class Portal {
  constructor(id = 'windelements-portal') {
    let existing = document.getElementById(id);
    if (!existing) {
      existing = document.createElement('div');
      existing.id = id;
      document.body.appendChild(existing);
    }
    this.container = existing;
  }
  
  append(element) {
    this.container.appendChild(element);
  }
  
  remove(element) {
    if (this.container.contains(element)) {
      this.container.removeChild(element);
    }
  }
}`;

  const focusTrapClassTS = `
export class FocusTrap {
  private element: HTMLElement;
  private previousFocus: HTMLElement | null = null;
  private isActive: boolean = false;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  activate(): void {
    if (this.isActive) return;
    
    this.previousFocus = document.activeElement as HTMLElement;
    this.isActive = true;
    
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }
    
    this.element.addEventListener('keydown', this.handleKeyDown);
  }

  deactivate(): void {
    if (!this.isActive) return;
    
    this.isActive = false;
    this.element.removeEventListener('keydown', this.handleKeyDown);
    
    if (this.previousFocus) {
      this.previousFocus.focus();
    }
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = this.getFocusableElements();
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  };

  private getFocusableElements(): HTMLElement[] {
    const selector = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(this.element.querySelectorAll<HTMLElement>(selector));
  }
}`;

  const portalClassTS = `
export class Portal {
  private container: HTMLElement;
  
  constructor(id: string = 'windelements-portal') {
    let existing = document.getElementById(id);
    if (!existing) {
      existing = document.createElement('div');
      existing.id = id;
      document.body.appendChild(existing);
    }
    this.container = existing;
  }
  
  append(element: HTMLElement): void {
    this.container.appendChild(element);
  }
  
  remove(element: HTMLElement): void {
    if (this.container.contains(element)) {
      this.container.removeChild(element);
    }
  }
}`;

  if (ext === 'js') {
    return `export function cn(...inputs) {
  const classes = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.join(' ');
}

export function generateId(prefix = 'we') {
  return \`\${prefix}-\${Math.random().toString(36).substring(2, 11)}\`;
}
${focusTrapClassJS}
${portalClassJS}
`;
  }
  
  return `export function cn(...inputs: (string | undefined | null | false | Record<string, boolean>)[]): string {
  const classes: string[] = [];
  for (const input of inputs) {
    if (!input) continue;
    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }
  return classes.join(' ');
}

export function generateId(prefix: string = 'we'): string {
  return \`\${prefix}-\${Math.random().toString(36).substring(2, 11)}\`;
}
${focusTrapClassTS}
${portalClassTS}
`;
}

function getTypesTemplate(_ext: string): string {
  return `export type Size = 'sm' | 'md' | 'lg';
export type Variant = 'default' | 'primary' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

export interface BaseComponentProps {
  className?: string;
  id?: string;
}
`;
}
