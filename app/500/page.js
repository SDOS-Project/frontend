import ErrorComponent from '@/components/error/component';

export default function Custom500() {
  return (
    <>
      <ErrorComponent
        errorNum={500}
        subText={'Internal Error. Something went wrong...'}
        buttonText={'Go back'}
        imgSrc={'/assets/500.svg'}
      />
    </>
  );
}
