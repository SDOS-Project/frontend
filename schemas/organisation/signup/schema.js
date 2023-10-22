import { OrganisationType } from '@/types/OrganisationType';
import * as yup from 'yup';
import { urlValidationSchema } from '../../url/schema';

export const organisationSignupValidationSchema = yup.object().shape({
  name: yup.string().required('Organisation Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password has to be longer than 6 characters'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  type: yup
    .string()
    .oneOf(Object.keys(OrganisationType), 'Type must be Academic or Corporate')
    .required('Role is required'),
  address: yup.string().required('Address is required'),
  ipPolicy: urlValidationSchema(true),
  imgUrl: urlValidationSchema(false),
});
