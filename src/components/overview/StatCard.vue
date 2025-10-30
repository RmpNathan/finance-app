<template>
  <BaseCard :tone="tone">
    <template #header>
      <div class="text-sm" :class="tone === 'dark' ? 'opacity-80' : 'text-zinc-500'">
        {{ label }}
      </div>
    </template>
    <div class="mt-1 text-3xl font-semibold">
      {{ value }}
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/card/BaseCard.vue'

withDefaults(
    defineProps<{
      label: string
      value: string | number
      tone?: 'surface' | 'dark'
    }>(),
    { tone: 'surface' }
)
</script>
