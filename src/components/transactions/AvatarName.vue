<template>
  <div class="flex items-center gap-3 min-w-0">
    <Avatar :src="avatar" :alt="name" />
    <span class="font-medium text-gray-900 truncate">{{ name }}</span>
  </div>
</template>

<script setup lang="ts">
import Avatar from '@/components/ui/media/Avatar.vue'
defineProps<{ name: string; avatar?: string }>()
</script>
