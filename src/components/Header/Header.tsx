import { CreateBug } from '../CreateBug'

interface Props {
  onAddBug: (title: string) => void
}

export const Header: React.FC<Props> = ({ onAddBug }) => {
  return (
      <>
        <header>
          <CreateBug saveBug={ onAddBug }/>
        </header>
      </>
  )
}