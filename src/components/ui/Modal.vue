<script setup lang="ts">
import {nextTick, onMounted, onUnmounted, ref, watch} from "vue";

const props = withDefaults(defineProps<{
  modelValue: boolean;
  titleId?: string;
  descId?: string;
  closeOnOverlay?: boolean;
}>(), {
  closeOnOverlay: true,
});

const emit = defineEmits<{
  (e: "update:modelValue", v: boolean): void;
  (e: "open"): void;
  (e: "close"): void;
}>();

const dialogRef = ref<HTMLElement | null>(null);
let lastFocused: Element | null = null;

function open() {
  lastFocused = document.activeElement;
  emit("open");
  // wait render then focus first focusable
  nextTick(() => {
    const focusable = getFocusable();
    (focusable[0] as HTMLElement | undefined)?.focus();
  });
  document.addEventListener("keydown", onKeydown);
}

function close() {
  emit("update:modelValue", false);
  emit("close");
  document.removeEventListener("keydown", onKeydown);
  if (lastFocused instanceof HTMLElement) lastFocused.focus();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    e.stopPropagation();
    close();
  }
  if (e.key === "Tab") {
    const nodes = getFocusable();
    if (!nodes.length) return;
    const first = nodes[0], last = nodes[nodes.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && active === first) {
      e.preventDefault();
      (last as HTMLElement).focus();
    } else if (!e.shiftKey && active === last) {
      e.preventDefault();
      (first as HTMLElement).focus();
    }
  }
}

function getFocusable(): Element[] {
  const root = dialogRef.value;
  if (!root) return [];
  return Array.from(
      root.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      )
  ).filter(el => (el as HTMLElement).offsetParent !== null);
}

watch(() => props.modelValue, (v) => {
  if (v) open();
  else document.removeEventListener("keydown", onKeydown);
});

onMounted(() => {
  if (props.modelValue) open();
});
onUnmounted(() => document.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Teleport to="body">
    <div
        v-show="modelValue"
        class="fixed inset-0 z-50"
        aria-hidden="true"
        @click="closeOnOverlay && close()"
    >
      <div class="absolute inset-0 bg-black/50"></div>
      <div
          class="absolute inset-0 flex items-end md:items-center justify-center p-4"
          @click.stop
      >
        <div
            ref="dialogRef"
            role="dialog"
            :aria-modal="true"
            :aria-labelledby="titleId"
            :aria-describedby="descId"
            class="card w-full max-w-lg p-4 md:p-6"
        >
          <slot/>
        </div>
      </div>
    </div>
  </Teleport>
</template>
