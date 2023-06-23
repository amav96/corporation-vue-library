module.exports = {
  presets: [
    ['@babel/preset-env', {
      modules: false,
    }],
    '@babel/preset-typescript',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs', // Agrega el plugin aquí
  ],
  env: {
    test: {
      plugins: ['dynamic-import-node'],
    },
  },
};