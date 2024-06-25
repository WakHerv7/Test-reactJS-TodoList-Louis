import { createContext } from 'react';
import { Labels, Person, Priority } from '../utils';
import dayjs from 'dayjs';

export type Tasks = {
  id: number,
  title: string,
  description: string,
  startDate: number,
  dueDate: number,
  person: Person,
  labels: Labels[],
  priority: Priority,
}


const GlobalContext = createContext({
  showModal: false,
  setShowModal: (showModal: boolean) => {},
  showPersonModal: false,
  setShowPersonModal: (personModal: boolean) => {},
  person: [] as Person[],
  setPerson: (person: Person[]) => {},
  value: {} as Person | null,
  setValue: (value: Person) => {},
  inputValue: '',
  setInputValue: (input: string) => {},
  title: '',
  setTitle: (title: string) => {},
  description: '',
  setDescription: (description: string) => {},
  dueDate: dayjs(Date.now()),
  setDueDate: (dueDate: Date) => {},
  labels: [] as Labels[],
  setLabels: (labels: Labels[]) => {},
  priority: '' as Priority,
  setPriority: (priority: Priority) => {},
  savedTasks: [] as Tasks[],
  setSavedTasks: (savedTasks: Tasks[] ) => {},
  dispatchTodoEvents: ({ }: { type: string, payload: Tasks}) => {}
});

export default GlobalContext;

