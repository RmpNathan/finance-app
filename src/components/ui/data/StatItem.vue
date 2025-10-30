<template>
  <span
      class="shrink-0 w-1.5 self-stretch rounded-full"
      :style="{ backgroundColor: color }"
      aria-hidden="true"
  />
  <div class="flex-1">
    <div class="text-sm text-zinc-500">{{ title }}</div>
    <div class="font-semibold">{{ money(amount) }}</div>
  </div>
</template>

<script setup lang="ts">
import {money} from "@/utils/money";

defineProps({
  title: {type: String},
  color: {type: String},
  amount: {type: Number},
})

</script>
