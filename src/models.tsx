export enum Priority {
    LOW = 'Facile',
    MEDIUM = 'Moyen',
    HIGH = 'Difficile',
}

export enum Labels {
    HTML = 'HTML',
    CSS = 'CSS',
    NODEJS = 'NodeJS',
    JQUERY = 'JQuery',
}

export type Person = {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export type ToDo = {
    id: number,
    title: string,
    person: Person,
    startDate: Date,
    endDate: Date,
    priority: Priority,
    labels: Labels[],
    description: string,
    complited: boolean,
    // dueDate: Date,
}