import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {faker} from '@faker-js/faker';
// import { setupMockHandlers } from '../mockHandler/dataMockHandler';
import { setupMockHandlers } from '../mockHandler/todoMockHandler';
// import { setupPersonMockHandlers } from '../mockHandler/personMockHandler';
import { getMockItems, getOneMockItem, addMockItem, updateMockItem, deleteMockItem, saveMockItem } from '../api/item'; 
import { getMockTodos, getOneMockTodo, addMockTodo, updateMockTodo, deleteMockTodo, saveMockTodo } from '../api/todo'; 
import { getMockPersons, getOneMockPerson, addMockPerson, updateMockPerson, deleteMockPerson, saveMockPerson } from '../api/person'; 
import { useNavigate } from 'react-router-dom';
import { Labels, Person, Priority, Todo } from '../models';
import dayjs from 'dayjs';


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
  data: any[];
  todos: Todo[];
  persons: Person[];

  showTodoModal: todoModalProps;
  updateStateShowTodoModal: (showTodoModal:todoModalProps) => void;
  showPersonModal: personModalProps;
  updateStateShowPersonModal: (showPersonModal:personModalProps) => void;

  getItems: () => Promise<any[]>;
  getOneItem: (id: number | string) => Promise<any>;
  addItem: (newItem: any) => Promise<void>;
  updateItem: (id: number | string, updatedItem: any) => Promise<void>;
  deleteItem: (id: number | string) => Promise<void>;

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
  data: [],
  todos: [],
  persons: [],

  showTodoModal: {mode:'', todo:{}, open:false},
  updateStateShowTodoModal: (param?:todoModalProps) => null,
  showPersonModal: {mode:'', person:{}, open:false},
  updateStateShowPersonModal: (param?: personModalProps) => null,

  getItems: async () => [],
  getOneItem: async (id: number | string) => {},
  addItem: async (newItem: any) => {},
  updateItem: async (id: number | string, updatedItem: any) => {},
  deleteItem: async (id: number | string) => {},

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

  // localStorage.clear();
  // Items ----------------------------------
  const mockData = Array.from({ length: 5 }, () => ({
    id: faker.number.int(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
  }));
  // localStorage.removeItem("customData");
  const storedData = localStorage.getItem('customData');
  const stateData = storedData? JSON.parse(storedData) : mockData;
  saveMockItem(stateData);


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
  const [customData, setCustomData] = useState<any>(stateData);
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

  /*********************** ITEMS ************************* */
  const getItems = async () => {return getMockItems();}
  const getOneItem = async (id:number | string) => {
    return getOneMockItem(customData, id);
  }
  const addItem = async (newItem:any) => {
    console.log("addItem");
    const resdata = await addMockItem(customData, newItem);
    if (resdata) setCustomData(resdata)
  }
  const updateItem = async (id:number | string, updatedItem:any) => {
    console.log("updateItem");
    const resdata = await updateMockItem(customData, id, updatedItem);
    if (resdata) setCustomData(resdata)
  }
  const deleteItem = async (id:number | string) => {
    const resdata = await deleteMockItem(customData, id);
    if (resdata) setCustomData(resdata)
  }


/*********************** TODOS ************************* */
const getTodos = async () => {return getMockTodos();}
const getOneTodo = async (id:number | string) => {
  return getOneMockTodo(todos, id);
}
const addTodo = async (newTodo:any) => {
  console.log("addTodo");
  try {
    const resdata = await addMockTodo(todos, newTodo);
    console.log("Todo added : ", resdata);
    if (resdata) setTodos(resdata)
  } catch (error) {
    console.log("addTodo ERROR : ", error);
  }
  // const resdata = await addMockTodo(todos, newTodo);
  
 
}
const updateTodo = async (id:number | string, updatedTodo:any) => {
  console.log("updateTodo");
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
  // console.log("addPerson", resdata);
  if (resdata) setPersons(resdata)
}
const updatePerson = async (id:number | string, updatedPerson:any) => {
  console.log("updatePerson");
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
    console.log("navigateToForm",id);
    id ? navigate(`/edit/${id}`) : navigate('/add');
  };

  return (
    <DataContext.Provider value={{ 
      data: customData,
      todos,
      persons,
      showTodoModal,
      updateStateShowTodoModal,
      showPersonModal,
      updateStateShowPersonModal,

      getItems,
      getOneItem,
      addItem, 
      updateItem, 
      deleteItem,

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