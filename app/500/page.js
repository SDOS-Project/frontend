import Image500 from '@/public/assets/Image500.svg';
import ErrorComponent from '@/components/error/component';
function Custom500() {
  return (
    <>
      <ErrorComponent
        errorNum={500}
        subText={'Internal Error. Something went wrong...'}
        buttonText={'Go back'}
        imgSrc={Image500}
      />
    </>
  );
}

export default Custom500;
