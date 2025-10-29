<template>
  <BaseCard :tone="tone" class="h-28">
    <div class="text-sm" :class="tone === 'dark' ? 'opacity-80' : 'text-zinc-500'">{{ label }}</div>
    <div class="mt-1 text-3xl font-semibold">{{ value }}</div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from "@/components/ui/card/BaseCard.vue"
defineProps<{ label: string; value: string; tone?: 'surface' | 'dark' }>()
</script>