import AutoComplete from '../../../components/shared/CustomAutoComplete/AutoComplete';
import CustomDropdown from '../../../components/shared/CustomAutoComplete/CustomDropdown/CustomDropdown';
// import styles from './ModalForm.module.scss';
import { useContext, useState } from 'react';
// import GlobalContext, {Tasks} from '../../../context/GlobalContext';
import { Labels, Person, Priority, ToDo } from '../../../models';
import dayjs from 'dayjs';
import { DataContext } from '../../../context/DataContext';
import { MdClose } from 'react-icons/md';
import { faker } from '@faker-js/faker';


export default function PersonModalDeleteForm() {
  const { showPersonModal, updateStateShowPersonModal, deletePerson } = useContext(DataContext);



  const handleClose = () => {
    updateStateShowPersonModal({...showPersonModal, open:false, mode:''});
  }

  const deletePersonData = (e: any) => {
    e.preventDefault();    
    deletePerson(showPersonModal.person.id);
    handleClose();
  }

  return (
    <div>
        
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[400px]">
        <div className="relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <MdClose 
            onClick={handleClose}
            size={20}
            className='absolute top-4 right-4 cursor-pointer'/>
            <form className="">
                <div className="flex flex-col items-center justify-center">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="text-base font-semibold font-bold text-gray-900" id="modal-title">Supprimer une personne</h3>
                    <div className="my-3">
                      <p className="text-md text-gray-500 text-center">
                        Etes-vous sure de vouloir supprimer 
                        <br/><strong className='text-md font-bold'>{showPersonModal.person.name}</strong>? 
                        <br/>Cette action est irreversible.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 mt-3 flex items-center justify-center gap-2">
                    <button 
                    type="button" 
                    onClick={handleClose}
                    className={`mt-3 inl0ine-flex w-full justify-center rounded-md bg-white px-3 py-2 
                    text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    hover:bg-gray-50 sm:mt-0 sm:w-auto`}>
                        Cancel
                    </button>
                    <button 
                    type="submit" 
                    onClick={deletePersonData}
                    className={`inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 
                    text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto`}>
                        Supprimer
                    </button>
                    
                </div>
            </form>
        </div>
        
    </div>
    </div>
  )
}