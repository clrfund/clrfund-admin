<script setup lang="ts">
import { Keypair, PubKey, PrivKey } from 'maci-domainobjs'
import { randomBytes, hexlify, getBigInt } from 'ethers'

const maciPrivateKey = ref('')
const maciPublicKey = ref('')

const publicKeyX = computed(() => {
  if (!maciPublicKey.value) return ''

  const pubKey = PubKey.deserialize(maciPublicKey.value)
  const rawKey = pubKey.asContractParam()
  return rawKey.x.toString()
})

const publicKeyY = computed(() => {
  if (!maciPublicKey.value) return ''

  const pubKey = PubKey.deserialize(maciPublicKey.value)
  const rawKey = pubKey.asContractParam()
  return rawKey.y.toString()
})

function onSubmit() {
  // TODO: use maci to generate the key once this
  // issue https://github.com/unjs/unenv/issues/277 is resolved
  const seed = getBigInt(hexlify(randomBytes(32)))
  const privateKey = new PrivKey(seed)
  const keypair = new Keypair(privateKey)
  maciPrivateKey.value = keypair.privKey.serialize()
  maciPublicKey.value = keypair.pubKey.serialize()
}
</script>

<template>
  <ClientOnly>
    <AppPage>
      <PageHeader>MACI key</PageHeader>
      <UAlert
        v-if="maciPrivateKey"
        description="Make sure to save a copy of the private key if you use it as you will
        need it for tallying votes"
      />

      <div class="w-full">
        <div>
          <div>Private key:</div>
          <CopyableField :value="maciPrivateKey" />
        </div>
        <div>
          <div>Public key:</div>
          <CopyableField :value="maciPublicKey" />
        </div>
        <div>
          <div>Public key x:</div>
          <CopyableField :value="publicKeyX" />
        </div>
        <div>
          <div>Public key y:</div>
          <CopyableField :value="publicKeyY" />
        </div>
      </div>
      <UButton type="submit" @click.prevent="onSubmit"> Generate </UButton>
    </AppPage>
  </ClientOnly>
</template>
