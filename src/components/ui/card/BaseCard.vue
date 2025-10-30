<template>
  <div
      class="rounded-xl shadow-sm px-8 py-6"
      :class="[
      toneClass,
      bordered ? 'ring-1 ring-black/5' : '',
      hoverable ? 'transition-shadow hover:shadow-md' : '',
      $attrs.class
  ]"
  >
    <div v-if="$slots.header" class="mb-3">
      <slot name="header"/>
    </div>

    <slot/>

    <div v-if="$slots.footer" class="mt-4">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue'

const props = withDefaults(
    defineProps<{
      tone?: 'surface' | 'muted' | 'dark' | 'brand' | 'danger'
      hoverable?: boolean
      bordered?: boolean
    }>(),
    {
      tone: 'surface',
      hoverable: false,
      bordered: true
    }
)

const toneClass = computed(() => {
  switch (props.tone) {
    case 'muted':
      return 'bg-zinc-50'
    case 'dark':
      return 'bg-zinc-800 text-white'
    case 'brand':
      return 'bg-emerald-500 text-white'
    case 'danger':
      return 'bg-rose-500 text-white'
    default:
      return 'bg-white'
  }
})
</script>
