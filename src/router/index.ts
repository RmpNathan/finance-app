import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";
import Button from "@/components/ui/Button.vue";

const routes: RouteRecordRaw[] = [
    {path: "/", redirect: "/overview", meta: {title: "Overview"}},
    {path: "/overview", component: () => import("@/pages/OverviewPage.vue"), meta: {title: "Overview"}},
    {path: "/transactions", component: () => import("@/pages/TransactionsPage.vue"), meta: {title: "Transactions"}},
    {
        path: "/budgets", component: () => import("@/pages/BudgetsPage.vue"), meta: {
            title: "Budgets", headerActions: [
                {
                    component: Button,
                    props: {
                        as: "button",
                        variant: "primary",
                        size: "md",
                        ariaLabel: "Exporter",
                        defaultSlot: "Exporter"
                    }
                }
            ]
        }
    },
    {path: "/pots", component: () => import("@/pages/PotsPage.vue"), meta: {title: "Pots"}},
    {path: "/recurring", component: () => import("@/pages/RecurringPage.vue"), meta: {title: "Recurring"}},
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({top: 0}),
});

export default router;
