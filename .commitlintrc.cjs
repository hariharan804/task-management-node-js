/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('cz-git').UserConfig} */

const fs = require('node:fs');
const path = require('node:path');
const apps = fs.readdirSync(path.resolve(__dirname, 'src'));

module.exports = {
  rules: {},

  prompt: {
    useEmoji: true,
    markBreakingChangeMode: false,
    scopes: ['root', ...apps],
    types: [
      { value: 'feat', name: 'feat: A new feature' },
      { value: 'fix', name: 'fix: A bug fix' },
      { value: 'docs', name: 'docs: Documentation only changes' },
      {
        value: 'refactor',
        name: 'refactor: A code change that neither fixes a bug nor adds a feature',
      },
      { value: 'perf', name: 'perf: A code change that improves performance' },
      {
        value: 'test',
        name: 'test: Adding missing tests or correcting existing tests',
      },
    ],
    messages: {
      body: false,
      breaking: false,
      issues: false,
    },
    skipQuestions: ['body', 'breaking', 'issues'],
    issuePrefixs: false, // Disable issue prompt
    issueRequired: false, // Ensure it's not mandatory
  },
};
