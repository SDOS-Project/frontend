import * as yup from 'yup';

export const addUpdateValidationSchema = yup.object().shape({
  update: yup.string().required('Update is required'),
});
