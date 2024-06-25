export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

export type Person = {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export enum Labels {
  HTML = 'html',
  CSS = 'Css',
  NODEJS = 'Nodejs',
  JQUERY = 'Jquery',
}

export type ToDo = {
  title: string,
  label: Labels[],
  dueDate: Date,
}

export const initFunction = () => {
  const storageTodos = localStorage.getItem('savedTodos');
  const parsedTodos = storageTodos ? JSON.parse(storageTodos) : [];
  return parsedTodos;
}