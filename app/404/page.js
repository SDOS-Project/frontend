import Image404 from '@/public/assets/Image404.svg';
import ErrorComponent from '@/components/error/component';
function Custom404() {
  return (
    <>
      <ErrorComponent
        errorNum={404}
        subText={'Oops, Couldn’t find the page you were looking for'}
        buttonText={'Go back'}
        imgSrc={Image404}
      />
    </>
  );
}

export default Custom404;
