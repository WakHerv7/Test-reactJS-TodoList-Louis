import AutoComplete from '../../shared/CustomAutoComplete/AutoComplete';
import CustomDropdown from '../../shared/CustomAutoComplete/CustomDropdown/CustomDropdown';
import styles from './ModalForm.module.scss';
import { useContext, useState } from 'react';
// import GlobalContext, {Tasks} from '../../../context/GlobalContext';
import { Labels, Person, Priority, ToDo } from '../../../models';
import dayjs from 'dayjs';


export default function ModalForm() {
  // const {
  //   setShowModal,
  //   value,
  //   inputValue,
  //   setPerson,
  //   title,
  //   setTitle,
  //   description,
  //   setDescription,
  //   labels,
  //   priority,
  //   dueDate,
  //   savedTasks,
  //   setSavedTasks,
  //   dispatchTodoEvents,
  // } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showPersonModal, setShowPersonModal] = useState<boolean>(false);
  const [person, setPerson] = useState<Person[]>([]);
  const [value, setValue] = useState<Person | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const startDate = Date.now();
  const [dueDate, setDueDate] = useState<any>(dayjs(startDate));
  const [labels, setLabels] = useState<Labels[]>([]);
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const [ savedTasks, setSavedTasks ] = useState<ToDo[]>([]);

  // let person;

  const personList: Person[] = [
    {id: 1, name: 'John Doe', email: 'abc@123.com', phone: '123456789' },
    {id: 2, name: 'Jane Doe', email: 'abc@123.com', phone: '123456789' },
    {id: 3, name: 'John Smith', email: 'abc@123.com', phone: '123456789' },
  ]

  const handleClose = () => {
    setShowModal(false);
  }

  const handleSubission = (e: any) => {
    e.preventDefault();
    // person = personList.filter((person) => person?.name === value || person.name === inputValue);
    setPerson(person);
    
    const taskObject = {
      id: Date.now(),
      title,
      person: person[0],
      labels,
      priority,
      startDate: dayjs(Date.now()).valueOf(),
      dueDate: dueDate.valueOf(),
      description
    }

    // setSavedTasks([...savedTasks, taskObject]);

    // dispatchTodoEvents({ type: 'push', payload: taskObject });
    console.log(savedTasks);
    setShowModal(false);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>
          Add New Task
        </span>
        <button className='material-icons-outlined' onClick={handleClose}>close</button>
      </header>
      <form className={styles.form}>
        <div className={styles.input_container}>
          <input
            type="text"
            placeholder='Task Name'
            min={3}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.data_section}>
          <AutoComplete data={personList} />
          <div className={`${styles.input_container} ${styles.date_styles}`}>
            <input type="text" name="date" id="date" placeholder='Due Date' />
            <span className="material-icons-outlined">calendar_today</span>
          </div>
          <CustomDropdown type="priority" />
          <CustomDropdown type="labels" />
        </div>
        <div className={styles.input_container}>
          <textarea
            name="desc"
            id="desc"
            rows={5}
            className={styles.input_textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          >

          </textarea>
        </div>
        <div className={styles.button_container}>
          <button type="submit" className={styles.action_buttons} onClick={handleSubission}>Save</button>
        </div>
      </form>
    </div>
  )
}