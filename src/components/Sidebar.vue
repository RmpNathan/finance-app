<template>
  <aside class="w-60 bg-zinc-900 text-white flex flex-col">
    <div class="px-5 py-4 text-xl font-semibold">finance</div>
    <nav class="mt-2 flex-1 space-y-1 px-2">
      <RouterLink to="/" class="nav-item">Overview</RouterLink>
      <RouterLink to="/budgets" class="nav-item">Budgets</RouterLink>
    </nav>
    <button class="m-3 mt-auto rounded-lg bg-white/10 px-3 py-2 hover:bg-white/20">
      Minimize Menu
    </button>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.nav-item { @apply block px-3 py-2 rounded-lg hover:bg-white/10; }
.router-link-active { @apply bg-white/10; }
</style>
