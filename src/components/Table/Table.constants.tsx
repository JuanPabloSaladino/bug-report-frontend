import { GridColDef } from '@mui/x-data-grid'
import BugReportIcon from '@mui/icons-material/BugReport'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import dayjs from 'dayjs'

export const columns: GridColDef[] = [
  {
    field: 'title',
    flex: 4,
    headerName: 'Título'
  },
  {
    field: 'description',
    flex: 5,
    headerName: 'Descripción'
  },
  {
    field: 'createdAt',
    flex: 3,
    headerName: 'Fecha creación',
    valueFormatter: (params) => {
      return dayjs(params.value).format('YYYY-MM-DD')
    }
  },
  {
    field: 'closedAt',
    flex: 3,
    headerName: 'Fecha cierre',
    valueFormatter: (params) => {
      return params.value ? dayjs(params.value).format('YYYY-MM-DD') : ''
    }
  },
  {
    field: 'fixed',
    flex: 1,
    headerName: 'Fixed',
    renderCell: (params) => {
      const isFixed = params.value
      return isFixed ? <CheckCircleIcon color="success"/> : <BugReportIcon color="error"/>
    }
  }
]

export const tableStyles = {
  boxShadow: 2,
  border: 2,
  color: '#f9f9f9',
  '& .MuiDataGrid-cell:hover': {
    cursor: 'pointer'
  },
  '& .MuiTablePagination-root': {
    color: '#f9f9f9'
  },
  '& .MuiButtonBase-root': {
    color: '#f9f9f9'
  },
  '& .MuiIconButton-root': {
    color: '#f9f9f9'
  },
  '& .MuiDataGrid-footerContainer .MuiSvgIcon-root': {
    color: '#f9f9f9'
  }
}