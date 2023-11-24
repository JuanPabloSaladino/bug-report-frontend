import BuildIcon from '@mui/icons-material/Build'
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined'
import Checkbox from '@mui/material/Checkbox'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { IIdFixed } from '../../types'

interface Props {
  id: string
  description: string
  fixed: boolean
  title: string
  onRemoveBug: (id: string) => void
  onToggleFixed: ({ id, fixed }: IIdFixed) => void
}

export const Bug: React.FC<Props> = ({ id, fixed, title, onRemoveBug, onToggleFixed }) => {
  return (
      <>
        <label>#{ id } - { title }</label>
        <Checkbox
            checked={ fixed }
            icon={ <BuildIcon color="success"/> }
            checkedIcon={ <BuildOutlinedIcon color="disabled"/> }
            onChange={ (event: React.ChangeEvent<HTMLInputElement>) => {
              onToggleFixed({ id, fixed: event.target.checked })
            } }
        />
        <IconButton
            aria-label="delete"
            onClick={ () => onRemoveBug(id) }
        >
          <DeleteIcon/>
        </IconButton>
      </>
  )
}