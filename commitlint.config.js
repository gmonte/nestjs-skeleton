module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-case': [
      0,
      'always',
      [
        'lower-case', // default
        'upper-case' // UPPERCASE
      ]
    ]
  }
}
