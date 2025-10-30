<template>
  <aside
      class="hidden lg:flex flex-col bg-zinc-900 text-white rounded-r-2xl shadow-lg transition-all
           h-screen sticky top-0 overflow-hidden"
      :class="collapsed ? 'w-18' : 'w-64'"
  >
    <div class=" mb-5 mt-3 px-5 py-4 flex items-center justify-between">
      <div class="font-semibold text-xl tracking-tight" :class="collapsed && 'sr-only'">finance</div>
    </div>

    <nav class="flex-1 pr-2 space-y-1">
      <RouterLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          custom
          v-slot="{ href, navigate }"
      >
        <a
            :href="href"
            @click="navigate"
            class="group relative flex items-center gap-3 rounded-r-xl px-3 py-4 transition-colors border-l-4"
            :class="isActive(item)
    ? 'bg-white text-zinc-900 shadow-sm border-teal-600'
    : 'text-zinc-300 hover:text-white hover:bg-white/10 border-transparent'"
        >
          <UiIcon
              :src="icons[item.icon]"
              class="w-5 h-5"
              :class="isActive(item)
      ? 'text-teal-600'
      : 'text-zinc-300 group-hover:text-white'"
          />
          <span :class="collapsed && 'sr-only'">{{ item.label }}</span>
        </a>
      </RouterLink>
    </nav>

    <button
        class="m-3 mt-auto rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20 text-sm"
        @click="toggle()"
    >
      <span :class="collapsed && 'sr-only'">Minimize Menu</span>
      <span v-if="collapsed" class="block mx-auto w-5 h-5">
        <svg viewBox="0 0 24 24"><path fill="currentColor" d="M19 13H5v-2h14v2Z"/></svg>
      </span>
    </button>
  </aside>

  <nav class="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-zinc-900 text-white border-t border-zinc-800">
    <ul class="grid grid-cols-5">
      <li v-for="item in items" :key="item.to">
        <RouterLink :to="item.to" custom v-slot="{ href, navigate }">
          <a :href="href" @click="navigate" class="flex flex-col items-center justify-center py-2 gap-1">
            <div class="relative rounded-xl px-3 py-2" :class="isActive(item) ? 'bg-white/10' : ''">
              <UiIcon :src="icons[item.icon]" class="w-6 h-6" :class="isActive(item) ? 'text-white' : 'text-zinc-300'" />
              <span
                  class="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded bg-teal-600"
                  :class="isActive(item) ? 'opacity-100' : 'opacity-0'"
              />
            </div>
            <span class="hidden sm:block text-xs text-zinc-300" :class="isActive(item) && 'text-white'">
              {{ item.label }}
            </span>
          </a>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import UiIcon from '@/components/ui/media/UiIcon.vue'

import icHome   from '@/assets/images/icon-nav-overview.svg'
import icSwap   from '@/assets/images/icon-nav-transactions.svg'
import icDonut  from '@/assets/images/icon-nav-budgets.svg'
import icWallet from '@/assets/images/icon-nav-pots.svg'
import icBill   from '@/assets/images/icon-nav-recurring-bills.svg'

const icons = { home: icHome, swap: icSwap, donut: icDonut, wallet: icWallet, bill: icBill }

const collapsed = ref(localStorage.getItem('nav:collapsed') === '1')
const toggle = () => (collapsed.value = !collapsed.value)
watchEffect(() => localStorage.setItem('nav:collapsed', collapsed.value ? '1' : '0'))

type Item = { to: string; label: string; icon: keyof typeof icons }
const items: Item[] = [
  { to: '/overview',             label: 'Overview',        icon: 'home'  },
  { to: '/transactions', label: 'Transactions',    icon: 'swap'  },
  { to: '/budgets',      label: 'Budgets',         icon: 'donut' },
  { to: '/pots',         label: 'Pots',            icon: 'wallet'},
  { to: '/bills',        label: 'Recurring Bills', icon: 'bill'  },
]

const route = useRoute()
const router = useRouter()

const normalize = (p: string) => {
  const n = p.replace(/\/+$/, '')
  return n === '' ? '/' : n
}

const resolvedPath = (to: string) => normalize(router.resolve(to).path)
const currentPath  = computed(() => normalize(route.path))

const isActive = (item: Item) => {
  const target = resolvedPath(item.to)
  if (target === '/') return currentPath.value === '/'
  return currentPath.value === target || currentPath.value.startsWith(target + '/')
}
</script>


<style scoped>
.w-18 { width: 4.5rem; }
</style>
