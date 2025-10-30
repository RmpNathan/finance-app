<template>
  <TransactionList :items="list" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import TransactionList from '@/components/transactions/TransactionList.vue'

const txStore = useTransactionsStore()
const list = computed(() =>
    [...(txStore.items ?? [])].sort((a,b) => +new Date(b.date) - +new Date(a.date)).slice(0, 5)
)
</script>
