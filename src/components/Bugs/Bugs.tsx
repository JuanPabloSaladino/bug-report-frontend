import { IBug, IIdFixed } from '../../types'
import { Bug } from '../Bug/Bug'

interface Props {
  bugs: IBug[]
  onRemoveBug: (id: string) => void
  onToggleFixed: ({ id, fixed }: IIdFixed) => void
}

export const Bugs: React.FC<Props> = ({ bugs, onRemoveBug, onToggleFixed }) => {
  return (
      <ul>
        {
          bugs.map((bug: IBug) => (
              <li
                  className={ `${ bug.fixed ? 'fixed' : '' }` }
                  key={ bug.id }
              >
                <Bug
                    key={ bug.id }
                    fixed={ bug.fixed }
                    description={ bug.description }
                    id={ bug.id }
                    title={ bug.title }
                    onRemoveBug={ onRemoveBug }
                    onToggleFixed={ onToggleFixed }
                />
              </li>
          ))
        }
      </ul>
  )
}
  