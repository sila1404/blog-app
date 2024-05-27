<script setup lang="ts">
const props = defineProps<{
  label: string
  loading: boolean
}>()
</script>

<template>
  <button class="btn btn-primary w-100" :disabled="props.loading">
    <span v-if="!props.loading">{{ props.label }}</span>
    <div class="d-flex justify-content-center" v-if="props.loading">
      <div :class="`spinner-border`" role="status">
        <span class="visually-hidden"> Loading... </span>
      </div>
    </div>
  </button>
</template>
