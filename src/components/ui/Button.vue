<script setup lang="ts">
import { computed } from "vue";

type Variant = "primary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const props = withDefaults(defineProps<{
  as?: "button" | "a" | "submit";
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}>(), {
  as: "button",
  variant: "primary",
  size: "md",
  fullWidth: false,
  loading: false,
  disabled: false,
  type: "button",
});

const isDisabled = computed(() => props.disabled || props.loading);

const classes = computed(() => {
  const base = "inline-flex items-center justify-center rounded-xl transition whitespace-nowrap select-none";
  const focus = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tw-ring-color)]";
  const sizes: Record<Size, string> = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-5 text-base",
  };
  const variants: Record<Variant, string> = {
    primary: "bg-brand.primary text-white hover:opacity-90 disabled:opacity-50",
    ghost: "bg-transparent text-brand.text hover:bg-black/5 disabled:opacity-50",
    danger: "bg-danger text-white hover:opacity-90 disabled:opacity-50",
  };
  const width = props.fullWidth ? "w-full" : "w-auto";
  const ring = "ring-brand.ring";
  return [base, focus, sizes[props.size], variants[props.variant], width, ring].join(" ");
});
</script>

<template>
  <component
      :is="props.as === 'a' ? 'a' : 'button'"
      :href="props.as === 'a' ? href : undefined"
      :type="props.as === 'a' ? undefined : type"
      :disabled="props.as !== 'a' ? isDisabled : undefined"
      :aria-disabled="isDisabled || undefined"
      :aria-busy="loading || undefined"
      :aria-label="ariaLabel"
      class="group"
  >
    <span :class="classes">
      <slot name="icon-left" />
      <span class="inline-flex items-center gap-2">
        <span v-if="loading" class="inline-block size-4 animate-spin border-2 border-white/50 border-t-white rounded-full" />
        <slot />
      </span>
      <slot name="icon-right" />
    </span>
  </component>
</template>
