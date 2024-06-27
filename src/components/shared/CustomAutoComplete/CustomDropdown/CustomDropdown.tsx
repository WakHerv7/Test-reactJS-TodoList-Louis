import { useContext, useId, useState } from 'react'
import { Priority, Labels } from '../../../../models';
import styles from './CustomDropdown.module.scss';
// import GlobalContext from '../../../../context/GlobalContext';

function CustomDropdown({type}: {type: string}) {  
  const [labels, setLabels] = useState<Labels[]>([]);
  const [priority, setPriority] = useState<Priority>(Priority.LOW);
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'priority') {;
      // setPriority(e.target.value)
    } else {
    }
  }

  return (
    <div className={styles.container}>
      <input
        list={id}
        value={type === 'priority' ? priority : labels}
        onChange={handleChange}
      />
      <datalist id={id}>
        {Object.values(type === 'priority' ? Priority : Labels).map((value, idx) => (
          // <option key={idx} value={value ?? '0'} />
          <></>
        ))}
      </datalist>
    </div>
  )
}

export default CustomDropdown
