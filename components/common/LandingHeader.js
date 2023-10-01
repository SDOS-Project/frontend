import { useRouter } from "next/navigation";

export const LandingHeader = () => {
  const router = useRouter();
  return (
    <div className='flex justify-between items-center w-full sticky top-0 left-0 p-4 bg-primary-main'>
      <p className='body-large text-white'>EduCorp.</p>
      <div className='flex justify-end gap-6'>
        <p
          className='cursor-pointer text-white'
          onClick={() => router.push("/signup/user")}
        >
          Signup
        </p>
        <p
          className='cursor-pointer text-white'
          onClick={() => router.push("/")}
        >
          Login
        </p>
      </div>
    </div>
  );
};