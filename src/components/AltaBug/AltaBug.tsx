import { Props } from './alta-bug'
import { AltaModificacionBug } from '../AltaModificacionBug/AltaModificacionBug'
import dayjs, { Dayjs } from 'dayjs'

export const AltaBug: React.FC<Props> = ({
                                           handleCloseDialog,
                                           openDialog,
                                         }) => {

  const handleAdd = () => {
    const creationDate: Dayjs = dayjs()

    console.log('handleAdd ', creationDate)

    /*
    * TODO:
    *  - Llamada a API (Método HTTP POST) para hacer un CREATE del Bug pasándole:
  *     - ID (?)
  *     - Bug
  *     - La fecha del campo "createdAt" la podría poner en el back (?)
    * */
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