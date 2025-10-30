<template>
  <span :class="cls">
    <template v-if="showSign">{{ value >= 0 ? '+' : '-' }}</template>{{ money(Math.abs(value)) }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { money } from '@/utils/money'

const props = withDefaults(defineProps<{
  value: number
  showSign?: boolean
}>(), { showSign: true })

const cls = computed(() =>
    props.value >= 0 ? 'font-semibold text-teal-700' : 'font-semibold text-gray-900'
)
</script>
