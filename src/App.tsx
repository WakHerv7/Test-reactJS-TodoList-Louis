import { useEffect, useState } from 'react';
import DataTable from './Components/Container/DataGrid/DataTable';
import Modal from './Components/Container/Modal/Modal';
import Sidebar from './Components/Container/Sidebar/Sidebar';
import styles from './styles/App.module.scss';
import { initFunction } from './utils';
import { Tasks } from './context/GlobalContext';

function App() {
  const [ tableData, setTableData ] = useState<Tasks[]>(initFunction())
  
  useEffect(() => {
    setTableData(initFunction());
  }, [tableData]);

  return (
    <div className={styles.container}>
      <Modal />
      <Sidebar />
      <DataTable data={tableData} />
    </div>
  )
}

export default App
