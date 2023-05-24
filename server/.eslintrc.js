module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard-with-typescript',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./tsconfig.json']
      }
    }
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'// Для TypeScript.
  ],
  rules: {
    '@typescript-eslint/space-before-function-paren': 'off',
    '@typescript-eslint/indent': 'off'
  }
}
