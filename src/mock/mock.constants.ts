import { IBug } from '../types'
import dayjs from 'dayjs'

export const mockBugs: IBug[] = [
  {
    id: '1',
    closedAt: dayjs(),
    createdAt: dayjs(),
    description: 'Error al generar trámite',
    title: 'Bug Generar Trámite',
    fixed: false
  },
  {
    id: '2',
    closedAt: null,
    createdAt: dayjs(),
    description: 'Error en formato de fecha',
    title: 'Bug Formato Fecha',
    fixed: true
  },
  {
    id: '3',
    closedAt: null,
    createdAt: dayjs(),
    description: 'Error en estilos de formulario',
    title: 'Bug Estilos',
    fixed: true
  }
]