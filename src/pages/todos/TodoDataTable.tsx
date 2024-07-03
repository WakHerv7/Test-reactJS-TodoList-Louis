import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import styles from './DataTable.module.scss';
import { Todo } from "../../models";
// import dayjs from "dayjs";
import { Avatar } from "@mui/material";
import { formatDate, stringAvatar } from "../../utils";
import { MdCircle, MdDelete, MdEdit, MdLabel, MdLabelOutline, MdOutlineSearch } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { labelColors } from '../../utils';

const prioritiesList = {
  low: {color: 'green', elts:[1]},
  medium: {color: 'orange', elts:[1,2]},
  high: {color: 'red', elts:[1,2,3]}
}

export default function DataTable({ data }: { data: Todo[]}) {  
  const [filteredRows, setFilteredRows] = useState(data);
  const { showTodoModal, updateStateShowTodoModal } = useContext(DataContext);

  useEffect(() => {
    setFilteredRows([...data].reverse());
  }, [data])
  
  const openEditForm = (todo:Todo) => {
    updateStateShowTodoModal({...showTodoModal, open:true, todo, mode:'editForm'});
  }
  const openDeleteForm = (todo:Todo) => {
    updateStateShowTodoModal({...showTodoModal, open:true, todo, mode:'deleteForm'});
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
      field: 'title',
      headerName: 'Tache',
      width: 300,
      renderCell: (params) => (
        <div className={`flex items-center gap-3 h-full`}>
          {params.row.person?.name && <Avatar {...stringAvatar(params.row.person?.name ?? '')} />}
          <div className="flex flex-col justify-center">
            <span className="text-xs text-gray-500">{params.row.person?.name}</span>
            <span className="text-md" style={{lineHeight:'20px'}}>{params.row.title}</span>
          </div>
          
        </div>
      ),
    },
    {
      field: 'priority',      
      headerName: 'Priorité',
      width: 100,
      renderCell: (params) => (
        <div className={`flex items-center gap-1 h-full`}>
          {prioritiesList[params.row?.priority]?.elts.map((elmt, idx) => <span key={idx}><MdCircle size={13} color={prioritiesList[params.row?.priority]?.color}/> </span>)}          
        </div>
      ),
    },
    {
      field: 'labels',      
      headerName: 'Labels',
      width: 200,
      renderCell: (params) => (
        <div className={`flex items-center gap-3 h-full`}>
          {params.row?.labels?.map((elmt, idx) => <span key={idx}><MdLabelOutline size={24} color={labelColors[elmt]}/> </span>)}          
        </div>
      ),
    },
    {
      field: 'schedule',      
      headerName: 'Periode',
      width: 300,
      renderCell: (params) => (
        <div className={`flex items-center`}>
          Scheduled for {formatDate(params.row.startDate)}          
        </div>
      ),
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
            <p>No todo yet. Click on <span>Add Todo</span> to add a todo.</p>
          </div>
        )}
    </div>
  );
}
