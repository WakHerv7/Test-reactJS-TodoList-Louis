import axios from "axios";

export const saveMockTodo = (data: any) => {
  localStorage.setItem("todos", JSON.stringify(data));
};

export const getMockTodos = async () => {
  try {
    const response = await axios.get("/api/todo");
    console.log("response.data getMockTodos : ", response.data);
    return response.data; 
  } catch (error: any) {
    return []; 
  }
};

export const getOneMockTodo = async (data: any, id:number | string) => {
    try {
      const index = data.findIndex((item:any) => item.id == id);      
      if (index!== -1) {
        return data[index];
      }
      return null;
    } catch (error: any) {
      return null;
    }
};

export const addMockTodo = async (data: any, newItem: any) => {
  try {
    // console.log("addMockTodo : ", newItem);
    const response = await axios.post("/api/todo", newItem);
    console.log("response.data addMockTodo : ", response.data);
    const updatedData = [...data, response.data];
    saveMockTodo(updatedData);
    return updatedData;
  } catch (error: any) {
    console.log("error addMockTodo : ", error);
    return null;
  }
};

export const updateMockTodo = async (data: any, id: any, updatedItem: any) => {
  try {
    const response = await axios.put(`/api/todo/${id}`, updatedItem);
    const updatedData = data.map((item: any) =>
      item.id == id ? response.data : item
    );
    saveMockTodo(updatedData);
    return updatedData;
  } catch (error: any) {
    return null;
  }
};

export const deleteMockTodo = async (data: any, id: any) => {
  try {
    await axios.delete(`/api/todo/${id}`);
    const updatedData = data.filter((item: any) => item.id != id);
    saveMockTodo(updatedData);
    return updatedData; 
  } catch (error: any) {
    return null;
  }
};
