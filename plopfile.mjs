// plopfile.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirerAutocomplete from 'inquirer-autocomplete-prompt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const shell = require('shelljs');
const modelsDir = path.join(__dirname, 'src', 'models'); // Adjust path as needed
const modulesDir = path.join(__dirname, 'src', 'modules'); // Adjust path as needed

// Get .ts or .js files in the folder
const modelFiles = fs
  .readdirSync(modelsDir)
  .filter(
    (file) =>
      (file.endsWith('.ts') || file.endsWith('.js')) && file !== 'baseModel.ts'
  )
  .map((file) => path.basename(file, path.extname(file))); // remove extension

const moduleFiles = fs.readdirSync(modulesDir).filter((file) => {
  const fullPath = path.join(modulesDir, file);
  return fs.statSync(fullPath).isDirectory();
});

export default function (plop) {
  plop.setPrompt('autocomplete', inquirerAutocomplete);

  // For Modal file generator --------------------------------------
  plop.setGenerator('modal', {
    description: 'Create a new Modal',
    prompts: [
      {
        type: 'input',
        name: 'modalName',
        message: 'What is the Modal name of it?',
        validate: function (modalName) {
          if (modalName.trim().length === 0) {
            return 'Modal Name is required';
          }
          return true;
        },
      },
    ],

    actions: () => {
      return [
        {
          type: 'add',
          path: 'src/models/{{{camelCase modalName}}}.ts',
          templateFile: 'templates/modal.hbs',
        },
      ];
    },
  });
  // For Module file generator --------------------------------------
  plop.setGenerator('module', {
    description: 'Create a new module files',
    prompts: [
      {
        type: 'input',
        name: 'moduleName',
        message: 'What is the Module name of it?',
        validate: function (moduleName) {
          if (moduleName.trim().length === 0) {
            return 'Module Name is required';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'routeName',
        message: 'What is the Route name of it?',
        validate: function (routeName) {
          if (routeName.trim().length === 0) {
            return 'Route Name is required';
          }
          return true;
        },
      },
      {
        type: 'autocomplete',
        name: 'modalName',
        message: 'Select Model file:',
        source: (answersSoFar, input) => {
          input = input || '';
          return new Promise((resolve) => {
            const filtered = modelFiles.filter((item) =>
              item.toLowerCase().includes(input.toLowerCase())
            );
            resolve(filtered);
          });
        },
      },
    ],
    actions: () => {
      return [
        {
          type: 'add',
          path: 'src/modules/{{camelCase moduleName}}/{{camelCase moduleName}}.service.ts',
          templateFile: 'templates/modules/service.hbs',
        },
        {
          type: 'add',
          path: 'src/modules/{{camelCase moduleName}}/{{camelCase routeName}}.routes.ts',
          templateFile: 'templates/modules/routes.hbs',
        },
        {
          type: 'add',
          path: 'src/modules/{{camelCase moduleName}}/controllers/get{{pascalCase routeName}}ById.ts',
          templateFile: 'templates/modules/controllers/getById.hbs',
        },
        {
          type: 'add',
          path: 'src/modules/{{camelCase moduleName}}/controllers/getAll{{pascalCase routeName}}.ts',
          templateFile: 'templates/modules/controllers/getAll.hbs',
        },
        {
          type: 'add',
          path: 'src/modules/{{camelCase moduleName}}/controllers/create{{pascalCase routeName}}.ts',
          templateFile: 'templates/modules/controllers/create.hbs',
        },
        {
          type: 'add',
          path: 'src/modules/{{camelCase moduleName}}/controllers/update{{pascalCase routeName}}.ts',
          templateFile: 'templates/modules/controllers/update.hbs',
        },
        {
          type: 'add',
          path: 'src/modules/{{camelCase moduleName}}/controllers/delete{{pascalCase routeName}}.ts',
          templateFile: 'templates/modules/controllers/delete.hbs',
        },
        {
          type: 'append',
          path: 'src/routes/v1/private/index.ts',
          pattern: /\/\/ ### APPEND ROUTES HERE ###/,
          templateFile: 'templates/routes.hbs',
        },
        {
          type: 'append',
          path: 'src/routes/v1/private/index.ts',
          pattern: /\/\/ ### APPEND ROUTES_IMPORT HERE ###/,
          templateFile: 'templates/routesImport.hbs',
        },
      ];
    },
  });
  // For Screen file generator --------------------------------------
  plop.setGenerator('api', {
    description: 'Create a new API file',
    prompts: [
      {
        type: 'autocomplete',
        name: 'moduleName',
        message: 'Select Model file:',
        source: (answersSoFar, input) => {
          input = input || '';
          return new Promise((resolve) => {
            const filtered = moduleFiles.filter((item) =>
              item.toLowerCase().includes(input.toLowerCase())
            );
            resolve(filtered);
          });
        },
      },
      {
        type: 'input',
        name: 'apiName',
        message: 'What is the API name of it?',
        validate: function (apiName) {
          if (apiName.trim().length === 0) {
            return 'API Name is required';
          }
          return true;
        },
      },
    ],

    actions: () => {
      return [
        {
          type: 'add',
          path: 'src/modules/{{camelCase moduleName}}/controllers/{{{camelCase apiName}}}.ts',
          templateFile: 'templates/modules/controllers/newAPI.hbs',
        },
      ];
    },
  });
}
