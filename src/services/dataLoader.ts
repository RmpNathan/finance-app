import type { Transaction, Budget, Pot, Balance } from "@/types/finance";

export interface FinanceData {
    balance: Balance;
    transactions: Transaction[];
    budgets: Budget[];
    pots: Pot[];
}

export async function loadFinanceData(): Promise<FinanceData> {
    const res = await fetch("/data.json");
    if (!res.ok) {
        throw new Error(`Failed to load data.json (${res.status})`);
    }
    return await res.json();
}
