import { useEffect, useState } from 'react';
import DataTable from './components/container/DataGrid/DataTable';
import Modal from './components/container/Modal/Modal';
import Sidebar from './components/container/Sidebar/Sidebar';
import styles from './styles/App.module.scss';
import { initFunction } from './utils';
import { Tasks } from './context/GlobalContext';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DataListPage from './pages/DataList';
import DataFormPage from './pages/DataForm';
import { DataProvider } from './context/DataContext';

function App() {
  // const [ tableData, setTableData ] = useState<Tasks[]>(initFunction())
  // useEffect(() => {
  //   setTableData(initFunction());
  // }, [tableData]);

  return (
    // <div className={styles.container}>
    //   <Modal />
    //   <Sidebar />
    //   <DataTable data={tableData} />
    // </div>
    <Router>
      <DataProvider>
        <nav style={{display:'flex', gap:'10px', color:'orangered', margin:'32px 20px'}}>
          <Link to="/">Data List</Link>
          <Link to="/add">Add New Item</Link>
        </nav>
        <Routes>
          <Route path="/" element={<DataListPage />} />
          <Route path="/add" element={<DataFormPage />} />
          <Route path="/edit/:id" element={<DataFormPage />} />
        </Routes>
      </DataProvider>
    </Router>
  )
}


export default App
