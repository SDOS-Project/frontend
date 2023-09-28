import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

function CustomAutocomplete({ control, fieldName, options, errors, loading }) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          loading={loading}
          value={options?.find((option) => option.handle === value) || null}
          className='w-full'
          onChange={(_, newValue) => {
            onChange(newValue?.handle);
          }}
          defaultValue={''}
          options={options ?? []}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              name='organisationId'
              label='Organisation'
              size='small'
              variant='outlined'
              autoComplete='given-name'
              error={!!errors[fieldName]}
              helperText={errors[fieldName] ? errors[fieldName]?.message : ''}
            />
          )}
        />
      )}
    />
  );
}
export default CustomAutocomplete;
