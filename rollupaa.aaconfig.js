// import { text } from './build/banner.json'
// import packageInfo from './package.json'

import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import url from '@rollup/plugin-url';
import fs from 'fs';
import path from 'path';

const babelOptions = {
    babelHelpers: 'bundled'
}


export default {
    input: "src/entry-bundler.ts",
    output: [
      {
        format: "cjs",
        file: "lib/index.js",
        sourcemap: true
      },
      {
        format: "esm",
        file: "lib/index.esm.js",
        sourcemap: true
      }
    ],
    plugins: [
        cjs(), 
        babel(babelOptions),
        typescript({ tsconfig: './tsconfig.json', check: false }),
        vue(), 
        scss(), 
        resolve({
          extensions: ['.vue', '.ts', '.js'],
        }),
        url({
            include: ['**/*.svg'],
            limit: 0, // No límite de tamaño para los archivos SVG
            emitFiles: true, // Emite los archivos SVG en la carpeta de salida
            fileName: '[name].[hash][extname]', // Cambia el nombre de los archivos SVG en la carpeta de salida
        }),
        peerDepsExternal(),
    ],
    external: ['bootstrap-vue-next']
  };