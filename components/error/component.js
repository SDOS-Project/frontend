'use client';
import Image from 'next/image';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { StatusCodesErrorMessagesMap } from '@/types/StatusCodesErrorMessagesMap';

function ErrorComponent({ statusCode, subText, buttonText, imgSrc }) {
  const router = useRouter();
  return (
    <>
      <Image
        alt="Error Image"
        src={imgSrc ?? '/assets/404.svg'}
        width={500}
        height={500}
        className="w-11/12 md:w-1/2"
      />
      <div className="flex flex-col gap-5 w-full md:w-1/3">
        <p className="title font-medium m-0">
          {statusCode && StatusCodesErrorMessagesMap[statusCode]}
        </p>
        <p className="body-large font-light">{subText}</p>
        <Button
          variant="contained"
          className="bg-primary-main"
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
