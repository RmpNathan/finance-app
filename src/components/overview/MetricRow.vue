<template>
  <div
      class="rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3 border-l-4"
      :style="{ borderLeftColor: color }"
  >
    <div class="flex items-center justify-between">
      <div class="text-sm text-zinc-700">{{ title }}</div>
      <div class="font-semibold text-zinc-900">{{ money(amount) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {money} from '@/utils/money'

defineProps<{ title: string; amount: number; color: string }>()
</script>
