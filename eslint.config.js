import js from '@eslint/js';
import react from 'eslint-plugin-react';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  ...compat.extends('plugin:react/recommended', 'prettier'), // 互換モードでextendsを使用
  {
    settings: {
      react: {
        version: 'detect', // 自動でReactのバージョンを検出する
      },
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      // envキーの代わりにglobalsでブラウザのグローバル変数を指定
      globals: {
        window: 'readonly',
        document: 'readonly',
        console: 'readonly',
        // 必要に応じて追加
      },
    },
    // pluginsはオブジェクト形式で定義
    plugins: {
      react, // Reactプラグインをオブジェクト形式で指定
    },
    files: ['resources/js/Pages/**/*.jsx'], // JSXファイルを対象に
    rules: {
      'react/prop-types': 'off',
      'no-unused-vars': 'error', // 未使用変数をエラーにする
      'no-undef': 'error', // 定義されていない変数の使用をエラーにする
      semi: ['error', 'always'], // セミコロンを必須にする
      quotes: ['error', 'single'], // シングルクォートを強制
      'react/jsx-uses-react': 'error',
      'react/react-in-jsx-scope': 'off', // React 17以降は不要
    },
  },
];
