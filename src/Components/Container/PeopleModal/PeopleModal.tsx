import AutoComplete from '../../shared/CustomAutoComplete/AutoComplete';
import CustomDropdown from '../../shared/CustomAutoComplete/CustomDropdown/CustomDropdown';
import styles from './ModalForm.module.scss';
import { useContext } from 'react';
import GlobalContext from '../../../context/GlobalContext';
import { Person } from '../../../utils';

export default function ModalForm() {
  const { setPersonModal } = useContext(GlobalContext);

  const handleClose = () => {
    setPersonModal(false);
  }
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('save')
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span>
          Add New Person
        </span>
        <button className='material-icons-outlined' onClick={handleClose}>close</button>
      </header>
      <form className={styles.form}>
        <div className={styles.input_container}>
          <input type="text" placeholder='Task Name' min={3} />
        </div>
        <div className={styles.data_section}>
          <AutoComplete data={person} />
          <div className={`${styles.input_container} ${styles.date_styles}`}>
            <input type="text" name="date" id="date" placeholder='Due Date' />
            <span className="material-icons-outlined">calendar_today</span>
          </div>
          <CustomDropdown type="priority" />
          <CustomDropdown type="labels" />
        </div>
        <div className={styles.input_container}>
          <textarea name="desc" id="desc" rows={5} className={styles.input_textarea}></textarea>
        </div>
        <div className={styles.button_container}>
          <button type="submit" className={styles.action_buttons}>Save</button>
        </div>
      </form>
    </div>
  )
}