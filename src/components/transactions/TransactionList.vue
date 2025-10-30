<template>
  <ul v-if="items?.length">
    <TransactionRow v-for="t in items" :key="t.name + t.date + t.amount" :tx="t" />
  </ul>
  <div v-else class="text-center text-sm text-zinc-500 py-6">No transactions</div>
</template>

<script setup lang="ts">
import TransactionRow from './TransactionRow.vue'
import type { Transaction } from '@/types/finance'
defineProps<{ items: Transaction[] }>()
</script>
