import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {faker} from '@faker-js/faker';
import { setupMockHandlers } from '../mockHandler/dataMockHandler';
import { getMockItems, getOneMockItem, addMockItem, updateMockItem, deleteMockItem, saveMockItem } from '../api/item'; 
import { useNavigate } from 'react-router-dom';

interface DataContextType {
  data: any[];
  getItems: () => Promise<any[]>;
  getOneItem: (id: number | string) => Promise<any>;
  addItem: (newItem: any) => Promise<void>;
  updateItem: (id: number | string, updatedItem: any) => Promise<void>;
  deleteItem: (id: number | string) => Promise<void>;
  navigateToList: () => void;
  navigateToForm: (id?: number | string) => void;
}

export const DataContext = createContext<DataContextType>({
  data: [],
  getItems: async () => [],
  getOneItem: async (id: number | string) => {},
  addItem: async (newItem: any) => {},
  updateItem: async (id: number | string, updatedItem: any) => {},
  deleteItem: async (id: number | string) => {},
  navigateToList: () => {},
  navigateToForm: () => {},
});

export const DataProvider = ({ children }:{children:any}) => {
  const mockData = Array.from({ length: 10 }, () => ({
    id: faker.number.int(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
  }));
  // localStorage.removeItem("customData");
  const storedData = localStorage.getItem('customData');
  const stateData = storedData? JSON.parse(storedData) : mockData;

  const [customData, setCustomData] = useState<any>(stateData);

  useEffect(() => {
    
    const mock = setupMockHandlers({customData, stateData});
    return () => {
      mock.restore();
    };
  }, []);

  /** ********************* ITEMS ************************* */
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


  /** ********************* NAVIGATE ************************* */
  const navigate = useNavigate();

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
      getItems,
      getOneItem,
      addItem, 
      updateItem, 
      deleteItem, 
      navigateToList, 
      navigateToForm 
    }}>
      {children}
    </DataContext.Provider>
  );
};