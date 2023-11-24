import { useEffect, useState } from 'react'
import { AltaModificacionBug } from '../AltaModificacionBug/AltaModificacionBug'
import { IFormInitialValues, Props } from './modificacion-bug'
import { mockBugs } from '../../mock/mock.constants'
import { IBug } from '../../types'

export const ModificacionBug: React.FC<Props> = ({
                                                   handleCloseDialog,
                                                   openDialog,
                                                   selectedIdRow,
                                                 }) => {
  const [initialFormValues, setInitialFormValues] = useState<IFormInitialValues>({} as IFormInitialValues)

  const handleUpdate = () => {
    /*
    * TODO:
    *  - Llamada a API (Método HTTP PUT) para hacer un UPDATE del Bug pasándole:
  *     - ID
  *     - Bug
    * */
  }

  const getBugById = (bugId: string): IBug | undefined => {
    return mockBugs.find(bug => bug.id == bugId)
  }

  useEffect(() => {
    if (selectedIdRow) {

      /*
      * TODO:
      *  - El ID del bug no es el selectedIdRow. Solucionar.
      *  - Si está el selectedIdRow (ID del bug), pegarle a la API
      *  (método HTTP GET) para traerme el Bug correspondiente
      *  - Luego, popular el formulario con esa información
      * */

      const bug: IBug | undefined = getBugById(selectedIdRow)

      if (bug) {
        setInitialFormValues(bug)
      }
    }
  }, [selectedIdRow])

  return (
      <AltaModificacionBug
          handleCloseDialog={ handleCloseDialog }
          handleSubmit={ handleUpdate }
          initialFormValues={ initialFormValues }
          openDialog={ openDialog }
          title="Editar Bug"
      />
  )
}
