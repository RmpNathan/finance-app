<template>
  <div class="relative">
    <div class="grid grid-cols-12 gap-6">
      <StatCard tone="dark" class="col-span-12 md:col-span-4" :label="'Current Balance'" :value="money(currentBalance)" />
      <StatCard class="col-span-12 md:col-span-4" :label="'Income'" :value="money(totalIncome)" />
      <StatCard class="col-span-12 md:col-span-4" :label="'Expenses'" :value="money(totalExpense)" />
      <div class="col-span-12 lg:col-span-7 space-y-6">
        <SectionCard title="Pots" linkText="See Details">
          <PotsPreview />
        </SectionCard>
        <SectionCard
            title="Transactions"
            linkText="View all"
            @action="router.push('/transactions')"
        >
          <TransactionsPreview />
        </SectionCard>
      </div>
      <div class="col-span-12 lg:col-span-5 space-y-6">
        <SectionCard
            title="Budgets"
            linkText="See Details"
            @action="router.push('/budgets')"
        >
          <BudgetsPreview />
        </SectionCard>
        <SectionCard
            title="Recurring Bills"
            linkText="See Details"
            @action="router.push('/bills')"
        >
          <RecurringBillsCardBody/>
        </SectionCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseCard from '@/components/ui/card/BaseCard.vue'
import StatCard from '@/components/overview/StatCard.vue'
import SectionCard from '@/components/ui/card/SectionCard.vue'
import PotsPreview from '@/components/overview/PotsPreview.vue'
import BudgetsPreview from '@/components/overview/BudgetsPreview.vue'
import { useBalanceStore } from '@/stores/balance.js'
import { computed } from 'vue'
import { money } from '@/utils/money.js'
import router from '@/router/index.js'
import TransactionsPreview from "@/components/overview/TransactionsPreview.vue";
import RecurringBillsCardBody from "@/components/overview/RecurringBillsCardBody.vue";

const balanceStore = useBalanceStore()
const currentBalance = computed(() => balanceStore.current ?? 0)
const totalIncome    = computed(() => balanceStore.income ?? 0)
const totalExpense   = computed(() => balanceStore.expenses ?? 0)
</script>
