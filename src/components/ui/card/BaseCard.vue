<template>
  <div
      :is="as"
      :class="[
      'rounded-2xl p-5 shadow-sm',
      toneClass,
      bordered ? 'ring-1 ring-black/5' : '',
      hoverable ? 'transition-shadow hover:shadow-md' : '',
      props.class,
    ]"
  >
    <div v-if="$slots.header" class="mb-3">
      <slot name="header" />
    </div>

    <slot />

    <div v-if="$slots.footer" class="mt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  as: { type: String, default: 'div' },
  tone: {
    type: String,
    default: 'surface', // 'surface' | 'muted' | 'dark' | 'brand' | 'danger' etc.
  },
  hoverable: { type: Boolean, default: false },
  bordered: { type: Boolean, default: true },
  class: { type: String, default: '' },
})

const toneClass = computed(() => {
  switch (props.tone) {
    case 'muted': return 'bg-zinc-50'
    case 'dark': return 'bg-zinc-800 text-white'
    case 'brand': return 'bg-emerald-500 text-white'
    case 'danger': return 'bg-rose-500 text-white'
    default: return 'bg-white'
  }
})
</script>
