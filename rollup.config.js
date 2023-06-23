// import { text } from './build/banner.json'
// import packageInfo from './package.json'

import vue from 'rollup-plugin-vue'
import node from '@rollup/plugin-node-resolve'
import cjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import fs from 'fs'
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseFolderPath = './src/components/package'
// const banner = text.replace('${version}', packageInfo.version)

const components = fs
    .readdirSync(baseFolderPath)
    .filter((f) =>
        fs.statSync(path.join(baseFolderPath, f)).isDirectory()
    )

const entries = {
    'index': './src/index.ts',
    ...components.reduce((obj, name) => {
        obj[name] = (baseFolderPath + name)
        return obj
    }, {})
}

const babelOptions = {
    babelHelpers: 'bundled'
}

const vuePluginConfig = {
    template: {
        isProduction: true,
        compilerOptions: {
            whitespace: 'condense'
        }
    }
}

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

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
                    extensions: ['.vue', '.ts']
                }),
                typescript({ tsconfig: "./tsconfig.json" }),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ],
            resolve: {
                alias: {
                  '@': path.resolve(__dirname, 'src'),
                  '@package': path.resolve(__dirname, 'src/components/package'),
                  '@components': path.resolve(__dirname, 'src/components'),
                  '@services': path.resolve(__dirname, 'src/services'),
                  '@packageTypes': path.resolve(__dirname, 'src/packageTypes'),
                  '@fonts': path.resolve(__dirname, 'src/assets/scss/fonts'),
                },
            },
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
                    extensions: ['.vue', '.ts']
                }),
                typescript({ tsconfig: "./tsconfig.json" }),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ],
            resolve: {
                alias: {
                  '@': path.resolve(__dirname, 'src'),
                  '@package': path.resolve(__dirname, 'src/components/package'),
                  '@components': path.resolve(__dirname, 'src/components'),
                  '@services': path.resolve(__dirname, 'src/services'),
                  '@packageTypes': path.resolve(__dirname, 'src/packageTypes'),
                  '@fonts': path.resolve(__dirname, 'src/assets/scss/fonts'),
                },
              },
        },
        {
            input: entries,
            external: ['vue'],
            output: {
                format: 'cjs',
                dir: 'dist/cjs',
                exports: 'named'
            },
            plugins: [
                
                node({
                    extensions: ['.vue', '.ts']
                }),
                typescript({ tsconfig: "./tsconfig.json" }),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ],
            resolve: {
                alias: {
                  '@': path.resolve(__dirname, 'src'),
                  '@package': path.resolve(__dirname, 'src/components/package'),
                  '@components': path.resolve(__dirname, 'src/components'),
                  '@services': path.resolve(__dirname, 'src/services'),
                  '@packageTypes': path.resolve(__dirname, 'src/packageTypes'),
                  '@fonts': path.resolve(__dirname, 'src/assets/scss/fonts'),
                },
              },
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
                    vue: 'Vue'
                }
            },
            plugins: [
                
                node({
                    extensions: ['.vue', '.ts']
                }),
                typescript({ tsconfig: "./tsconfig.json" }),
                vue(vuePluginConfig),
                babel(babelOptions),
                cjs()
            ],
            resolve: {
                alias: {
                  '@': path.resolve(__dirname, 'src'),
                  '@package': path.resolve(__dirname, 'src/components/package'),
                  '@components': path.resolve(__dirname, 'src/components'),
                  '@services': path.resolve(__dirname, 'src/services'),
                  '@packageTypes': path.resolve(__dirname, 'src/packageTypes'),
                  '@fonts': path.resolve(__dirname, 'src/assets/scss/fonts'),
                },
              },
        }
    ]

    if (process.env.MINIFY === 'true') {
        config = config.filter((c) => !!c.output.file)
        config.forEach((c) => {
            c.output.file = c.output.file.replace(/\.m?js/g, r => `.min${r}`)
            c.plugins.push(terser({
                output: {
                    comments: '/^!/'
                }
            }))
        })
    }
    return config
}