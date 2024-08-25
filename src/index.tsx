import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './styles/theme';
import { GlobalStyles } from './globalStyles';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
