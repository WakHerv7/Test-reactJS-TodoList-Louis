import { useState, useEffect, useReducer } from "react";
import GlobalContext, { Tasks } from "./GlobalContext";
import { Person, Priority, Labels, initFunction } from "../utils";
import dayjs from "dayjs";

const todoReducerFunc = (state: Tasks[], { type, payload}: { type: string, payload: Tasks}) => {
  switch (type) {
    case 'push':
      return [...state, payload];
    case 'update':
      return state.map((task) => task.id === payload.id ? payload : task);
    case 'delete':
      return state.filter((task) => task.id !== payload.id);
    default:
      throw new Error()
  }
}


export default function ContextWrapper({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPersonModal, setShowPersonModal] = useState<boolean>(false);
  const [person, setPerson] = useState<Person[]>([]);
  const [value, setValue] = useState<Person | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const startDate = Date.now();
  const [dueDate, setDueDate] = useState<any>(dayjs(startDate));
  const [labels, setLabels] = useState<Labels[]>([]);
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const [ savedTasks, setSavedTasks ] = useState<Tasks[]>([]);

  const [savedTodoObjects, dispatchTodoEvents] = useReducer(todoReducerFunc, [], initFunction);

  useEffect(() => {
    localStorage.setItem('savedTodos', JSON.stringify(savedTodoObjects));
  }, [savedTodoObjects])

  return (
    <GlobalContext.Provider value={{
      showModal,
      setShowModal,
      showPersonModal,
      setShowPersonModal,
      person,
      setPerson,
      value,
      setValue,
      inputValue,
      setInputValue,
      title,
      setTitle,
      description,
      dueDate,
      labels,
      priority,
      setDescription,
      setDueDate,
      setLabels,
      setPriority,
      savedTasks,
      setSavedTasks,
      dispatchTodoEvents,
    }}>
      {children}
    </GlobalContext.Provider>
  )
}
