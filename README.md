# clrfund-admin

Tooling for managing [clr.fund](https://github.com/clrfund/monorepo) funding round instances.

### Development

#### Install the dependencies

```sh
pnpm i
```

#### Setup environment variables

Copy the .env.example in the `vue-app` directory to .env and update the WalletConnect project id with your own Id

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
NUXT_PUBLIC_IPFS_GATEWAY_URL=
PNPM_FLAGS=--shamefully-hoist
```

#### Build Settings

```
Base directory: /
Build command: vue-app
Build command: pnpm --filter './vue-app' run generate
Publish directory: vue-app/dist
```

### Tech stack resources

- `/vue-app`
  - [Vue 3](https://vuejs.org)
  - [Pinia](https://pinia.vuejs.org)
  - [Ethers v6](https://docs.ethers.io/v6/)
  - [Web3 Onboard](https://onboard.blocknative.com/)
  - [Safe SDK](https://docs.safe.global/sdk/overview)
  - [Heroicons](https://heroicons.com/)
  - [Vitest](https://vitest.dev)
  - [eslint](https://eslint.org)
  - [tailwindcss](https://tailwindcss.com)
  - [Nuxt](https://nuxt.com)
  - [NuxtUI](https://ui.nuxt.com)
  - [Nuxt Color Mode](https://color-mode.nuxtjs.org)
