import { UserRole } from '@/types/UserRole';
import * as yup from 'yup';

export const signupValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
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
  role: yup
    .string()
    .oneOf([UserRole.EMPLOYEE, UserRole.FACULTY])
    .required('Role is required'),
  organisation: yup.string().required('Organisation is required'),
  areasOfInterest: yup
    .array()
    .of(yup.string())
    .required('Areas of Interest is required'),
});
