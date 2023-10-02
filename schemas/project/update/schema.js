import * as yup from 'yup';

export const addUpdateValidationSchema = yup.object().shape({
  userHandle: yup.string().required('User handle is required'),
  content: yup.string().required('Update is required'),
});
