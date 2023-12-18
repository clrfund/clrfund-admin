import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/vue'
import { walletConnectProjectId } from '~/api/settings'
import { createPinia } from 'pinia'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const ethersConfig = defaultConfig({
    metadata: {
        name: 'clrfund',
        description: 'A privacy focused quadratic funding protocol',
        url: 'https://clr.fund',
        icons: [
            'https://raw.githubusercontent.com/clrfund/monorepo/develop/vue-app/src/assets/logo.svg',
        ],
    },
})

createWeb3Modal({
    ethersConfig,
    chains,
    projectId: walletConnectProjectId,
    themeMode: 'dark',
    themeVariables: {
        '--w3m-color-mix': '#374151',
        '--w3m-color-mix-strength': 40,
    },
})

const pinia = createPinia()
const app = createApp(App)
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(pinia)
app.mount('#app')
