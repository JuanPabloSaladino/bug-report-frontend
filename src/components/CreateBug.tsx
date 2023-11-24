import { useState } from 'react'

interface Props {
  saveBug: (title: string) => void
}

export const CreateBug: React.FC<Props> = ({ saveBug }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveBug(inputValue)
    setInputValue('')
  }

  return (
      <form onSubmit={ handleSubmit }>
        <input
            type="text"
            value={ inputValue }
            onChange={ (event) => {
              setInputValue(event.target.value)
            } }
            placeholder="Do you want to create a new bug?"
            autoFocus
        />
      </form>
  )
}