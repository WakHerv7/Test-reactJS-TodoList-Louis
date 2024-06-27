import axios from "axios";

export const saveMockPerson = (data: any) => {
  localStorage.setItem("persons", JSON.stringify(data));
};

export const getMockPersons = async () => {
  try {
    const response = await axios.get("/api/person");
    return response.data; 
  } catch (error: any) {
    return []; 
  }
};

export const getOneMockPerson = async (data: any, id:number | string) => {
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

export const addMockPerson = async (data: any, newItem: any) => {
  try {    
    const response = await axios.post("/api/person", newItem);
    const updatedData = [...data, response.data];
    saveMockPerson(updatedData);    
    return updatedData;
  } catch (error: any) {
    return null;
  }
};

export const updateMockPerson = async (data: any, id: any, updatedItem: any) => {
  try {
    const response = await axios.put(`/api/person/${id}`, updatedItem);
    const updatedData = data.map((item: any) =>
      item.id == id ? response.data : item
    );
    saveMockPerson(updatedData);
    return updatedData;
  } catch (error: any) {
    return null;
  }
};

export const deleteMockPerson = async (data: any, id: any) => {
  try {
    const response = await axios.delete(`/api/person/${id}`);
    if(response.status == 200){
      const updatedData = data.filter((item: any) => item.id != id);
      saveMockPerson(updatedData);
      return updatedData; 
    }
    return null;
  } catch (error: any) {
    return null;
  }
};
