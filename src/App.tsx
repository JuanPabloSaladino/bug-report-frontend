import { useState, useEffect } from 'react'
import { IBug, IIdFixed } from './types'
import { BugAPI } from './api/bug-api'

import * as React from 'react'

import { Table } from './components/Table/Table'
import dayjs from 'dayjs'

const App: React.FC = () => {
  const [bugs, setBugs] = useState<IBug[]>([])

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

  useEffect(()=>{
    BugAPI
        .getBugs()
        .then((bugs: IBug[]) => {
            setBugs(bugs)
        })
  }, [])

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
