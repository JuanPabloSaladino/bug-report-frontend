import dayjs from 'dayjs'
import { IFormInitialValues } from './alta-modificacion-bug'

export const initialValues: IFormInitialValues = {
  id: '',
  title: '',
  fixed: false,
  description: '',
  closedAt: null,
  createdAt: dayjs()
}

export const style = {
  'backgroundColor': '#222',
  'color': '#EEEEEE'
}