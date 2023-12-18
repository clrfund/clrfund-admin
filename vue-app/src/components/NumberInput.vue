<script setup lang="ts">
const modelValue = ref<number|undefined>()
</script>

<template>
  <input
    id="input"
    v-model="modelValue"
    type="number"
    v-bind="$attrs"
    p="x-4 y-2"
    w="250px"
    bg="transparent"
    border="~ rounded gray-200 dark:gray-700"
    outline="none active:none"
  >
</template>
