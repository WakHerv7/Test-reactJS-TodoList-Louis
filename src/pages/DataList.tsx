
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';

const DataList = () => {
  const { data, deleteItem, navigateToForm } = useContext(DataContext);
  // console.log("data  : ", data);
  
  const handleAddItem = (e:any) => {
    e.preventDefault();
    navigateToForm();
  }
  const handleUpdateItem = (e:any, id:any) => {
    e.preventDefault();
    navigateToForm(id);
  };
  const handleDeleteItem = (e:any, id:any) => {
    e.preventDefault();
    deleteItem(id)
  };

  return (
    <div>
      <h2 style={{fontSize:'32px'}}>Data List</h2>
      <button onClick={(e)=>handleAddItem(e)}>Add New Item</button>
      <table style={{width:'100%'}}>
      <tbody>
        {data.map((item:any, idx:number) => (
          <tr key={idx}>
            <td >
            {item.name}
            </td>
            <td>
              {item.email}
            </td>
            <td>
              <a href='#' onClick={(e)=>handleUpdateItem(e, item.id)}>Editer</a>
            </td>
            <td>
            <a href='#' onClick={(e)=>handleDeleteItem(e, item.id)}>Supprimer</a>
            </td>
          </tr>
          
        ))}
      </tbody>
      </table>
      
    </div>
  );
};

export default DataList;