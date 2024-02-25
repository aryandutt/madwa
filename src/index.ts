#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra';
import shell from 'shelljs';
import path from 'path';

// Define your template directories
const templates: Record<string, string> = {
  js: 'path/to/js/template',
  ts: 'path/to/ts/template',
};

async function initProject() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name:',
      validate: (input: string) => input ? true : 'Project name cannot be empty.',
    },
    // {
    //   type: 'list',
    //   name: 'scriptLang',
    //   message: 'Which scripting language would you like to use?',
    //   choices: ['js', 'ts'],
    // },
    // {
    //   type: 'confirm',
    //   name: 'useStorybook',
    //   message: 'Would you like to include Storybook?',
    //   default: false,
    // },
    // {
    //   type: 'list',
    //   name: 'testingLib',
    //   message: 'Which testing library would you like to use?',
    //   choices: ['Jest', 'Mocha', 'None'],
    // }
  ]);

  // Copy the base template
  const templatePath = templates[answers.scriptLang];
  fs.copySync(templatePath, answers.projectName);

  // Additional setup based on choices
  if (answers.useStorybook) {
    // Include Storybook setup
  }
  if (answers.testingLib !== 'None') {
    // Include testing library setup
  }

  // Finalizing setup
  console.log('Installing dependencies...');
  shell.cd(answers.projectName);
  shell.exec('npm install');

  console.log('Project setup complete!');
}

initProject().catch(err => console.error(err));
