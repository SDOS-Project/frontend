import Header from '@/components/layout/header';

export default function UserLayout({ children }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
