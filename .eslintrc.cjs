const globals = require("globals");
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
  },
  globals: globals.browser,
  plugins: [
    "import",
    "@typescript-eslint",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "no-unused-vars": "off"
  },
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    "eslint:recommended",
    "plugin:import/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  overrides: [
    {
      files: [
        'e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'
      ],
      'extends': [
        'plugin:playwright/recommended'
      ]
    }
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    ecmaVersion: 'latest'
  },
  settings: {
    "import/resolver": {
      "typescript": true,
      "node": true,
    }
  }
};