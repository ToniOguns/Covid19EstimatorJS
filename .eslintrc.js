module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "comma-dangle": ["error", "never"],
    "indent": ["off", 2],
    "indent": ["off", "tabs"],
    "no-unused-vars": "off",
    "space-infix-ops": "off",
    "consistent-return": "off",
    "no-tabs": ["off", { allowIndentationTabs: true }],
    "object-curly-newline": ["off", {
      "ObjectExpression": "always",
      "ObjectPattern": { "multiline": true },
      "ImportDeclaration": "never",
      "ExportDeclaration": { "multiline": true, "minProperties": 3 }
  }],
    "no-param-reassign": ["error", { "props": false }]
  },
};