<script setup lang="ts">

  const props = defineProps<{
    title: string,
    txHash: string,
    txError: string,
    explorerUrl: string
  }>()

  const emit = defineEmits(['close'])
  const waiting = computed(() => !props.txError && !props.txHash)

</script>

<template>
  <div class="modal-container">
    <div class="modal-body">
      <div mt-8 m-3 text-md>{{ title }}</div>
      <hr bg-gray-100 />
      <div m-3 mt-8 text-sm v-if="waiting">Waiting....</div>
      <div break-all >
        <a v-if="txHash && explorerUrl" rel="noreferrer" :href="explorerUrl" target="_blank">{{ explorerUrl }}</a>
        <div v-else-if="txHash" text-green-600>{{ txHash }}</div>
      </div>
      <div m-3 mt-8 text-sm text-red break-all max-h-50 overflow-y-scroll v-if="txError" class="error">
        {{ txError }}
      </div>
      <div mb-4 v-if="!waiting">
        <button m-3 mt-8 text-sm action-btn @click="emit('close')">
          Ok
        </button>
      </div>
    </div>
  </div>
</template>


<style scoped>
.modal-container {
  position: absolute;
  background-color: #b2b2b2;
  z-index: 999;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.modal-body {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  border: 1px solid #ccc;
  border-radius: 15px;
  background-color: #25292f;
  color: white;
  text-align: center;
}

</style>
