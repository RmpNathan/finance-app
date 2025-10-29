import { defineStore } from "pinia";
import { loadFinanceData } from "@/services/dataLoader";
import { useBalanceStore } from "@/stores/balance";
import { useTransactionsStore } from "@/stores/transactions";
import { useBudgetsStore } from "@/stores/budgets";
import { usePotsStore } from "@/stores/pots";

export const useAppStore = defineStore("app", {
    state: () => ({
        isReady: false,
        error: null as string | null,
    }),
    actions: {
        async init() {
            try {
                const data = await loadFinanceData();

                const balanceStore = useBalanceStore();
                const transactionsStore = useTransactionsStore();
                const budgetsStore = useBudgetsStore();
                const potsStore = usePotsStore();

                balanceStore.setAll(data.balance);
                transactionsStore.setAll(data.transactions);
                budgetsStore.setAll(data.budgets);
                potsStore.setAll(data.pots);

                this.isReady = true;
            } catch (err: any) {
                this.error = err.message ?? "Unknown error loading data";
            }
        },
    },
});
