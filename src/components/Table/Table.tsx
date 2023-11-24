import { Button, ClickAwayListener, Grid } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { columns } from './Table.constants'
import { useState } from 'react'
import { TableButton } from '../TableButton/TableButton'
import * as React from 'react'
import { ModificacionBug } from '../ModificacionBug/ModificacionBug'
import { AltaBug } from '../AltaBug/AltaBug'
import { IBug } from '../../types'

export interface Props {
  rows: IBug[]
}

export const Table: React.FC<Props> = ({ rows }) => {
  const [selectedIdRow, setSelectedIdRow] = useState<string>('')

  const handleSelectionModelChange = (selection: GridRowSelectionModel) => {
    const selectedId = (selection[0] as number - 1).toString()
    setSelectedIdRow(selectedId)
  }

  const handleClickAway = () => {
    setSelectedIdRow('')
  }

  const handleDelete = (bugId: string) => {
    // TODO: Llamar endpoint con método HTTP DELETE
    console.log('handleDelete ', bugId)
  }

  return (
      <>
        <ClickAwayListener onClickAway={ handleClickAway }>
          <div>
            <Grid
                container
                marginBottom={ 1 }
                marginTop={ 5 }
                spacing={ 1 }
            >
              <Grid item>
                <TableButton
                    color="success"
                    modal={ AltaBug }
                    onClose={ () => setSelectedIdRow('') }
                >
                  <AddCircleIcon color="success"/>
                </TableButton>
              </Grid>
              <Grid item>
                <TableButton
                    color="warning"
                    disabled={ !selectedIdRow }
                    onClose={ () => setSelectedIdRow('') }
                    modal={ ModificacionBug }
                    selectedIdRow={ selectedIdRow }
                >
                  <EditIcon color={ !selectedIdRow ? 'disabled' : 'warning' }/>
                </TableButton>
              </Grid>
              <Grid item>
                <Button
                    color="error"
                    disabled={ !selectedIdRow }
                    size="small"
                    variant="outlined"
                    onClick={ () => handleDelete(selectedIdRow) }
                >
                  <DeleteIcon color={ !selectedIdRow ? 'disabled' : 'error' }/>
                </Button>
              </Grid>
            </Grid>

            <DataGrid
                autoHeight
                rows={ rows }
                columns={ columns }
                initialState={ {
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 }
                  }
                } }
                pageSizeOptions={[5, 10, 25]}
                onRowSelectionModelChange={ handleSelectionModelChange }
                localeText={ {
                  footerRowSelected: () => ''
                } }
                sx={ {
                  boxShadow: 2,
                  border: 2,
                  color: '#f9f9f9',
                  '& .MuiDataGrid-cell:hover': {
                    cursor: 'pointer'
                  }
                } }
            />
          </div>
        </ClickAwayListener>

        {/*       <FormDialog
          openDialog={ openDialog }
          handleCloseDialog={ () => setOpenDialog(false) }
          selectedIdRow={ selectedIdRow }
      /> */ }
      </>

  )
}