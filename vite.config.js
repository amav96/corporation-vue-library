"use strict";
exports.__esModule = true;
var vite_1 = require("vite");
var plugin_vue_1 = require("@vitejs/plugin-vue");
// import VueTypeImports from "vite-plugin-vue-type-imports";
var env = vite_1.loadEnv("mock", process.cwd(), "");
var path_1 = require("path");
// https://vitejs.dev/config/
exports["default"] = vite_1.defineConfig({
    plugins: [
        plugin_vue_1["default"](),
    ],
    server: {
        port: Number(env.VUE_PORT_CLIENT),
        host: true,
        strictPort: true
    },
    preview: {
        port: Number(env.VUE_PORT_CLIENT),
        host: true,
        strictPort: true
    },
    resolve: {
        alias: {
            '@': path_1["default"].resolve(__dirname, '/src'),
            '@package': path_1["default"].resolve(__dirname, '/src/components/package'),
            '@components': path_1["default"].resolve(__dirname, '/src/components'),
            '@services': path_1["default"].resolve(__dirname, '/src/services'),
            '@packageTypes': path_1["default"].resolve(__dirname, '/src/packageTypes'),
            '@fonts': path_1["default"].resolve(__dirname, '/src/assets/scss/fonts')
        }
    },
    define: {
        "process.env": {}
    },
    build: {
        sourcemap: true,
        outDir: 'dist'
    }
});
