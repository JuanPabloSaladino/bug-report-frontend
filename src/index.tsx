import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SnackbarProvider } from './context/SnackbarContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider>
      <App />
    </SnackbarProvider>
  </React.StrictMode>
);
