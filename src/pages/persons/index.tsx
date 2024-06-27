
import PersonDataTable from './PersonDataTable';
import PersonModal from './modal/PersonModal';
import SidebarPerson from './SidebarPerson';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import Layout from '../../layout';

const PersonList = () => {
  const { persons } = useContext(DataContext);
    


  return (
    <Layout title='Person List'>
      <div className={`flex bg-slate-100 p-5 gap-5 w-full h-full`}>
        {/* styles.container */}
        <PersonModal />
        <SidebarPerson />
        <PersonDataTable data={persons} />
      </div>
    </Layout>
  );
};

export default PersonList;