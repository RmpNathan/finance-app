import { defineStore } from "pinia";

interface RecurringVendor {
    name: string;
}

interface RecurringState {
    vendors: RecurringVendor[];
}

export const useRecurringStore = defineStore("recurring", {
    state: (): RecurringState => ({
        vendors: [],
    }),
});
