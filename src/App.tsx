import { useState, useEffect } from 'react'
import { IBug } from './types'
import { BugAPI } from './api/bug-api'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

import * as React from 'react'

import { Table } from './components/Table/Table'
import { Typography } from '@mui/material'
import { useSnackbar } from './context/SnackbarContext'
import { AlertSeverity } from './context/SnackbarContext.constants'
import { ErrorMessages } from './messages/messages'

const App: React.FC = () => {
  const [bugs, setBugs] = useState<IBug[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const { showSnackbar } = useSnackbar()

  useEffect(()=>{
    BugAPI
        .getBugs()
        .then((bugs: IBug[]) => {
          setBugs(bugs)
        })
        .catch(error => {
          showSnackbar(ErrorMessages.GetBugs, AlertSeverity.Error)
          setBugs([])
        })
        .finally(() => setLoading(false))
  }, [])

  return (
      <>
        <Typography
          align='center'
          variant='h4'
          marginY={ 2 }
        >
          Bug Report
        </Typography>
        {
          loading
            ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  minHeight: '100vh'
                }}
              >
                <CircularProgress />
              </Box>
            )
            : (
            <Table rows={ bugs } />
            )
        }
      </>
  )
}

export default App
