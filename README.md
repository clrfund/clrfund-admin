# clrfund-admin

A GUI for managing and deploying [CLRFund](https://github.com/clrfund/monorepo).

Starting a CLRFund funding round is simplified and streamlined into 3 steps:

1. Use this application to create a new CLRFund instance (initial setup only).
2. Clone the [clr.fund](https://github.com/clrfund/monorepo) repository and deploy the web application (vue-app) on Netlify.
3. Use this application to start a new funding round.

This application employs a deployment design that ensures the security of the CLRFund instance and the matching pool by using multisig wallets, specifically Gnosis Safe.

Contract data is indexed in a universal subgraph. Please refer to [chain.ts](https://github.com/clrfund/clrfund-admin/blob/main/vue-app/utils/chains.ts) for the chain specific URL. Keep in mind that this URL may change in the future when transitioning to TheGraph's decentralized subgraph. Additionally, you have the option to deploy your own subgraph instance to index the contract data. Refer to the [clr.fund documentation](https://github.com/clrfund/monorepo/blob/develop/docs/deployment.md#deploy-the-subgraph) for instructions on deploying your custom subgraph.

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

### Limitations

See [issues](https://github.com/clrfund/clrfund-admin/issues) for a list of limitations to be addressed.

### Tech stack resources

- `/vue-app`
  - [Vue 3](https://vuejs.org)
  - [Pinia](https://pinia.vuejs.org)
  - [Ethers v6](https://docs.ethers.io/v6/)
  - [MACI](https://github.com/privacy-scaling-explorations/maci)
  - [unenv](https://github.com/unjs/unenv)
  - [Web3 Onboard](https://onboard.blocknative.com/)
  - [Safe SDK](https://docs.safe.global/sdk/overview)
  - [Heroicons](https://heroicons.com/)
  - [Vitest](https://vitest.dev)
  - [eslint](https://eslint.org)
  - [tailwindcss](https://tailwindcss.com)
  - [Nuxt](https://nuxt.com)
  - [NuxtUI](https://ui.nuxt.com)
  - [Nuxt Color Mode](https://color-mode.nuxtjs.org)
