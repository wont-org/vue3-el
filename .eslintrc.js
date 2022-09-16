module.exports = {
  root: true,
  extends: ['vue3-jsx'],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      parserOptions: {
        project: ['./tsconfig.es.json'],
      },
    },
  ],
  rules: {
    'vue3-jsx/no-getCurrentInstance': 1,
    '@typescript-eslint/indent': [2, 2],
  },
}
