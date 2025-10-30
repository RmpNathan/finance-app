<template>
  <div class="relative w-full flex items-center justify-center" :style="{ height: `${height}px` }">
    <ApexChart
        :key="chartKey"
        type="donut"
        :height="height"
        :options="options"
        :series="series"
    />
    <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <div class="text-center">
        <div class="text-2xl font-bold">{{ money(total) }}</div>
        <div class="text-xs text-gray-500">of {{ money(limit) }} limit</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ApexChart from 'vue3-apexcharts'
import { computed } from 'vue'
import { money } from '@/utils/money'

const props = defineProps({
  series: { type: Array<number>, required: true },
  labels: { type: Array<string>, required: true },
  colors: { type: Array<string>, required: true },
  total: { type: Number, required: true },
  limit: { type: Number, required: true },
  height: { type: [String, Number], default: 240 },
})

const chartKey = computed(() => props.series.join(',') + '|' + props.limit)

const options = computed(() => ({
  chart: { type: 'donut', toolbar: { show: false } },
  labels: props.labels,
  colors: props.colors,
  legend: { show: false },
  tooltip: { enabled: false },
  dataLabels: { enabled: false },
  stroke: { width: 0 },
  plotOptions: {
    pie: { donut: { size: '62%' }, expandOnClick: false, customScale: 1 },
  },
  fill: { opacity: 1 },
  states: {
    active: { filter: { type: 'none' } },
    hover: { filter: { type: 'none' } },
  },
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
