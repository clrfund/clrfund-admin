<script setup lang="ts">
defineProps<{
  hash: string
}>()
</script>

<template>
  <div m-3 mt-8 text-sm>
    {{ hash }}
  </div>
</template>
