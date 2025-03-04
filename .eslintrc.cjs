/*
 * @Date: 2025-03-04 09:10:26
 * @LastEditors: wangyifeng
 * @LastEditTime: 2025-03-04 16:03:44
 * @Description:
 */
module.exports = {
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: { react: { version: 'detect' } },
  rules: {
    'import/order': 'off',
    '@typescript-eslint/consistent-type-imports': 'off',
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
};
