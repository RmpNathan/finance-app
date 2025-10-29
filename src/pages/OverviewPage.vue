<template>
  <div class="relative">
    <div class="relative grid grid-cols-12 gap-6">
      <StatCard tone="dark" class="col-span-12 lg:col-span-4" :label="'Current Balance'" :value="money(currentBalance)"/>
      <StatCard class="col-span-12 lg:col-span-4" :label="'Income'" :value="money(totalIncome)"/>
      <StatCard class="col-span-12 lg:col-span-4" :label="'Expenses'" :value="money(totalExpense)"/>

      <BaseCard class="col-span-12 lg:col-span-7 h-44">Pots</BaseCard>
      <BaseCard class="col-span-12 lg:col-span-5 h-44">Budgets</BaseCard>

      <BaseCard class="col-span-12 xl:col-span-8 h-80">Transactions</BaseCard>
      <BaseCard class="col-span-12 xl:col-span-4 h-80">Recurring Bills</BaseCard>
    </div>
  </div>
</template>

<script setup>
import BaseCard from '../components/ui/card/BaseCard.vue'
import StatCard from "@/components/overview/StatCard.vue";
import {useBalanceStore} from "@/stores/balance.js";
import {computed} from "vue";

const balanceStore = useBalanceStore()

const currentBalance = computed(() => balanceStore.current ?? 0)
const totalIncome = computed(() => balanceStore.income ?? 0)
const totalExpense = computed(() => balanceStore.expenses ?? 0)

const money = (n) => new Intl.NumberFormat("en-US", {style: "currency", currency: "USD"}).format(n)
</script>
