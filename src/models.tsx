export enum Priority {
    'low',
    'medium',
    'high',
}

export enum Labels {
    'html',
    'css',
    'jquery',
    'nodejs',
}

export type Person = {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export type Todo = {
    id: number,
    title: string,
    person: Person,
    startDate: Date,
    endDate: Date,
    priority: Priority,
    labels: Labels[],
    description: string,
    // completed: boolean,
}