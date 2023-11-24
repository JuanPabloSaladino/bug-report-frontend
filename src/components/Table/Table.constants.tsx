import { GridColDef } from '@mui/x-data-grid'
import BugReportIcon from '@mui/icons-material/BugReport'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const columns: GridColDef[] = [
  {
    field: 'title',
    flex: 4,
    headerName: 'Título',
  },
  {
    field: 'description',
    flex: 5,
    headerName: 'Descripción',
  },
  {
    field: 'createdAt',
    flex: 3,
    headerName: 'Fecha creación',
  },
  {
    field: 'closedAt',
    flex: 3,
    headerName: 'Fecha cierre',
  },
  {
    field: 'fixed',
    flex: 1,
    headerName: 'Fixed',
    description: 'This column has a value getter and is not sortable.',
    renderCell: (params) => {
      const isFixed = params.value
      return isFixed ? <CheckCircleIcon color="success"/> : <BugReportIcon color="error"/>
    },
  },
  /* {
    field: 'action',
    flex: 1,
    headerName: '',
    sortable: false,
    renderCell: (params) => {
      return (
        <IconButton
          aria-label="delete"
          onClick={ () => console.log(params.id)}
        >
          <EditIcon />
        </IconButton>
      )
    }
  } */
]