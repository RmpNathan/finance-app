<template>
  <div class="grid grid-cols-12 gap-6 items-center">
    <div class="col-span-12 md:col-span-6">
      <div class="flex items-center gap-4 p-5 rounded-xl bg-zinc-900/5">
        <div class="me-3">
          <img :src="iconPot" alt="" aria-hidden="true"/>
        </div>
        <div>
          <div class="text-sm text-zinc-500 mb-3">Total Saved</div>
          <div class="text-3xl font-semibold">{{ money(totalSaved) }}</div>
        </div>
      </div>
    </div>

    <div class="col-span-12 md:col-span-6 grid grid-cols-2 gap-x-10 gap-y-4">
      <div v-for="p in topPots" :key="p.name" class="flex items-center gap-3">
        <StatItem
          :title="p.name"
          :color="p.theme"
          :amount="p.total"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'
import {usePotsStore} from '@/stores/pots'
import {money} from "@/utils/money";
import iconPot from '../../../public/assets/images/icon-pot.svg'
import StatItem from "@/components/ui/data/StatItem.vue";

const pots = usePotsStore()

const totalSaved = computed(() => pots.totalSaved)
const topPots = computed(() => pots.top(4))
</script>
