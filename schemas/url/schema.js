import * as yup from 'yup';

const urlValidationSchema = (required = true) =>
  yup.lazy((value) =>
    value === '' || value === null || value === undefined
      ? required
        ? yup.string().required('Please enter a valid URL!')
        : yup.string()
      : yup
          .string()
          .matches(
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|ftp:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            'Please enter a valid URL!'
          )
          .transform((currentValue) => {
            try {
              new URL(currentValue);
              return currentValue;
            } catch (_) {
              return `https://${currentValue}`;
            }
          })
          .url('Please enter a valid URL!')
  );
export { urlValidationSchema };
