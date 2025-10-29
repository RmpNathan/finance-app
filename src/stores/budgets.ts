import { defineStore } from "pinia";
import type { Budget, Category } from "@/types/finance";

interface BudgetsState {
    items: Budget[];
}

export const useBudgetsStore = defineStore("budgets", {
    state: (): BudgetsState => ({
        items: [],
    }),
    getters: {
        byCategory: (state) => (category: Category) =>
            state.items.find((b) => b.category === category) || null,
    },
    actions: {
        setAll(items: Budget[]) {
            this.items = items;
        },
    },
});
