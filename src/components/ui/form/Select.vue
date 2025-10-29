<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  id?: string;
  label?: string;
  modelValue?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  helper?: string;
}>(), {
  modelValue: "",
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "change", v: string): void;
}>();

const selectId = computed(() => props.id ?? `sel-${Math.random().toString(36).slice(2, 8)}`);
const helperId = computed(() => (props.helper ? `${selectId.value}-help` : undefined));
const errorId = computed(() => (props.error ? `${selectId.value}-err` : undefined));
const describedBy = computed(() => [helperId.value, errorId.value].filter(Boolean).join(" ") || undefined);

function onChange(e: Event) {
  const v = (e.target as HTMLSelectElement).value;
  emit("update:modelValue", v);
  emit("change", v);
}
</script>

<template>
  <div class="block">
    <label v-if="label" :for="selectId" class="mb-1 block text-sm text-brand.muted">
      {{ label }} <span v-if="required" aria-hidden="true" class="text-danger">*</span>
    </label>

    <div class="relative rounded-xl border border-black/10 bg-white focus-within:ring-2 focus-within:ring-brand.ring">
      <select
          :id="selectId"
          :value="modelValue"
          :required="required"
          :disabled="disabled"
          :aria-invalid="!!error || undefined"
          :aria-describedby="describedBy"
          class="w-full appearance-none rounded-xl bg-transparent px-3 py-2 outline-none"
          @change="onChange"
      >
        <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
        <slot />
      </select>

      <svg
          class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-60"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
      >
        <path
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
        />
      </svg>
    </div>

    <p v-if="helper && !error" :id="helperId" class="mt-1 text-xs text-brand.muted">{{ helper }}</p>
    <p v-if="error" :id="errorId" class="mt-1 text-xs text-danger">{{ error }}</p>
  </div>
</template>
