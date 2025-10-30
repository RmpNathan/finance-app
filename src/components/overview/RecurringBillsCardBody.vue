<template>
  <div class="space-y-3">
    <MetricRow title="Paid Bills"     :amount="totals.paid"     color="#277C78" />
    <MetricRow title="Total Upcoming" :amount="totals.upcoming" color="#F2CDAC" />
    <MetricRow title="Due Soon"       :amount="totals.dueSoon"  color="#82C9D7" />
  </div>
</template>

<script setup lang="ts">
import { useRecurringBills } from '@/composables/useRecurringBills'
import MetricRow from "@/components/overview/MetricRow.vue";

const { totals } = useRecurringBills()
</script>
