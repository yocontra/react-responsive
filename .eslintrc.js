const { eslint } = require('@stae/linters')

module.exports = {
  ...eslint,
  parser: '@typescript-eslint/parser',
  rules: {
    ...eslint.rules,
    ...{
      'no-extra-parens': 0,
      '@typescript-eslint/no-extra-parens': 1
    }
  },
  extends: [
    ...eslint.extends,
    'plugin:@typescript-eslint/recommended'
  ]
}
