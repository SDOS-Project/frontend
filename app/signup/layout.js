import SignupProvider from './providers/SignupProvider';

export default function Layout({ children }) {
  return (
    <>
      <SignupProvider>{children}</SignupProvider>
    </>
  );
}
