import { Dayjs } from 'dayjs'

export interface IBug {
  id: string
  closedAt: Dayjs | null
  createdAt: Dayjs | null
  description: string
  title: string
  fixed: boolean
}

export interface IIdFixed {
  id: string
  fixed: boolean
}
