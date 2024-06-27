import AutoComplete from '../../../components/shared/CustomAutoComplete/AutoComplete';
import CustomDropdown from '../../../components/shared/CustomAutoComplete/CustomDropdown/CustomDropdown';
// import styles from './ModalForm.module.scss';
import { useContext, useEffect, useState } from 'react';
// import GlobalContext, {Tasks} from '../../../context/GlobalContext';
import { Labels, Person, Priority, ToDo } from '../../../models';
import dayjs from 'dayjs';
import { DataContext } from '../../../context/DataContext';
import { MdClose } from 'react-icons/md';
import { faker } from '@faker-js/faker';


export default function PersonModalForm() {
  const { showPersonModal, updateStateShowPersonModal, addPerson, updatePerson, getOnePerson } = useContext(DataContext);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');


  const handleClose = () => {
    updateStateShowPersonModal({...showPersonModal, open:false, mode:''});
  }

  const submitPersonData = (e: any) => {
    e.preventDefault();
    if (showPersonModal.person?.id && showPersonModal.mode==='editForm') {
      const id = showPersonModal.person?.id;
      updatePerson(Number(id),{
        id: id,
        name: name,
        email: email,
        phone: phone,
      });
    } else {
      if (name && email && phone) {
        const newPerson = {
          id: faker.number.int(),
          name: name,
          email: email,
          phone: phone,
        };
        addPerson(newPerson);
      }
    }
    handleClose();
  }

  useEffect(() => {
    if (showPersonModal.person?.id && showPersonModal.mode =='editForm') {
      setName(showPersonModal.person?.name);
      setEmail(showPersonModal.person?.email);
      setPhone(showPersonModal.person?.phone);
    }
  }, [showPersonModal])

  return (
    <div className={``}>
        
    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-[400px]">
        <div className="relative bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <MdClose 
            onClick={handleClose}
            size={20}
            className='absolute top-4 right-4 cursor-pointer'/>
            <form className="">
                <h2 className="text-base font-semibold leading-7 text-gray-900">Ajouter une nouvelle personne</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">Veuillez remplir les informations ci-dessous.</p>

                <div className="mt-5 grid grid-cols-1 gap-3">
                    <div className="">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Nom complet</label>
                        <div className="mt-2">
                            <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Nom complet"
                            className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email</label>
                        <div className="mt-2">
                            <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="abc@email.xyz"
                            className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Telephone</label>
                        <div className="mt-2">
                            <input 
                            type="text" 
                            name="phone" 
                            id="phone" 
                            placeholder="+237 xxx xxx xxx"
                            className={`block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm 
                            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                            focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6`}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-4 mt-3 sm:flex sm:flex-row-reverse">
                    <button 
                    type="submit" 
                    onClick={submitPersonData}
                    className={`inline-flex w-full justify-center rounded-md bg-sky-600 px-3 py-2 
                    text-sm font-semibold text-white shadow-sm hover:bg-sky-500 sm:ml-3 sm:w-auto`}>
                        Enregistrer
                    </button>
                    <button 
                    type="button" 
                    onClick={handleClose}
                    className={`mt-3 inl0ine-flex w-full justify-center rounded-md bg-white px-3 py-2 
                    text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                    hover:bg-gray-50 sm:mt-0 sm:w-auto`}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
        
    </div>


      {/* <header className={`styles.header`}>
        <span>
          Add New Task
        </span>
        <button className='material-icons-outlined' onClick={handleClose}>close</button>
      </header>
      <form className={`styles.form`}>
        <div className={`styles.input_container`}>
          <input
            type="text"
            placeholder='Task Name'
            min={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={`styles.data_section`}>
          <AutoComplete data={personList} />
          <div className={`${`styles.input_container`} ${`styles.date_styles`}`}>
            <input type="text" name="date" id="date" placeholder='Due Date' />
            <span className="material-icons-outlined">calendar_today</span>
          </div>
          <CustomDropdown type="priority" />
          <CustomDropdown type="labels" />
        </div>
        <div className={`styles.input_container`}>
          <textarea
            name="desc"
            id="desc"
            rows={5}
            className={`styles.input_textarea`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >

          </textarea>
        </div>
        <div className={`styles.button_container`}>
          <button type="submit" className={`styles.action_buttons`} onClick={handleSubission}>Save</button>
        </div>
      </form> */}
    </div>
  )
}