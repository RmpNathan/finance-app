<script setup lang="ts">
import { computed, ref, watchEffect } from "vue";

const props = withDefaults(defineProps<{
  id?: string;
  label?: string;
  modelValue?: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helper?: string;
  autocomplete?: string;
}>(), {
  type: "text",
  modelValue: "",
  autocomplete: "off",
});

const emit = defineEmits<{
  (e: "update:modelValue", v: string): void;
  (e: "blur"): void;
  (e: "focus"): void;
}>();

const inputId = computed(() => props.id ?? `in-${Math.random().toString(36).slice(2, 8)}`);
const helperId = computed(() => (props.helper ? `${inputId.value}-help` : undefined));
const errorId  = computed(() => (props.error  ? `${inputId.value}-err` : undefined));
const describedBy = computed(() => [helperId.value, errorId.value].filter(Boolean).join(" ") || undefined);

const local = ref(props.modelValue);
watchEffect(() => (local.value = props.modelValue));
</script>

<template>
  <div class="block">
    <label v-if="label" :for="inputId" class="mb-1 block text-sm text-brand.muted">
      {{ label }} <span v-if="required" aria-hidden="true" class="text-danger">*</span>
    </label>
    <div class="relative flex items-center gap-2 rounded-xl border border-black/10 bg-white focus-within:ring-2 focus-within:ring-brand.ring">
      <slot name="left" />
      <input
          :id="inputId"
          :type="type"
          :value="local"
          :placeholder="placeholder"
          :required="required"
          :disabled="disabled"
          :autocomplete="autocomplete"
          :aria-invalid="!!error || undefined"
          :aria-describedby="describedBy"
          class="w-full rounded-xl bg-transparent px-3 py-2 outline-none placeholder:text-black/40"
          @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
          @focus="emit('focus')"
          @blur="emit('blur')"
      />
      <slot name="right" />
    </div>

    <p v-if="helper && !error" :id="helperId" class="mt-1 text-xs text-brand.muted">{{ helper }}</p>
    <p v-if="error" :id="errorId" class="mt-1 text-xs text-danger">{{ error }}</p>
  </div>
</template>
