/// <reference types="vitest" />

import path from 'node:path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'

export default defineConfig({
    resolve: {
        alias: {
            '~/': `${path.resolve(__dirname, 'src')}/`,
        },
    },
    plugins: [
        Vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag) =>
                        ['w3m-account-button', 'w3m-connect-button'].includes(
                            tag,
                        ),
                },
            },
        }),

        // https://github.com/posva/unplugin-vue-router
        VueRouter(),

        // https://github.com/antfu/unplugin-auto-import
        AutoImport({
            imports: [
                'vue',
                '@vueuse/core',
                'pinia',
                VueRouterAutoImports,
                {
                    // add any other imports you were relying on
                    '@Web3Modal': ['W3mAccountButton', 'W3mConnectButton'],
                },
            ],
            dts: true,
            dirs: ['./src/composables', './src/stores', './src/api'],
            vueTemplate: true,
        }),

        // https://github.com/antfu/vite-plugin-components
        Components({
            dts: true,
        }),

        // https://github.com/antfu/unocss
        // see uno.config.ts for config
        UnoCSS(),
    ],

    // https://github.com/vitest-dev/vitest
    test: {
        environment: 'jsdom',
    },
})
