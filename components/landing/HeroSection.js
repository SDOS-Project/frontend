import { Button } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

function HeroSection() {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center lg:justify-between items-center gap-4 p-6 py-12">
      <Image
        loading="lazy"
        src={'/assets/images/landing/hero1.svg'}
        alt="No Projects Found"
        width={200}
        height={200}
        className="w-60 mx-auto hidden lg:block"
      />
      <div className="flex flex-col justify-center items-center gap-2 w-full md:w-2/3 lg:w-1/3">
        <h1 className="body-3xlarge font-semibold">
          Edu<span className="text-primary-main">Corp</span>
        </h1>
        <p className="text-center text-body">
          Discover a dynamic platform where academic brilliance meets industry
          expertise.
        </p>
        <Button
          variant="outlined"
          className="bg-primary-main text-white hover:text-primary-main w-full mt-2"
          onClick={() => router.push('/signup/user')}>
          Signup
        </Button>
      </div>
      <Image
        loading="lazy"
        src={'/assets/images/landing/hero2.svg'}
        alt="No Projects Found"
        width={200}
        height={200}
        className="w-60 mx-auto hidden lg:block"
      />
    </div>
  );
}

export default HeroSection;
