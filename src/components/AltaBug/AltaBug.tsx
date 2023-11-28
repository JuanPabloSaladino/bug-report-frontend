import { Props } from './alta-bug'
import { AltaModificacionBug } from '../AltaModificacionBug/AltaModificacionBug'
import { BugAPI } from '../../api/bug-api'
import { IBug } from '../../types'
import { useSnackbar } from '../../context/SnackbarContext'
import { AlertSeverity } from '../../context/SnackbarContext.constants'
import { SuccessMessages } from '../../messages/messages'

export const AltaBug: React.FC<Props> = ({
                                           handleCloseDialog,
                                           openDialog
                                         }) => {
  const { showSnackbar } = useSnackbar()

  const handleAdd = (bug: IBug) => {
    BugAPI
      .createBug(bug)
      .then(response => showSnackbar(SuccessMessages.CreateBug, AlertSeverity.Success))
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