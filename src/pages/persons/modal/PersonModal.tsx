import { useContext, useState } from 'react';
import PersonModalForm from './PersonModalForm';
import PersonModalDeleteForm from './PersonModalDeleteForm';
import { DataContext } from '../../../context/DataContext';


export default function PersonModal() {
  const { showPersonModal } = useContext(DataContext);

  return (
    <>
    {showPersonModal.open && ( 
        <div className={'fixed top-0 left-0 w-full h-full bg-[#00000099] flex justify-center items-center z-[1000]'}>
          {showPersonModal.mode === 'deleteForm' ?
            <PersonModalDeleteForm />
            :
            <PersonModalForm />  
          }
        </div>
    )}
   </>
  )
}

