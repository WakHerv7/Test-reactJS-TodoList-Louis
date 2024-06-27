
import DataTable from '../components/container/DataGrid/DataTable';
import Modal from '../components/container/Modal/Modal';
import Sidebar from '../components/container/Sidebar/Sidebar';
import styles from '../styles/App.module.scss';
import { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import Layout from '../layout';

const TodoList = () => {
  const { data, deleteTodo, navigateToForm } = useContext(DataContext);
  // console.log("data  : ", data);
  
  const handleAddTodo = (e:any) => {
    e.preventDefault();
    navigateToForm();
  }
  const handleUpdateTodo = (e:any, id:any) => {
    e.preventDefault();
    navigateToForm(id);
  };
  const handleDeleteTodo = (e:any, id:any) => {
    e.preventDefault();
    deleteTodo(id)
  };

  return (
    <Layout title='TODO List'>
      {/* className={styles.container} */}
      <div className={`flex bg-slate-100 p-5 gap-3 w-full h-full`} >
        <Modal />
        <Sidebar />
        <DataTable data={data} />
      </div>
    </Layout>
  );
};

export default TodoList;