import CButton from '../../components/shared/CButton/CButton';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { FaPlus } from 'react-icons/fa';


export default function SidebarPerson() {
  
  const { showPersonModal, updateStateShowPersonModal } = useContext(DataContext);
  const openModal = () => {
    updateStateShowPersonModal({...showPersonModal, open:true, mode:'addForm'});
  }
  return (
    <div>
      <div className={`rounded-2xl shadow-lg bg-white h-full w-[200px] py-[20px]`}>
        <CButton 
        title="Add Person" 
        icon={<FaPlus size={18} color={'rgb(2 132 199)'}/>} 
        handleClick={openModal}
        />
      </div>
    </div>
  )
}
