<template>
  <li class="py-4 border-t border-zinc-100 first:border-t-0">
    <div class="flex items-center justify-between gap-3">
      <AvatarName :name="tx.name" :avatar="tx.avatar" />
      <div class="text-right">
        <Amount :value="tx.amount" :showSign="true" />
        <div class="text-xs text-zinc-500 mt-1">{{ date }}</div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AvatarName from './AvatarName.vue'
import Amount from '@/components/ui/data/Amount.vue'
import { dateShort } from '@/utils/date'
import type { Transaction } from '@/types/finance'

const props = defineProps<{ tx: Transaction }>()
const date = computed(() => dateShort(props.tx.date))
</script>
