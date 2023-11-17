import * as yup from 'yup';

export const startProjectValidationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  partnerHandle: yup.string().required('Partner is required'),
  startDate: yup
    .date()
    .nullable()
    .when('endDate', (endDate, schema) =>
      endDate
        ? schema.required('Start date is required if end date is present')
        : schema
    ),
  endDate: yup
    .date()
    .nullable()
    .min(yup.ref('startDate'), 'End date must be after start date'),
});
