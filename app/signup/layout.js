import Link from 'next/link';
import SignupProvider from './providers/SignupProvider';

export default function Layout({ children }) {
  return (
    <>
      <SignupProvider>
        <main className="width-layout-page-form padding-layout-1">
          <div className="flex flex-col items-center justify-center">
            <div className="body-2xlarge font-semibold">
              Signup On Edu<span className="text-primary-main">Corp.</span>
            </div>
            <div className="text-primary-grey font-light body-small">
              Bridging Academia and Industry
            </div>
          </div>
          {children}
          <Link href="/">
            <div className="link flex justify-center mt-4">
              Want to Login? Click Here.
            </div>
          </Link>
        </main>
      </SignupProvider>
    </>
  );
}
