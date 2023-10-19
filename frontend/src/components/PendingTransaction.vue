<template>
  <div v-if="store.pendingTransactions > 0" class="flex items-center space-x-2">
    <div
      class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"
    ></div>
    <div>{{ store.pendingTransactions }} pending transaction(s)</div>
  </div>
</template>

<script setup lang="ts">
import { store } from '@/store';
</script>
