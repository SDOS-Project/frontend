import SignupProvider from './SignupProvider';

export default function Layout({ children }) {
  return (
    <>
      <SignupProvider>{children}</SignupProvider>
    </>
  );
}
