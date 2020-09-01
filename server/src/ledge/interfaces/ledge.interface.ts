export interface Ledge {
    price: number;
    porn: porn;
    userId: string;
    groupId?: string;
    description: string;
    tag: string[];
    category: string;
    star: boolean;
}

enum porn {
    income = 'income',
    expense = 'expense'
}

export interface LedgeInput {
    price: number;
    porn: porn;
    userId: string;
    groupId?: string;
    description: string;
    tag: string;
    category: string;
    star: boolean;
}