import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

function CustomAutocomplete({ control, fieldName, options, errors }) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Autocomplete
          value={options.find((option) => option.id === value) || null}
          className='w-full'
          onChange={(_, newValue) => {
            onChange(newValue?.id);
          }}
          defaultValue={''}
          options={options ?? []}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              label='Organisation'
              size='small'
              variant='outlined'
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
