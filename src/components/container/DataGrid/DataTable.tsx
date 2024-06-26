import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import styles from './DataTable.module.scss';
import { Tasks } from "../../../context/GlobalContext";
import dayjs from "dayjs";


export default function DataTable({ data }: { data: Tasks[]}) {
  const columns: GridColDef<(typeof data)[number]>[] = [
    {
      field: 'title',
      headerName: 'Title',
      width: 600,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <span className={`material-icons-outlined ${styles.person_image}`}>group</span><span>{params.row.title}</span>
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
      valueGetter: (value, data) => `Scheduled for ${dayjs(data.dueDate).format('D MMM YYYY')}`,
    },
  ];

  return (
    <>
      <Box sx={{ height: '100%', width: '100%', backgroundColor: '#fff', borderRadius: '10px', padding: '10px 20px' }}>
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
            <p>No tasks assigned yet. Click on <span>Add Tasks</span> to assign new tasks.</p>
          </div>
        )}
      </Box>
    </>
  );
}
