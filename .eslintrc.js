module.exports = {
  "env": {
    "browser": true,
    "es6": true
  },
  "extends": "eslint:recommended",
  "globals": {
    "Atomics": "readonly",
    "SharedArrayBuffer": "readonly"
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "onEdit", "argsIgnorePattern": "^_" }],
    "@typescript-eslint/no-explicit-any": "off"
  }
};