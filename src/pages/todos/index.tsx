
import TodoDataTable from './TodoDataTable';
import TodoModal from './modal/TodoModal';
import SidebarTodo from './SidebarTodo';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import Layout from '../../layout';

const TodoList = () => {
  const { todos } = useContext(DataContext);
    


  return (
    <Layout title='Todo List'>
      <div className={`flex bg-slate-100 p-5 gap-5 w-full h-full`}>
        {/* styles.container */}
        <TodoModal />
        <SidebarTodo />
        <TodoDataTable data={todos} />
      </div>
    </Layout>
  );
};

export default TodoList;