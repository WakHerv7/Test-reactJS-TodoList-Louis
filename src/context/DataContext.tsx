import { faker } from '@faker-js/faker';
import { createContext, useEffect, useState } from 'react';
// import { setupMockHandlers } from '../mockHandler/dataMockHandler';
import { setupMockHandlers } from '../mockHandler/todoMockHandler';
// import { setupPersonMockHandlers } from '../mockHandler/personMockHandler';

import { useNavigate } from 'react-router-dom';
import { addMockPerson, deleteMockPerson, getMockPersons, getOneMockPerson, saveMockPerson, updateMockPerson } from '../api/person';
import { addMockTodo, deleteMockTodo, getMockTodos, getOneMockTodo, saveMockTodo, updateMockTodo } from '../api/todo';
import { Person, Todo } from '../models';


export type personModalProps = {
  mode: string,
  person?: any,
  open: boolean
}
export type todoModalProps = {
  mode: string,
  todo?: any,
  open: boolean
}
interface DataContextType {
  todos: Todo[];
  persons: Person[];

  showTodoModal: todoModalProps;
  updateStateShowTodoModal: (showTodoModal:todoModalProps) => void;
  showPersonModal: personModalProps;
  updateStateShowPersonModal: (showPersonModal:personModalProps) => void;

  getTodos: () => Promise<any[]>;
  getOneTodo: (id: number | string) => Promise<any>;
  addTodo: (newTodo: any) => Promise<void>;
  updateTodo: (id: number | string, updatedTodo: any) => Promise<void>;
  deleteTodo: (id: number | string) => Promise<void>;

  getPersons: () => Promise<any[]>;
  getOnePerson: (id: number | string) => Promise<any>;
  addPerson: (newPerson: any) => Promise<void>;
  updatePerson: (id: number | string, updatedPerson: any) => Promise<void>;
  deletePerson: (id: number | string) => Promise<void>;

  navigateToList: () => void;
  navigateToForm: (id?: number | string) => void;
}


export const DataContext = createContext<DataContextType>({
  todos: [],
  persons: [],

  showTodoModal: {mode:'', todo:{}, open:false},
  updateStateShowTodoModal: (param?:todoModalProps) => null,
  showPersonModal: {mode:'', person:{}, open:false},
  updateStateShowPersonModal: (param?: personModalProps) => null,


  getTodos: async () => [],
  getOneTodo: async (id: number | string) => {},
  addTodo: async (newTodo: any) => {},
  updateTodo: async (id: number | string, updatedTodo: any) => {},
  deleteTodo: async (id: number | string) => {},

  getPersons: async () => [],
  getOnePerson: async (id: number | string) => {},
  addPerson: async (newPerson: any) => {},
  updatePerson: async (id: number | string, updatedPerson: any) => {},
  deletePerson: async (id: number | string) => {},

  navigateToList: () => {},
  navigateToForm: () => {},
});

export const DataProvider = ({ children }:{children:any}) => {

  // Todos ----------------------------------
  // localStorage.removeItem("todos");
  const storedTodos = localStorage.getItem('todos');
  const stateTodos = storedTodos? JSON.parse(storedTodos) : null;
  stateTodos && saveMockTodo(stateTodos);

  // Persons ----------------------------------
  const mockPerson = Array.from({ length: 5 }, () => ({
    id: faker.number.int(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    phone: faker.string.numeric('+237 6## ### ###'),
  }));
  // localStorage.removeItem("persons");
  const storedPersons = localStorage.getItem('persons');
  const statePersons = storedPersons? JSON.parse(storedPersons) : mockPerson;
  saveMockPerson(statePersons);

  // STATE --------------------------------------------------------------
  const [todos, setTodos] = useState<any>(stateTodos ?? []);
  const [persons, setPersons] = useState<any>(statePersons);

  
  //--------------------------------------------------------------
  const [showPersonModal, setShowPersonModal] = useState<personModalProps>({mode:'', person:{}, open:false});
  const [showTodoModal, setShowTodoModal] = useState<todoModalProps>({mode:'', todo:{}, open:false});
  //--------------------------------------------------------------

  const updateStateShowPersonModal = (param:personModalProps) => {
    param?.open && param?.mode=='editForm' ? localStorage.setItem('personsEdit', 'true')  : localStorage.removeItem('personsEdit');
    setShowPersonModal(param);
  }
  const updateStateShowTodoModal = (param:todoModalProps) => {    
    param?.open && param?.mode=='editForm' ? localStorage.setItem('todosEdit', 'true')  : localStorage.removeItem('todosEdit');
    setShowTodoModal(param);
  }

  useEffect(() => {
    // const mock = setupMockHandlers({customData, stateData});    
    // const mockPersons = setupPersonMockHandlers({persons, statePersons});
    const mock = setupMockHandlers({todos, stateTodos, persons, statePersons});
    return () => {
      mock.restore();      
      // mockTodos.restore();
      // mockPersons.restore();
    };
  }, []);

/*********************** TODOS ************************* */
const getTodos = async () => {return getMockTodos();}
const getOneTodo = async (id:number | string) => {
  return getOneMockTodo(todos, id);
}
const addTodo = async (newTodo:any) => {
  const resdata = await addMockTodo(todos, newTodo);
  if (resdata) setTodos(resdata) 
}
const updateTodo = async (id:number | string, updatedTodo:any) => {
  const resdata = await updateMockTodo(todos, id, updatedTodo);
  if (resdata) setTodos(resdata)
}
const deleteTodo = async (id:number | string) => {
  const resdata = await deleteMockTodo(todos, id);
  if (resdata) setTodos(resdata)
}


/*********************** PERSONS ************************* */
const getPersons = async () => {return getMockPersons();}
const getOnePerson = async (id:number | string) => {
  return getOneMockPerson(persons, id);
}
const addPerson = async (newPerson:any) => {
  
  const resdata = await addMockPerson(persons, newPerson);
  if (resdata) setPersons(resdata)
}
const updatePerson = async (id:number | string, updatedPerson:any) => {
  const resdata = await updateMockPerson(persons, id, updatedPerson);
  if (resdata) setPersons(resdata)
}
const deletePerson = async (id:number | string) => {
  const resdata = await deleteMockPerson(persons, id);
  if (resdata) setPersons(resdata)
}

  /** ********************* NAVIGATE ************************* */
  const navigate = useNavigate();

  const navigateToTodoList = () => {
    navigate('/todos');
  };
  const navigateToPersonList = () => {
    navigate('/persons');
  };
  const navigateToList = () => {
    navigate('/');
  };
  const navigateToForm = (id:any=null) => {
    id ? navigate(`/edit/${id}`) : navigate('/add');
  };

  return (
    <DataContext.Provider value={{
      todos,
      persons,
      showTodoModal,
      updateStateShowTodoModal,
      showPersonModal,
      updateStateShowPersonModal,

      getTodos,
      getOneTodo,
      addTodo, 
      updateTodo, 
      deleteTodo,

      getPersons,
      getOnePerson,
      addPerson, 
      updatePerson, 
      deletePerson,

      navigateToList, 
      navigateToForm 
    }}>
      {children}
    </DataContext.Provider>
  );
};