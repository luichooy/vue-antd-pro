module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-trailing-spaces': 'off',
    semi: ['error', 'never'],
    'no-tabs': 'off',
    'template-curly-spacing': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
