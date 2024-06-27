import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import styles from './DataTable.module.scss';
import { Person } from "../../models";
// import dayjs from "dayjs";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../utils";
import { MdDelete, MdEdit, MdOutlineSearch } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";


export default function DataTable({ data }: { data: Person[]}) {  
  const [filteredRows, setFilteredRows] = useState(data);
  const { showPersonModal, updateStateShowPersonModal } = useContext(DataContext);

  useEffect(() => {
    setFilteredRows([...data].reverse());
  }, [data])
  
  const openEditForm = (person:Person) => {
    updateStateShowPersonModal({...showPersonModal, open:true, person, mode:'editForm'});
  }
  const openDeleteForm = (person:Person) => {
    updateStateShowPersonModal({...showPersonModal, open:true, person, mode:'deleteForm'});
  }
  
  const handleSearch = (event:any) => {
    const searchQuery = event.target.value.toLowerCase();
    const filteredData = data.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(searchQuery)
      )
    );
    setFilteredRows(filteredData);
  };
  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: 'name',
      headerName: 'Nom',
      width: 300,
      renderCell: (params) => (
        <div className={`flex items-center gap-3`}>
          {params.row.name && <Avatar {...stringAvatar(params.row.name ?? '')} />}
          <span>{params.row.name}</span>
        </div>
      ),
    },
    {
      field: 'email',      
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'phone',      
      headerName: 'Telephone',
      width: 200,
    },
    {
      field: 'actions',
      headerName: '',
      width: 220,
      renderCell: (params) => (
        <div className={`flex h-full items-center gap-5`}>
          <div onClick={()=>openEditForm(params.row)} className="cursor-pointer opacity-[70%] hover:opacity-[100%]"><MdEdit size={24} color={"rgb(2 132 199)"}/></div>
          <div onClick={()=>openDeleteForm(params.row)} className="cursor-pointer opacity-[70%] hover:opacity-[100%]"><MdDelete size={24} color={"rgb(185 28 28)"}/></div>
        </div>
      ),
      // valueGetter: (value, data) => `Scheduled for ${dayjs(data.endDate).format('D MMM YYYY')}`,
    },
  ];

  return (
    <div className={`rounded-2xl shadow-lg h-full w-full bg-white p-5`}>
        {data.length !== 0 ? (
          <>
          <div className="relative flex mb-5">
            <input 
            type="text" 
            onChange={(e)=>handleSearch(e)} 
            placeholder="Search..." 
            className={`block w-full rounded-md border-0 py-1.5 pl-10 pr-20 text-gray-900 
            ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
            focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6`}
            />
            <MdOutlineSearch 
            className={"absolute left-[10px] top-[5px]"}
            size={24}
            color="gray"/>
          </div>
          <DataGrid
            sx={{height:'510px', width:'100%'}}
            rows={filteredRows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 30,
                },
              },
            }}
            // pageSizeOptions={[5]}
            // filterModel={filterModel}
            // onFilterModelChange={handleFilterModelChange}
            // disableRowSelectionOnClick
          />
          </>
        ) : (
          <div className={'flex justify-center items-center h-full w-full'}>
            <p>No person yet. Click on <span>Add Person</span> to add a person.</p>
          </div>
        )}
    </div>
  );
}
