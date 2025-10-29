import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
    { path: "/", redirect: "/overview" },
    { path: "/overview", component: () => import("@/pages/OverviewPage.vue") },
    { path: "/transactions", component: () => import("@/pages/TransactionsPage.vue") },
    { path: "/budgets", component: () => import("@/pages/BudgetsPage.vue") },
    { path: "/pots", component: () => import("@/pages/PotsPage.vue") },
    { path: "/recurring", component: () => import("@/pages/RecurringPage.vue") },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ top: 0 }),
});

export default router;
