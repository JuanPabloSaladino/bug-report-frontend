import { useEffect, useState } from 'react'
import { AltaModificacionBug } from '../AltaModificacionBug/AltaModificacionBug'
import { IFormInitialValues, Props } from './modificacion-bug'
import { IBug } from '../../types'
import { BugAPI } from '../../api/bug-api'
import { useSnackbar } from '../../context/SnackbarContext'
import { AlertSeverity } from '../../context/SnackbarContext.constants'

export const ModificacionBug: React.FC<Props> = ({
                                                   handleCloseDialog,
                                                   openDialog,
                                                   selectedIdRow,
                                                 }) => {
  const [initialFormValues, setInitialFormValues] = useState<IFormInitialValues>({} as IFormInitialValues)

  const { showSnackbar } = useSnackbar()

  const handleUpdate = (bug: IBug) => {
    BugAPI
      .updateBug(bug.id, bug)
      .then(response => showSnackbar('El bug se ha actualizado exitosamente', AlertSeverity.Success))
      .catch((error) => {
        showSnackbar(error, AlertSeverity.Error)
      })
  }

  useEffect(() => {
    if (selectedIdRow) {
      // TODO: Se le podria poner un loading

      BugAPI
        .getBugById(selectedIdRow)
        .then(bug => setInitialFormValues(bug))
    }
  }, [selectedIdRow])

  return (
      <AltaModificacionBug
          handleCloseDialog={ handleCloseDialog }
          handleSubmit={ handleUpdate }
          initialFormValues={ initialFormValues }
          openDialog={ openDialog }
          title="Editar Bug"
          selectedIdRow={ selectedIdRow }
      />
  )
}
