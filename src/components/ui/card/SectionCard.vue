<template>
  <BaseCard :tone="tone" :bordered="bordered" :hoverable="hoverable" :class="cardClass">
    <div class="mb-5 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-semibold">{{ title }}</h2>
        <p v-if="subtitle" class="text-md text-zinc-500 mt-0.5">{{ subtitle }}</p>
      </div>

      <div class="flex items-center gap-2">
        <slot name="actions"/>
        <UIButton
            v-if="actionText"
            size="sm"
            variant="ghost"
            @click="$emit('action')"
        >
          {{ actionText }}
        </UIButton>
        <button
            v-else-if="linkText"
            class="text-lg text-zinc-500 hover:text-zinc-800 inline-flex items-center gap-1"
            @click="$emit('action')"
        >
          {{ linkText }} <span class="ms-5" aria-hidden>›</span>
        </button>
      </div>
    </div>
    <slot/>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/ui/card/BaseCard.vue'
import UIButton from '@/components/ui/form/Button.vue'

defineEmits<{ (e: 'action'): void }>()
withDefaults(defineProps<{
  title: string
  subtitle?: string
  tone?: 'surface' | 'dark'
  actionText?: string    // ex: "View All"
  linkText?: string      // ex: "See Details"
  bordered?: boolean
  hoverable?: boolean
  cardClass?: string
}>(), {
  tone: 'surface',
  bordered: true,
  hoverable: false,
  cardClass: ''
})
</script>
