import { defineStore } from "pinia";
import type { Pot } from "@/types/finance";

interface PotsState {
    items: Pot[];
}

export const usePotsStore = defineStore("pots", {
    state: (): PotsState => ({
        items: [],
    }),
    actions: {
        setAll(items: Pot[]) {
            this.items = items;
        },
    },
});
