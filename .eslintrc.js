module.exports = {
  root: true,
  extends: [
    '@meta-configs/eslint-config/ts'
  ],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module'
  },
  env: {
    node: true,
    jest: true
  },
  rules: {
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
}
