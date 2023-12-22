# clrfund-admin

Tooling for managing [clr.fund](https://github.com/clrfund/monorepo) funding round instances. 

### Development

#### Install the dependencies

```sh
pnpm i
```

#### Start the admin app

```sh
pnpm dev
```


#### Run unit tests

```sh
pnpm test
```

### Deploy to Netlify

#### Set environment variables
```sh
NUXT_WALLET_CONNECT_PROJECT_ID=
PNPM_FLAGS=--shamefully-hoist
```

#### Build Settings
```
Base directory: /
Build command: vue-app
Build command: pnpm --filter './vue-app' run generate
Publish directory: vue-app/dist
```


### Limitations

This app is currently only for internal use and supports only a few funding round factories defined in `utils/factories.ts`. We plan to support more funding round factories in the future when we have a clr.fund registry that tracks all the clr.fund instances.

### Tech stack resources

- `/vue-app`
  - [Vue 3](https://vuejs.org)
  - [Pinia](https://pinia.vuejs.org)
  - [Ethers v6](https://docs.ethers.io/v6/)
  - [WalletConnect](https://walletconnect.com)
  - [Carbon Iconify](https://icon-sets.iconify.design/carbon/)
  - [Vitest](https://vitest.dev)
  - [eslint](https://eslint.org)
  - [tailwindcss](https://tailwindcss.com)
  - [Nuxt](https://nuxt.com)
  - [NuxtUI](https://ui.nuxt.com)
  - [Nuxt Color Mode](https://color-mode.nuxtjs.org)
