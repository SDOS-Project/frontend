import { areasOfInterests } from '@/types/AreasOfInterests';
import { engineeringFields } from '@/types/EngineeringFields';
import * as yup from 'yup';

export const editUserValidationSchema = yup.object().shape({
  firstName: yup.string().required('First Name is required'),
  lastName: yup.string().required('Last Name is required'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  discipline: yup
    .string()
    .oneOf(
      Object.keys(engineeringFields),
      'Discipline must be one of the options'
    )
    .required('Discipline is required'),
  areasOfInterest: yup
    .array()
    .of(yup.string())
    .min(1, 'Please select at least one area of interest')
    .required('Areas of Interest is required'),
});
