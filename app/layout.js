import { Providers } from '@/features/redux/provider';
import './globals.css';
import ToastProvider from './toast.provider';

export const metadata = {
  title: 'SDOS',
  description: 'This is the SDOS project',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <Providers>
          <ToastProvider>{children}</ToastProvider>
        </Providers>
      </body>
    </html>
  );
}
