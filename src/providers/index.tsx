import { PropsWithChildren, Suspense } from 'react';
import { QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from "react-query/devtools";
import { ErrorFallback } from '@/components/elements/error-fallback';
import { SuspenseFallback } from '@/components/elements/suspense-fallback';
import { queryClient } from '@/lib/react-query';
import { appTheme } from '@/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { PhotoProvider } from 'react-photo-view';
import { BrowserRouter } from 'react-router-dom';

export const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Suspense fallback={<SuspenseFallback />}>
      <ThemeProvider theme={appTheme}>
        <SnackbarProvider
          autoHideDuration={5000}
          maxSnack={3}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <CssBaseline />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <HelmetProvider>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                <QueryClientProvider client={queryClient}>
                  {/* {import.meta.env.MODE === "development" && <ReactQueryDevtools />} */}
                  <PhotoProvider>
                    <BrowserRouter>{children}</BrowserRouter>
                  </PhotoProvider>
                </QueryClientProvider>
              </LocalizationProvider>
            </HelmetProvider>
          </ErrorBoundary>
        </SnackbarProvider>
      </ThemeProvider>
    </Suspense>
  );
};
