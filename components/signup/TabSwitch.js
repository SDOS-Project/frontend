import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

export const TabSwitch = () => {
  const selectedTab = useMemo(
    () =>
      'body-xsmall p-2 border-2 border-primary-main bg-primary-main text-white rounded-md w-full text-center cursor-pointer duration-200 hover:bg-white hover:text-primary-main md:px-6',
    []
  );

  const notSelectedTab = useMemo(
    () =>
      'body-xsmall p-2 border-2 border-primary-main text-primary-main rounded-md w-full text-center cursor-pointer hover:bg-primary-main hover:text-white duration-200 md:px-6',
    []
  );

  const pathname = usePathname();

  return (
    <div className="flex items-center w-full gap-1 mt-5">
      <Link href={'/signup/user'} className="w-full">
        <div
          className={
            pathname === '/signup/user' ? selectedTab : notSelectedTab
          }>
          User
        </div>
      </Link>
      <Link href={'/signup/organisation'} className="w-full">
        <div
          className={
            pathname === '/signup/organisation' ? selectedTab : notSelectedTab
          }>
          Organisation
        </div>
      </Link>
      <Link href={'/signup/student'} className="w-full">
        <div
          className={
            pathname === '/signup/student' ? selectedTab : notSelectedTab
          }>
          Student
        </div>
      </Link>
    </div>
  );
};
