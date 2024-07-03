import CButton from '../../components/shared/CButton/CButton';
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';
import { FaPlus } from 'react-icons/fa';
import { labelColors } from '../../utils';
import { MdLabelOutline } from 'react-icons/md';

export default function SidebarTodo() {
  
  const { showTodoModal, updateStateShowTodoModal } = useContext(DataContext);
  const openModal = () => {
    // console.log("openModal");
    updateStateShowTodoModal({...showTodoModal, open:true, mode:'addForm'});
  }
  return (
    <div>
      <div className={`rounded-2xl shadow-lg bg-white h-full w-[200px] py-[20px]`}>
        <CButton 
        title="Add Todo" 
        icon={<FaPlus size={18} color={'rgb(2 132 199)'}/>} 
        handleClick={openModal}
        />
        <div className='mx-5 mt-10'>
          <h4 className='font-bold text-lg'>Labels</h4>
          <ul>
            {Object.keys(labelColors).map((elmt, idx) => <li className='flex gap-3 my-2' key={idx}><MdLabelOutline size={24} color={labelColors[elmt]}/> {elmt}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
