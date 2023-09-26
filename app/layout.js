import { Providers } from '@/features/redux/provider';
import './globals.css';

export const metadata = {
  title: 'SDOS',
  description: 'This is the SDOS project',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
