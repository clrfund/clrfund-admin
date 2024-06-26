<script setup lang="ts">
import { Keypair, PubKey } from 'maci-domainobjs'

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
  const keypair = new Keypair()
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
