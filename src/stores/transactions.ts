import { defineStore } from "pinia";
import type { Transaction, Category } from "@/types/finance";

interface TransactionsState {
    items: Transaction[];
}

export const useTransactionsStore = defineStore("transactions", {
    state: (): TransactionsState => ({
        items: [],
    }),
    getters: {
        byCategory: (state) => (category: Category) =>
            state.items.filter((t) => t.category === category),
    },
    actions: {
        setAll(items: Transaction[]) {
            this.items = items;
        },
    },
});
