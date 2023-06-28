import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'unplugin-vue-components/resolvers'
import scss from 'rollup-plugin-scss';
const env = loadEnv("mock", process.cwd(), "");
import path from 'path'
import { resolve } from 'node:path'
import alias from '@rollup/plugin-alias';
import copy from "rollup-plugin-copy";


export default defineConfig({
  // If our .vue files have a style, it will be compiled as a single `.css` file under /dist.
  plugins: [
    vue(), 
    Components({
      resolvers: [BootstrapVueNextResolver()],
    }),
    copy({
      targets: [
        { src: "src/assets/scss/index.scss", dest: "dist/css" },
        // Puedes agregar más archivos CSS aquí si es necesario
      ],
    }),
    ],
  server: {
    port: Number(env.VUE_PORT_CLIENT),
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
  },
  preview: {
    port: Number(env.VUE_PORT_CLIENT),
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    
  },
  build: {
    lib: {
      // Set the entry point (file that contains our components exported).
      entry: resolve(__dirname, 'src/entry-bundler.ts'),
      formats : ['es', 'cjs'],
      // We are building for CJS and ESM, use a function to rename automatically files.
      // Example: corporation-vue-library.esm.js
      fileName: (format) => `corporation-vue-library.${format}.js`,
    },
    rollupOptions: {
      // Vue is provided by the parent project, don't compile Vue source-code inside our library.
      external: ['vue'],
      output: { 
        preserveModules: true,
        exports: 'named'
      },
      plugins: [
        alias({
          entries: [
            { find: '@', replacement: path.resolve(__dirname, 'src') },
            { find: '@package', replacement: path.resolve(__dirname, 'src/components/package') },
            { find: '@components', replacement: path.resolve(__dirname, 'src/components') },
            { find: '@services', replacement: path.resolve(__dirname, 'src/services') },
            { find: '@packageTypes', replacement: path.resolve(__dirname, 'src/packageTypes') },
            { find: '@fonts', replacement: path.resolve(__dirname, 'src/assets/scss/fonts') },
          ]
        })
      ]
    },
    
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@package': path.resolve(__dirname, '/src/components/package'),
      '@components': path.resolve(__dirname, '/src/components'),
      '@services': path.resolve(__dirname, '/src/services'),
      '@packageTypes': path.resolve(__dirname, '/src/packageTypes'),
      '@fonts': path.resolve(__dirname, '/src/assets/scss/fonts'),
      // 'vue$': path.resolve('./node_modules/vue/dist/vue.runtime.esm-bundler.js')
    },
  },
})