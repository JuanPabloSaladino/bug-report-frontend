import * as React from 'react'
import { Button, ClickAwayListener, Grid } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid'
import { columns, tableStyles } from './Table.constants'
import { useState } from 'react'
import { TableButton } from '../TableButton/TableButton'
import { ModificacionBug } from '../ModificacionBug/ModificacionBug'
import { AltaBug } from '../AltaBug/AltaBug'
import { IBug } from '../../types'
import { BugAPI } from '../../api/bug-api'
import { useSnackbar } from '../../context/SnackbarContext'
import { AlertSeverity } from '../../context/SnackbarContext.constants'

export interface Props {
  rows: IBug[]
}

export const Table: React.FC<Props> = ({ rows }) => {
  const [bugs, setBugs] = useState(rows)
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedIdRow, setSelectedIdRow] = useState<string>('')

  const { showSnackbar } = useSnackbar()

  const handleSelectionModelChange = (selection: GridRowSelectionModel) => {
    if (selection && selection.length > 0) {
      const selectedId = selection[0].toString()
      setSelectedIdRow(selectedId)
    } else {
      setSelectedIdRow('')
    }
  }

  const handleDelete = (bugId: string) => {
    setLoading(true)
    BugAPI.deleteBug(bugId)
      .then((message: string) => {
        showSnackbar(message, AlertSeverity.Info)
        getBugs()
        setLoading(false)
      })
      .catch((error) => {
        showSnackbar(error, AlertSeverity.Error)
        setLoading(false)
      })
  }

  const getBugs = () => {
    setLoading(true)

    BugAPI
      .getBugs()
      .then((bugs: IBug[]) => {
          setBugs(bugs)
          setLoading(false)
      })
      .catch((error) => {
        showSnackbar(error, AlertSeverity.Error)
        setLoading(false)
      })
  }

  const handleCloseButton = () => {
    getBugs()
    setSelectedIdRow('')
  }

  return (
    <ClickAwayListener onClickAway={ () => setSelectedIdRow('')}>
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
                onClose={ () => handleCloseButton() }
            >
              <AddCircleIcon color="success"/>
            </TableButton>
          </Grid>
          <Grid item>
            <TableButton
                color="warning"
                disabled={ !selectedIdRow }
                onClose={ () => handleCloseButton() }
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
            rows={ bugs }
            columns={ columns }
            initialState={ {
              pagination: {
                paginationModel: { page: 0, pageSize: 5 }
              }
            } }
            pageSizeOptions={[5, 10, 25]}
            onRowSelectionModelChange={ handleSelectionModelChange }
            loading={ loading }
            localeText={ {
              footerRowSelected: () => ''
            } }
            sx={ tableStyles }
        />
      </div>
    </ClickAwayListener>
  )
}