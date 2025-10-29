import { defineStore } from "pinia";
import type { Balance } from "@/types/finance";

interface BalanceState extends Balance {}

export const useBalanceStore = defineStore("balance", {
    state: (): BalanceState => ({
        current: 0,
        income: 0,
        expenses: 0,
    }),
    actions: {
        setAll(payload: Balance) {
            this.current = payload.current;
            this.income = payload.income;
            this.expenses = payload.expenses;
        },
    },
});
