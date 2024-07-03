

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import PersonList from './pages/persons';
import TodoList from './pages/todos';

function App() {

  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<TodoList />} />          
          <Route path="/todos" element={<TodoList />} />
          <Route path="/persons" element={<PersonList />} />
        </Routes>
      </DataProvider>
    </Router>
  )
}


export default App
