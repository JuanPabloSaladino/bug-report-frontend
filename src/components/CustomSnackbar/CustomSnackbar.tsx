import { Alert, Snackbar } from "@mui/material"
import { useEffect, useState } from "react"
import { Props } from "./custom-snackbar"

export const CustomSnackbar: React.FC<Props> = ({ message, open, onClose, severity }) => {
    const [snackbarOpen, setSnackbarOpen] = useState(open)
    const [snackbarMessage, setSnackbarMessage] = useState(message)

    useEffect(() => {
        setSnackbarOpen(open)
        setSnackbarMessage(message)
    }, [open, message])

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setSnackbarOpen(false)
        onClose()
    }

    return (
        <Snackbar open={ snackbarOpen } autoHideDuration={ 6000 } onClose={ handleClose }>
            <Alert onClose={ handleClose } severity={ severity } sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
        </Snackbar>
    )
}