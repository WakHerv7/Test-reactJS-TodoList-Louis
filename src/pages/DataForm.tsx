
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import {faker} from '@faker-js/faker';
import { useParams } from 'react-router-dom';

const DataForm = () => {
  const { id } = useParams();
  const { addItem, updateItem,getOneItem,navigateToList } = useContext(DataContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const currentItem = await getOneItem(Number(id));
        // console.log("currentItem : ", currentItem);
        
        if (currentItem) {
          setName(currentItem.name);
          setEmail(currentItem.email);
        }
      };
      fetchData();
    }
  }, [])
  


  const handleSubmit = (e:any) => {
    e.preventDefault();
    if(id) {
      updateItem(Number(id),{
        id: id,
        name: name,
        email: email,
      });
    } else {
      const newItem = {
        id: faker.number.int(),
        name: name,
        email: email,
      };
      addItem(newItem);
    }
    navigateToList();
  };

  return (
    <div>
      <h2 style={{fontSize:'32px'}}>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={(e)=>setName(e.target.value)} value={name}/>
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
        </label>
        {id ?
        <button type="submit">Update</button>
        :
        <button type="submit">Add</button>}
      </form>
    </div>
  );
}; 

export default DataForm;