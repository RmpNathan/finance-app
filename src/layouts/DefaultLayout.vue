<template>
  <div class="min-h-screen flex bg-zinc-100 text-zinc-900">
    <AppNav />
    <main class="flex-1">
      <AppHeader :title="route.meta.title">
        <template #actions>
          <template v-for="(action, i) in route.meta.headerActions || []" :key="i">
            <component
                :is="action.component"
                v-bind="action.props"
            >
              {{ action.props?.defaultSlot }}
            </component>
          </template>
        </template>
      </AppHeader>
      <div class="px-6 sm:px-8 pb-10">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import AppHeader from '../components/AppHeader.vue'
import AppNav from "@/layouts/AppNav.vue";
const route = useRoute()
</script>
