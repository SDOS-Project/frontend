'use client';
import Image from 'next/image';
import Image404 from '@/public/assets/Image404.svg';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

function ErrorComponent({ errorNum, subText, buttonText, imgSrc }) {
  const router = useRouter();
  return (
    <>
      <Image
        src={imgSrc ?? Image404}
        width={500}
        height={500}
        className="w-2/3 md:w-1/3"
      />
      <div className="flex flex-col gap-6 w-full p-6 md:w-1/3">
        <p className="body-3xlarge font-medium">
          Error <span className="text-primary-main">{errorNum}</span>
        </p>
        <p className="body-large">
          {subText ?? 'Oops, Couldn’t find the page you were looking for'}
        </p>
        <Button
          className="bg-primary-main text-white"
          onClick={() => {
            router.back();
          }}>
          {buttonText ?? 'Go Back'}
        </Button>
      </div>
    </>
  );
}

export default ErrorComponent;
