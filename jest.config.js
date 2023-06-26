"use strict";
exports.__esModule = true;
var jestConfig = {
    // ...Otras configuraciones
    preset: 'ts-jest',
    transform: {
        '\\.(scss)$': 'jest-transform-stub',
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                babelConfig: true
            },
        ],
        '^.+\\.js$': 'babel-jest',
        '\\.(ts|tsx)$': 'ts-jest',
        "^.+\\.svg$": "<rootDir>/svgTransform.cjs"
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@package/(.*)$': '<rootDir>/src/components/package/$1',
        '^@components/(.*)$': '<rootDir>/src/components/$1',
        '^@services/(.*)$': '<rootDir>/src/services/$1',
        '^@packageTypes/(.*)$': '<rootDir>/src/packageTypes/$1',
        '^@fonts/(.*)$': '<rootDir>/src/assets/scss/fonts/$1'
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: [
        '**/__tests__/*.(js|ts|tsx)',
    ],
    transformIgnorePatterns: [
        'node_modules/(?!vue-multiselect)/',
    ],
    testEnvironmentOptions: {
        customExportConditions: ['node', 'node-addons']
    },
    globals: {
        '@vue/vue3-jest': {
            tsConfig: 'tsconfig.json'
        },
        'jest-dom': true
    },
    testEnvironment: 'jsdom',
    testTimeout: 90000
};
exports["default"] = jestConfig;
