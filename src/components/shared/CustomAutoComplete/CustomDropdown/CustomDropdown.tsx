import { useContext, useId, useState } from 'react'
import { Priority, Labels } from '../../../../utils';
import styles from './CustomDropdown.module.scss';
import GlobalContext from '../../../../context/GlobalContext';

function CustomDropdown({type}: {type: string}) {
  const {
    labels,
    setLabels,
    priority,
    setPriority
  } = useContext(GlobalContext);
  const id = useId();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'priority') {;
      setPriority(e.target.value)
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
        {Object.values(type === 'priority' ? Priority : Labels).map((value) => (
          <option key={value} value={value} />
        ))}
      </datalist>
    </div>
  )
}

export default CustomDropdown
