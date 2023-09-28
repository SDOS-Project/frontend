import * as yup from 'yup';

export const startProjectValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  partner: yup.string().required('Partner is required'),
});
