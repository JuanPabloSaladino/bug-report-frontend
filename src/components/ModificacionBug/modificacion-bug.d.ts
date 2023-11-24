import { Dayjs } from 'dayjs'

export interface Props {
  openDialog: boolean
  selectedIdRow: string
  handleCloseDialog: () => void
  title: string
}

export interface IFormInitialValues {
  id: string
  closedAt: Dayjs | null
  createdAt: Dayjs | null
  description: string
  title: string
  fixed: boolean
}