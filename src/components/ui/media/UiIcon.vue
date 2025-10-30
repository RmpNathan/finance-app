<template>
  <img v-if="!canMask" :src="src" :alt="alt" :class="['inline-block align-middle', sizeClass, $attrs.class]" />

  <span v-else
        class="inline-block align-middle"
        :class="[sizeClass, $attrs.class]"
        :style="maskStyle"
        aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(defineProps<{
  src: string
  alt?: string
  size?: 'sm'|'md'|'lg'
}>(), { size: 'md' })

const sizeClass = computed(() => ({ sm:'w-4 h-4', md:'w-5 h-5', lg:'w-6 h-6' }[props.size]))

const canMask = ref(false)
onMounted(() => {
  try {
    const ok = (window.CSS && (
        CSS.supports('mask-image', 'url("data:,")') ||
        CSS.supports('-webkit-mask-image', 'url("data:,")')
    ))
    canMask.value = !!ok
  } catch { canMask.value = false }
})

const maskStyle = computed(() => ({
  backgroundColor: 'currentColor',
  display: 'inline-block',
  maskImage: `url("${props.src}")`,
  maskRepeat: 'no-repeat',
  maskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskImage: `url("${props.src}")`,
  WebkitMaskRepeat: 'no-repeat',
  WebkitMaskPosition: 'center',
  WebkitMaskSize: 'contain',
}))
</script>
