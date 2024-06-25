import { useContext } from 'react';
import ModalForm from '../ModalForm/ModalForm';
import styles from './Modal.module.scss';
import GlobalContext from '../../../context/GlobalContext';

export default function Modal() {
  const { showModal } = useContext(GlobalContext);

  return (
    <>
    {showModal && (
      <div className={styles.container}>
        <ModalForm />
      </div>
    )}
   </>
  )
}
