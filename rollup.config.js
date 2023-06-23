// import { text } from './build/banner.json'
// import packageInfo from './package.json'

import vue from 'rollup-plugin-vue';
import node from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import url from '@rollup/plugin-url';
import fs from 'fs';
import path from 'path';

const baseFolderPath = './src/components/package/';
// const banner = text.replace('${version}', packageInfo.version)

const components = fs
  .readdirSync(baseFolderPath)
  .filter((f) => fs.statSync(path.join(baseFolderPath, f)).isDirectory());

const entries = {
  index: './src/index.ts',
  ...components.reduce((obj, name) => {
    obj[name] = baseFolderPath + name;
    return obj;
  }, {}),
};

const babelOptions = {
  babelHelpers: 'bundled',
};

const vuePluginConfig = {
  template: {
    isProduction: true,
    compilerOptions: {
      whitespace: 'condense',
    },
  },
};

const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export default () => {
  let config = [
    {
      input: entries,
      external: ['vue'],
      output: {
        format: 'esm',
        dir: `dist/esm`,
        entryFileNames: '[name].mjs',
        chunkFileNames: '[name]-[hash].mjs',
      },
      plugins: [
        node({
          extensions: ['.vue', '.ts', '.js'],
        }),
        typescript({ tsconfig: './tsconfig.json', check: false }),
        vue(vuePluginConfig),
        babel(babelOptions),
        cjs(),
        scss(),
        url({
          include: ['**/*.svg'],
          limit: 0, // No límite de tamaño para los archivos SVG
          emitFiles: true, // Emite los archivos SVG en la carpeta de salida
          fileName: '[name].[hash][extname]', // Cambia el nombre de los archivos SVG en la carpeta de salida
        }),
      ],
    },
    {
      input: 'src/index.ts',
      external: ['vue'],
      output: {
        format: 'esm',
        file: 'dist/ds-library.mjs',
        // banner: banner
      },
      plugins: [
        node({
          extensions: ['.vue', '.ts', '.js'],
        }),
        typescript({ tsconfig: './tsconfig.json', check: false }),
        vue(vuePluginConfig),
        babel(babelOptions),
        cjs(),
        scss(),
        url({
          include: ['**/*.svg'],
          limit: 0, // No límite de tamaño para los archivos SVG
          emitFiles: true, // Emite los archivos SVG en la carpeta de salida
          fileName: '[name].[hash][extname]', // Cambia el nombre de los archivos SVG en la carpeta de salida
        }),
      ],
    },
    {
      input: entries,
      external: ['vue'],
      output: {
        format: 'cjs',
        dir: 'dist/cjs',
        exports: 'named',
      },
      plugins: [
        node({
          extensions: ['.vue', '.ts', '.js'],
        }),
        typescript({ tsconfig: './tsconfig.json', check: false }),
        vue(vuePluginConfig),
        babel(babelOptions),
        cjs(),
        scss(),
        url({
          include: ['**/*.svg'],
          limit: 0, // No límite de tamaño para los archivos SVG
          emitFiles: true, // Emite los archivos SVG en la carpeta de salida
          fileName: '[name].[hash][extname]', // Cambia el nombre de los archivos SVG en la carpeta de salida
        }),
      ],
    },
    {
      input: 'src/index.ts',
      external: ['vue'],
      output: {
        format: 'umd',
        name: capitalize('ds-library'),
        file: 'dist/ds-library.js',
        exports: 'named',
        // banner: banner,
        globals: {
          vue: 'Vue',
        },
      },
      plugins: [
        node({
          extensions: ['.vue', '.ts', '.js'],
        }),
        typescript({ tsconfig: './tsconfig.json', check: false }),
        vue(vuePluginConfig),
        babel(babelOptions),
        cjs(),
        scss(),
        url({
          include: ['**/*.svg'],
          limit: 0, // No límite de tamaño para los archivos SVG
          emitFiles: true, // Emite los archivos SVG en la carpeta de salida
          fileName: '[name].[hash][extname]', // Cambia el nombre de los archivos SVG en la carpeta de salida
        }),
      ],
    },
  ];

  if (process.env.MINIFY === 'true') {
    config = config.filter((c) => !!c.output.file);
    config.forEach((c) => {
      c.output.file = c.output.file.replace(/\.m?js/g, (r) => `.min${r}`);
      c.plugins.push(
        terser({
          output: {
            comments: '/^!/',
          },
        })
      );
    });
  }
  return config;
};
