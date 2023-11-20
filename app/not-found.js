import ErrorComponent from '@/components/error/component';
import ErrorLayout from '@/components/error/layout';

export default function NotFound() {
  return (
    <ErrorLayout>
      <ErrorComponent
        statusCode={404}
        subText={
          "The page you requested couldn't be found. Please check the URL or navigate back to our homepage to continue exploring."
        }
        buttonText={'Go back'}
        imgSrc={'/assets/images/errors/404.svg'}
      />
    </ErrorLayout>
  );
}
