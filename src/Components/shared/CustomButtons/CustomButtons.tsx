import { useContext, useState } from 'react';
import styles from './CustomButtons.module.scss'
import GlobalContext from '../../../context/GlobalContext';

export default function CustomButtons({ title, icon }: { title: string, icon: string }) {
  const { setShowModal } = useContext(GlobalContext);

  const handleClick = () => {
    setShowModal(true);
  }

  
  return (
    <button className={`${styles.wrapper}`} onClick={handleClick}>
      {icon && <span className={`material-icons-outlined ${styles.icon}`}>{icon}</span>}
      <span className={styles.text}>
        {title}
      </span>
    </button>
  )
}
