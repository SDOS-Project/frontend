import { Providers } from '@/features/redux/provider';
import './globals.css';
import ToastProvider from './toast.provider';
import CustomThemeProvider from '@/theme/provider';
import { Outfit } from 'next/font/google';
import Layout from '@/components/common/Layout';
import ErrorBoundary from '@/components/error/ErrorBoundary';
import { StyledEngineProvider } from '@mui/material';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'EduCorp',
  description:
    'A platform where academic expertise meets industrial innovation.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={outfit.className}>
        <Providers>
          <StyledEngineProvider injectFirst>
            <CustomThemeProvider>
              <ToastProvider>
                <ErrorBoundary>
                  <Layout>{children}</Layout>
                </ErrorBoundary>
              </ToastProvider>
            </CustomThemeProvider>
          </StyledEngineProvider>
        </Providers>
      </body>
    </html>
  );
}
