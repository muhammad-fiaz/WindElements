#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';

const program = new Command();

program
  .name('windelements')
  .description('Add production-ready UI components to your vanilla JS/TS project')
  .version('1.0.0');

program
  .command('init')
  .description('Initialize windelements in your project')
  .action(init);

program
  .command('add')
  .description('Add a component to your project')
  .argument('[components...]', 'components to add')
  .option('--all', 'add all available components')
  .option('--overwrite', 'overwrite existing components')
  .action(add);

program.parse();
