export type Category =
    | "Bills"
    | "Dining Out"
    | "Education"
    | "Entertainment"
    | "General"
    | "Groceries"
    | "Lifestyle"
    | "Personal Care"
    | "Shopping"
    | "Transportation"
    | (string & {});

export interface Balance {
    current: number;
    income: number;
    expenses: number;
}

export interface Transaction {
    id: string;
    avatar: string;
    name: string;
    category: Category;
    date: string;
    amount: number;
    recurring?: boolean;
}

export interface Budget {
    id: string;
    category: Category;
    maximum: number;
    theme: string;
}

export interface Pot {
    id: string;
    name: string;
    target: number;
    total: number;
    theme?: string;
}