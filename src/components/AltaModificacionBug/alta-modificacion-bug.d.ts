import { IBug } from '../../types'
import { Dayjs } from 'dayjs'

export interface IFormInitialValues {
  id: string
  closedAt: Dayjs | null
  createdAt: Dayjs | null
  description: string
  title: string
  fixed: boolean
}

export interface Props {
  title: string
  initialFormValues?: IFormInitialValues
  handleCloseDialog: () => void
  handleSubmit: (bug: IBug) => void
  openDialog: boolean
  setFieldValue?: (field: string, value) => void
  selectedIdRow?: string
}