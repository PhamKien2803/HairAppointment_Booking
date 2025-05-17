import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
        allowImportExportEverywhere: true,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // rules: {
    //   ...js.configs.recommended.rules,
    //   ...reactHooks.configs.recommended.rules,
    //   'no-console': 1,
    //   'no-extra-boolean-cast': 0,
    //   'no-lonely-if': 1,
      'no-unused-vars': 1,
    //   'no-trailing-spaces': 1,
    //   'no-multi-spaces': 1,
    //   'no-multiple-empty-lines': 1,
    //   'space-before-blocks': ['error', 'always'],
    //   'object-curly-spacing': [1, 'always'],
    //   'indent': ['warn', 2],
    //   'semi': [1, 'never'],
    //   'quotes': ['error', 'single'],
    //   'array-bracket-spacing': 1,
    //   'linebreak-style': 0,
    //   'no-unexpected-multiline': 'warn',
    //   'keyword-spacing': 1,
    //   'comma-dangle': 1,
    //   'comma-spacing': 1,
    //   'arrow-spacing': 1,
    //   'react-refresh/only-export-components': [
    //     'warn',
    //     { allowConstantExport: true },
    //   ],
    // },
  },
]