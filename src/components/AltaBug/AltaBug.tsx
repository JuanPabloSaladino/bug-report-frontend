import { Props } from './alta-bug'
import { AltaModificacionBug } from '../AltaModificacionBug/AltaModificacionBug'
import dayjs, { Dayjs } from 'dayjs'
import { BugAPI } from '../../api/bug-api'
import { IBug } from '../../types'
import { useSnackbar } from '../../context/SnackbarContext'
import { AlertSeverity } from '../../context/SnackbarContext.constants'

export const AltaBug: React.FC<Props> = ({
                                           handleCloseDialog,
                                           openDialog
                                         }) => {
  const { showSnackbar } = useSnackbar()

  const handleAdd = (bug: IBug) => {
    /* const creationDate: Dayjs = dayjs()

    const requestBug: IBug = {
      ...bug,
      createdAt: creationDate      
    } */

    BugAPI
      .createBug(bug)
      .then(response => showSnackbar('El bug se ha creado exitosamente', AlertSeverity.Success))
      .catch((error) => {
        showSnackbar(error, AlertSeverity.Error)
      })
  }

  return (
      <AltaModificacionBug
          handleCloseDialog={ handleCloseDialog }
          handleSubmit={ handleAdd }
          openDialog={ openDialog }
          title="Crear Bug"
      />
  )
}