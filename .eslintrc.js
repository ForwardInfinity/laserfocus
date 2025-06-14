module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es2020": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2020
  },
  "rules": {
    "no-implicit-globals": "error"
  },
  "globals": {
    "chrome": "readonly"
  }
}; 