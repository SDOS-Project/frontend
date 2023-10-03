import Link from 'next/link';
import SignupProvider from './providers/SignupProvider';

export default function Layout({ children }) {
  return (
    <>
      <SignupProvider>
        <main className="width-layout-page-form padding-layout-1">
          {children}
          <Link href="/">
            <div className="link flex justify-center mt-5">
              Want to Login? Click Here.
            </div>
          </Link>
        </main>
      </SignupProvider>
    </>
  );
}
