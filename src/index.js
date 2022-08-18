import { ThemeProvider } from '@mui/system';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { theme } from './theme/theme';
import './assets/styles/index.sass';
import { TodosProvider } from './context/TodosContext';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TodosProvider>
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </TodosProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
