import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
export const TabSwitch = () => {
  const selectedTab =
    "body-xsmall p-3 border-2 border-primary-main bg-primary-main text-white rounded-md w-full text-center cursor-pointer duration-200 hover:bg-white hover:text-primary-main md:px-6";

  const notSelectedTab =
    "body-xsmall p-3 border-2 border-primary-main text-primary-main rounded-md w-full text-center cursor-pointer hover:bg-primary-main hover:text-white duration-200 md:px-6";

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='flex justify-between items-center w-full gap-1'>
      <div
        className={pathname === "/signup/user" ? selectedTab : notSelectedTab}
        onClick={() => router.push("/signup/user")}
      >
        Signup As A User
      </div>
      <div
        className={pathname !== "/signup/user" ? selectedTab : notSelectedTab}
        onClick={() => router.push("/signup/organisation")}
      >
        Signup As An Org
      </div>
    </div>
  );
};
