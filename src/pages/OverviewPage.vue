<template>
  <div class="relative">
    <div class="relative grid grid-cols-12 gap-6">
      <StatCard tone="dark" class="col-span-12 lg:col-span-4" :label="'Current Balance'" :value="money(currentBalance)"/>
      <StatCard class="col-span-12 lg:col-span-4" :label="'Income'" :value="money(totalIncome)"/>
      <StatCard class="col-span-12 lg:col-span-4" :label="'Expenses'" :value="money(totalExpense)"/>
      <SectionCard
          title="Pots"
          linkText="See Details"
          class="col-span-12 lg:col-span-7"
      >
        <PotsPreview />
      </SectionCard>
      <BaseCard class="col-span-12 lg:col-span-5 h-44">Budgets</BaseCard>

      <BaseCard class="col-span-12 xl:col-span-8 h-80">Transactions</BaseCard>
      <BaseCard class="col-span-12 xl:col-span-4 h-80">Recurring Bills</BaseCard>
    </div>
  </div>
</template>

<script setup>
import BaseCard from '@/components/ui/card/BaseCard.vue'
import StatCard from "@/components/overview/StatCard.vue";
import {useBalanceStore} from "@/stores/balance.js";
import {computed} from "vue";
import SectionCard from "@/components/ui/card/SectionCard.vue";
import PotsPreview from "@/components/overview/PotsPreview.vue";
import {money} from "@/utils/money.js";

const balanceStore = useBalanceStore()

const currentBalance = computed(() => balanceStore.current ?? 0)
const totalIncome = computed(() => balanceStore.income ?? 0)
const totalExpense = computed(() => balanceStore.expenses ?? 0)

</script>
