import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import styles from './DataTable.module.scss';
// import { Tasks } from "../../../context/GlobalContext";
import { ToDo } from "../../../models";
import dayjs from "dayjs";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../../utils";


export default function DataTable({ data }: { data: ToDo[]}) {
  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: 'title',
      headerName: 'Title',
      width: 600,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {params.row.title && <Avatar {...stringAvatar(params.row.title ?? '')} />}
          <span>{params.row.title}</span>
        </Box>
      ),
    },
    {
      field: 'labels',
      type: 'number',
      headerName: 'Labels',
      width: 140,
    },
    {
      field: 'dueDate',
      width: 220,
      headerName: 'Due Date',
      valueGetter: (value, data) => `Scheduled for ${dayjs(data.endDate).format('D MMM YYYY')}`,
    },
  ];

  return (
    <div className={`rounded-2xl shadow-lg h-full w-full bg-white p-5`}>
        {data.length !== 0 ? (
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 30,
                },
              },
            }}
            pageSizeOptions={[5]}
            // disableRowSelectionOnClick
          />
        ) : (
          <div className={styles.no_tasks}>
            <p>No user yet. Click on <span>Add Users</span> to assign new tasks.</p>
          </div>
        )}
    </div>
  );
}
