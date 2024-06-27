import { useContext, useState } from 'react';
import ModalForm from '../ModalForm/ModalForm';
import styles from './Modal.module.scss';
// import GlobalContext from '../../../context/GlobalContext';

export default function Modal() {
  // const { showModal } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState<boolean>(false);
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
