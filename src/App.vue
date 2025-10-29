<script setup lang="ts">
import { useAppStore } from "@/stores/app";

const appStore = useAppStore();
appStore.init();
</script>

<template>
  <div v-if="!appStore.isReady" class="p-6 text-center text-gray-500">
    Loading data...
  </div>
  <div v-else>
    <RouterView />
  </div>
</template>
