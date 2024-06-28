// polyfill for node crypto functions used in maci-domainobjs
// https://nuxt.com/blog/v3-10#client-side-nodejs-support mentioned in
// https://github.com/nuxt/nuxt/issues/25700
import { env, nodeless } from 'unenv'
const { alias } = env(nodeless, {})

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
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        'node:buffer': alias['node:buffer'],
        crypto: alias['crypto'],
        stream: alias['stream'],
        http: alias['http'],
        https: alias['https'],
        zlib: alias['zlib'],
      },
    },
  },
})
