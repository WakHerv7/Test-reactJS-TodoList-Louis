import axios from "axios";

export const saveMockItem = (data: any) => {
  localStorage.setItem("customData", JSON.stringify(data));
};

export const getMockItems = async () => {
  try {
    const response = await axios.get("/api/data");
    return response.data; 
  } catch (error: any) {
    return []; 
  }
};

export const getOneMockItem = async (data: any, id:number | string) => {
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

export const addMockItem = async (data: any, newItem: any) => {
  try {
    const response = await axios.post("/api/data", newItem);
    const updatedData = [...data, response.data];
    saveMockItem(updatedData);
    return updatedData;
  } catch (error: any) {
    return null;
  }
};

export const updateMockItem = async (data: any, id: any, updatedItem: any) => {
  try {
    const response = await axios.put(`/api/data/${id}`, updatedItem);
    const updatedData = data.map((item: any) =>
      item.id == id ? response.data : item
    );
    saveMockItem(updatedData);
    return updatedData;
  } catch (error: any) {
    return null;
  }
};

export const deleteMockItem = async (data: any, id: any) => {
  try {
    await axios.delete(`/api/data/${id}`);
    const updatedData = data.filter((item: any) => item.id != id);
    saveMockItem(updatedData);
    return updatedData; 
  } catch (error: any) {
    return null;
  }
};
