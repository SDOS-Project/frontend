import * as yup from 'yup';

export const editProjectValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  status: yup.string().required('Status is required'),
  description: yup.string().required('Description is required'),
  students: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Name is required'),
      email: yup
        .string()
        .email('Email must be valid')
        .required('Email is required'),
    })
  ),
});
