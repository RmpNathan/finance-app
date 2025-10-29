<template>
  <div>
    <nav class="p-3 flex gap-3 text-sm underline">
      <RouterLink to="/overview">Overview</RouterLink>
      <RouterLink to="/transactions">Transactions</RouterLink>
      <RouterLink to="/budgets">Budgets</RouterLink>
      <RouterLink to="/pots">Pots</RouterLink>
      <RouterLink to="/recurring">Recurring</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
