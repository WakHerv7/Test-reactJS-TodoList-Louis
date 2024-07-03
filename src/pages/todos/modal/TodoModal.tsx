import { useContext, useState } from 'react';
import TodoModalForm from './TodoModalForm';
import TodoModalDeleteForm from './TodoModalDeleteForm';
import { DataContext } from '../../../context/DataContext';


export default function TodoModal() {
  const { showTodoModal } = useContext(DataContext);

  return (
    <>
    {showTodoModal.open && ( 
        <div className={'fixed top-0 left-0 w-full h-full bg-[#00000099] flex justify-center items-center z-[1000]'}>
          {showTodoModal.mode === 'deleteForm' ?
            <TodoModalDeleteForm />
            :
            <TodoModalForm />  
          }
        </div>
    )}
   </>
  )
}

