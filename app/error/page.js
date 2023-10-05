import Imageerror from '@/public/assets/Imageerror.svg';
import ErrorComponent from '@/components/error/component';
function CustomError() {
  return (
    <>
      <ErrorComponent
        errorNum={''}
        subText={'Something Went Wrong. Try Again Later...'}
        buttonText={'Go back'}
        imgSrc={Imageerror}
      />
    </>
  );
}

export default CustomError;
