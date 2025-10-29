<template>
  <header class="px-6 sm:px-8 py-5 sticky top-0 bg-zinc-100/80 backdrop-blur z-10">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>
      <div class="flex items-center gap-2">
        <slot name="actions" />
      </div>
    </div>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, default: 'Overview' },
})
</script>
