'use strict';

module.exports = {
    parserOptions: {
        ecmaVersion: 8
    },
    env: {
        node: true
    },
    extends: 'eslint:recommended',
    rules: {
        semi: ['error', 'always']
    }
};