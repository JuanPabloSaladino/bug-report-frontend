import { useEffect, useState } from 'react'
import { AltaModificacionBug } from '../AltaModificacionBug/AltaModificacionBug'
import { IFormInitialValues, Props } from './modificacion-bug'
import { IBug } from '../../types'
import { BugAPI } from '../../api/bug-api'
import { useSnackbar } from '../../context/SnackbarContext'
import { AlertSeverity } from '../../context/SnackbarContext.constants'
import { ErrorMessages, SuccessMessages } from '../../messages/messages'

export const ModificacionBug: React.FC<Props> = ({
                                                   handleCloseDialog,
                                                   openDialog,
                                                   selectedIdRow,
                                                 }) => {
  const [initialFormValues, setInitialFormValues] = useState<IFormInitialValues>({} as IFormInitialValues)
  const [openAltaMoldificacionDialog, setAltaMoldificacionDialog] = useState<boolean>(openDialog)

  const { showSnackbar } = useSnackbar()

  const handleUpdate = (bug: IBug) => {
    BugAPI
      .updateBug(bug.id, bug)
      .then(response => showSnackbar(SuccessMessages.UpdateBug, AlertSeverity.Success))
      .catch((error) => {
        showSnackbar(ErrorMessages.UpdateBug, AlertSeverity.Error)
      })
  }

  useEffect(() => {
    if (selectedIdRow) {
      BugAPI
        .getBugById(selectedIdRow)
        .then(bug => setInitialFormValues(bug))
        .catch(error => {
          setAltaMoldificacionDialog(false)
          showSnackbar(ErrorMessages.GetBugById, AlertSeverity.Error)
        })
    }
  }, [selectedIdRow])

  return (
      <AltaModificacionBug
          handleCloseDialog={ handleCloseDialog }
          handleSubmit={ handleUpdate }
          initialFormValues={ initialFormValues }
          openDialog={ openAltaMoldificacionDialog }
          title="Editar Bug"
          selectedIdRow={ selectedIdRow }
      />
  )
}
