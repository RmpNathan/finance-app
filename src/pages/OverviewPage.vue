<template>
  <div class="relative">
    <div class="relative grid grid-cols-12 gap-6">
      <BaseCard tone="dark" class="col-span-12 lg:col-span-5 h-28">
        Balance
      </BaseCard>
      <BaseCard class="col-span-12 sm:col-span-6 lg:col-span-3 h-28">Income</BaseCard>
      <BaseCard class="col-span-12 sm:col-span-6 lg:col-span-4 h-28">Expenses</BaseCard>

      <BaseCard class="col-span-12 lg:col-span-7 h-44">Pots</BaseCard>
      <BaseCard class="col-span-12 lg:col-span-5 h-44">Budgets</BaseCard>

      <BaseCard class="col-span-12 xl:col-span-8 h-80">Transactions</BaseCard>
      <BaseCard class="col-span-12 xl:col-span-4 h-80">Recurring Bills</BaseCard>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import BaseCard from '../components/ui/BaseCard.vue'
</script>
