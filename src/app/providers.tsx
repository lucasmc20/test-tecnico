'use client';

import { SWRConfig } from 'swr';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { useTheme } from '@/contexts/ThemeContext';

function MuiProvider({ children }: { children: React.ReactNode }) {
  const { modoEscuro } = useTheme();

  const theme = createTheme({
    palette: {
      mode: modoEscuro ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 60000,
        revalidateOnFocus: false,
        dedupingInterval: 30000
      }}
    >
      <ThemeProvider>
        <MuiProvider>
          {children}
        </MuiProvider>
      </ThemeProvider>
    </SWRConfig>
  );
}