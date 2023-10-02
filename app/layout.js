import { Providers } from '@/features/redux/provider';
import './globals.css';
import ToastProvider from './toast.provider';
import CustomThemeProvider from '@/theme/provider';
import { Outfit } from 'next/font/google';
import Layout from '@/components/common/Layout';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata = {
  title: 'SDOS',
  description: 'This is the SDOS project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={outfit.className}>
        <Providers>
          <CustomThemeProvider>
            <ToastProvider>
              <Layout>{children}</Layout>
            </ToastProvider>
          </CustomThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
