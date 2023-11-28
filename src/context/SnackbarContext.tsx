import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { AlertSeverity } from './SnackbarContext.constants';

interface SnackbarContextProps {
  showSnackbar: (message: string, severity?: AlertColor) => void
}

const SnackbarContext = createContext<SnackbarContextProps>({} as SnackbarContextProps)

interface SnackbarProviderProps {
  children: ReactNode
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    message: '',
    severity: AlertSeverity.Success ,
  });

  const showSnackbar = (message: string, severity: any) => {
    setSnackbarState({
      open: true,
      message,
      severity,
    });
  };

  const hideSnackbar = () => {
    setSnackbarState({
      open: false,
      message: '',
      severity: AlertSeverity.Success,
    });
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    hideSnackbar();
  };
  
  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        open={snackbarState.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={ snackbarState.severity as any} sx={{ width: '100%' }}>
          {snackbarState.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

// Crear un hook para acceder al contexto
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
