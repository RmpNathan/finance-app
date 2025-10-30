<template>
  <div class="grid grid-cols-12 gap-6 items-center">
    <div class="col-span-12 md:col-span-7 flex items-center justify-center">
      <div class="relative w-full flex items-center justify-center" style="height:240px">
        <ApexChart
            :key="chartKey"
            type="donut"
            height="240"
            :options="options"
            :series="series"
        />
        <!-- Overlay centre -->
        <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div class="text-center">
            <div class="text-2xl font-bold">{{ money(totalSpent) }}</div>
            <div class="text-xs text-gray-500">of {{ money(totalLimit) }} limit</div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 md:col-span-5 space-y-3">
      <StatItem
          v-for="b in budgetsView"
          :key="b.name"
          :title="b.name"
          :amount="b.spent"
          :color="b.color"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import ApexChart from 'vue3-apexcharts'
import {computed} from 'vue'
import {money} from '@/utils/money'
import {useBudgetsStore} from '@/stores/budgets'
import {useTransactionsStore} from '@/stores/transactions'
import StatItem from '@/components/ui/data/StatItem.vue'

const budgetsStore = useBudgetsStore()
const txStore = useTransactionsStore()

const expensesByCategory = computed<Record<string, number>>(() => {
  const map: Record<string, number> = {}
  for (const t of txStore.items ?? []) {
    if (t.amount < 0 && t.category) {
      const k = String(t.category)
      map[k] = (map[k] ?? 0) + Math.abs(t.amount)
    }
  }
  return map
})

const budgetsView = computed(() =>
    (budgetsStore.items ?? []).map(b => ({
      name: b.category,
      color: b.theme,
      limit: b.maximum,
      spent: expensesByCategory.value[b.category] ?? 0,
    }))
)

const series = computed<number[]>(() => {
  const s = budgetsView.value.map(b => b.spent)
  return s.length ? s : [0.0001]
})
const totalLimit = computed(() =>
    budgetsView.value.reduce((a, b) => a + (b.limit ?? 0), 0)
)

const totalSpent = computed(() =>
    series.value.reduce((a, n) => a + n, 0)
)
const labels = computed(() => {
  const l = budgetsView.value.map(b => b.name)
  return l.length ? l : ['']
})
const chartKey = computed(() => series.value.join(',') + '|' + totalLimit.value)
const options = computed(() => ({
  chart: {type: 'donut', toolbar: {show: false}},
  labels: labels.value,
  colors: budgetsView.value.map(b => b.color),
  legend: {show: false},
  tooltip: {enabled: false},
  dataLabels: {enabled: false},
  stroke: {width: 0},
  plotOptions: {
    pie: {donut: {size: '62%'}, expandOnClick: false, customScale: 1},
  },
  fill: {opacity: 1},
  states: {active: {filter: {type: 'none'}}, hover: {filter: {type: 'none'}}},
}))
</script>


<style scoped>
:deep(.apexcharts-datalabels-group) {
  text-anchor: middle;
}

:deep(.apexcharts-datalabels-group .apexcharts-datalabel-value) {
  font-size: 28px;
  font-weight: 700;
  fill: #111827;
  transform: translateY(-8px);
}

:deep(.apexcharts-datalabels-group .apexcharts-datalabel-label) {
  font-size: 12px;
  fill: #6b7280;
  transform: translateY(12px);
}
</style>
