import * as yup from 'yup';

export const startProjectValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  partnerHandle: yup.string().required('Partner is required'),
  startDate: yup
    .date()
    .required('Start date is required')
    .typeError('Start date must be a valid date')
    .when('endDate', (endDate, schema) =>
      endDate
        ? schema.required('Start date is required if end date is present')
        : schema
    ),
  endDate: yup
    .date()
    .required('End date is required')
    .min(yup.ref('startDate'), 'End date must be after start date')
    .typeError('End date must be a valid date'),
});
