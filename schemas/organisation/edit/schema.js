import { urlValidationSchema } from '@/schemas/url/schema';
import * as yup from 'yup';

export const editOrganisationValidationSchema = yup.object().shape({
  name: yup.string().required('Organisation Name is required'),
  address: yup.string().required('Address is required'),
  ipPolicy: urlValidationSchema(true),
});
