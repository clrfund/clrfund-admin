import { nodePolyfills } from 'vite-plugin-node-polyfills'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@pinia/nuxt', '@nuxtjs/color-mode', '@nuxt/ui', '@nuxt/eslint'],
  colorMode: {
    classSuffix: '',
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: false },
  ssr: false,
  runtimeConfig: {
    public: {
      // IPFS gateway url, set environment variable NUXT_PUBLIC_IPFS_GATEWAY_URL
      ipfsGatewayUrl: '',
    },
  },
  vite: {
    plugins: [nodePolyfills()],
  },
})
