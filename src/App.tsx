import { useState } from 'react'
import { IBug, IIdFixed } from './types'

import * as React from 'react'

import { Table } from './components/Table/Table'
import dayjs from 'dayjs'
import { mockBugs } from './mock/mock.constants'

const App: React.FC = () => {
  const [bugs, setBugs] = useState(mockBugs)

  const handleRemove = (id: string): void => {
    // TODO: Luego hacer una llamada a metodo deleteBug
    const newBugs: IBug[] = bugs.filter(bug => bug.id !== id)
    setBugs(newBugs)
  }

  const handleFixed = ({ id, fixed }: IIdFixed): void => {
    // TODO: Luego hacer una llamada a metodo de API?
    const newBugs = bugs.map((bug: IBug) => {
      if (bug.id === id) {
        return {
          ...bug,
          fixed
        }
      }

      return bug
    })

    setBugs(newBugs)
  }

  // TODO: useEffect para traer los bugs desde API

  const handleAddBug = (title: string): void => {
    const newBug: IBug = {
      id: crypto.randomUUID(),
      closedAt: null,
      createdAt: dayjs(),
      description: '',
      title,
      fixed: false
    }

    const newBugs = [...bugs, newBug]
    setBugs(newBugs)
  }

  return (
      <>
        <h2>Bug Report</h2>
        {/* <Bugs
        bugs={ bugs }
        onRemoveBug={ handleRemove }
        onToggleFixed={ handleFixed }
      />
      <Header onAddBug={ handleAddBug }/> */ }
        <Table
            rows={ bugs }
        />
      </>
  )
}

export default App
