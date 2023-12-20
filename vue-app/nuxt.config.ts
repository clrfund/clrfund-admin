// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/ui',
  ],
  colorMode: {
    classSuffix: ''
  },
  ui: {
    icons: ['carbon']
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      // configure in .env file
      // WalletConnect project id,  NUXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
      walletConnectProjectId: '',
    }
  },
  imports: {
    // https://nuxt.com/docs/guide/concepts/auto-imports#auto-import-from-third-party-packages
    presets: [
      {
        from: '@web3modal/ethers/vue',
        imports: ['createWeb3Modal', 'defaultConfig', 'useWeb3ModalAccount', 'useWeb3ModalProvider'],
      }
    ]
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) =>
        ['w3m-account-button', 'w3m-connect-button'].includes(
          tag,
        ),
    }
  }
})
