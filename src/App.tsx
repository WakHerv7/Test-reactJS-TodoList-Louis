// import { useEffect, useState } from 'react';
// import DataTable from './components/container/DataGrid/DataTable';
// import Modal from './components/container/Modal/Modal';
// import Sidebar from './components/container/Sidebar/Sidebar';
// import styles from './styles/App.module.scss';
// import { initFunction } from './utils';
// import { Tasks } from './context/GlobalContext';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import DataListPage from './pages/DataList';
import DataFormPage from './pages/DataForm';
import { DataProvider } from './context/DataContext';
import TodoList from './pages/todos';
import PersonList from './pages/persons';

function App() {
  // const [ tableData, setTableData ] = useState<Tasks[]>(initFunction())
  // useEffect(() => {
  //   setTableData(initFunction());
  // }, [tableData]);

  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<TodoList />} />          
          <Route path="/todos" element={<TodoList />} />
          <Route path="/persons" element={<PersonList />} />
          <Route path="/data" element={<DataListPage />} />
          <Route path="/add" element={<DataFormPage />} />
          <Route path="/edit/:id" element={<DataFormPage />} />
        </Routes>
      </DataProvider>
    </Router>
  )
}


export default App
