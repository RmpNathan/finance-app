import {defineStore} from "pinia";
import type {Pot} from "@/types/finance";

interface PotsState {
    items: Pot[];
}

export const usePotsStore = defineStore("pots", {
    state: (): PotsState => ({
        items: [],
    }),
    getters: {
        totalSaved: (s) => s.items.reduce((sum, p) => sum + (p.total ?? 0), 0),

        withProgress: (s) => s.items.map(p => ({...p, progress: p.target ? p.total / p.target : 0})),

        sortedByProgress(): Array<Pot & { progress: number }> {
            return [...this.withProgress].sort((a, b) => b.progress - a.progress)
        },

        top: (s) => (n = 4) => (s as any).sortedByProgress.slice(0, n),
    },
    actions: {
        setAll(items: Pot[]) {
            this.items = items;
        },
    },
});
