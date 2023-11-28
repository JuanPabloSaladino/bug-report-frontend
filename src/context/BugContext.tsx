import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

import { BugAPI } from '../api/bug-api'
import { IBug } from '../types'

// TODO: Podria poner el loading en el contexto

interface BugContextProps {
    bugs: IBug[]
    createBug: (bug: IBug) => Promise<void>
    deleteBug: (bugId: string) => Promise<void>
    getBugs: () => Promise<void>
}
  
const BugContext = createContext<BugContextProps | undefined>(undefined)
  
interface BugProviderProps {
    children: ReactNode
}
  
export const BugProvider: React.FC<BugProviderProps> = ({ children }) => {
    const [bugs, setBugs] = useState<IBug[]>([])
  
    const updateBugs = async (): Promise<void> => {
      try {
        const updatedBugs = await BugAPI.getBugs()
        setBugs(updatedBugs)
      } catch (error) {
        console.error('Error updating bugs:', error)
      }
    }
  
    const createBug = async (bug: IBug): Promise<void> => {
        console.log('createBug')
      /* try {
        await BugAPI.createBug(bug)
        await updateBugs()
      } catch (error) {
        console.error('Error creating bug:', error)
      } */
    }

    const getBugs = async (): Promise<void> => {
        try {
          const fetchedBugs = await BugAPI.getBugs()
          setBugs(fetchedBugs)
        } catch (error) {
          console.error('Error fetching bugs:', error)
        }
      }
  
    const deleteBug = async (bugId: string): Promise<void> => {
      try {
        await BugAPI.deleteBug(bugId)
        await updateBugs()
      } catch (error) {
        console.error('Error deleting bug:', error)
      }
    }

    useEffect(() => {
        BugAPI
            .getBugs()
            .then(response => setBugs(response))
            .catch( error => console.error('Error obteniendo bug:', error))
    },[])
  
    return (
      <BugContext.Provider value={{ bugs, createBug, deleteBug, getBugs }}>
        {children}
      </BugContext.Provider>
    )
}
  
export const useBugContext = (): BugContextProps => {
    const context = useContext(BugContext)
    if (!context) {
        throw new Error('useBugContext must be used within a BugProvider')
    }
    return context
}