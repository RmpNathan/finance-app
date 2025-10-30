<template>
  <img :src="src" :alt="alt" class="h-9 w-9 rounded-full object-cover" />
</template>

<script setup lang="ts">
defineProps<{ src?: string; alt?: string }>()
</script>
