import { Autocomplete, Box, Chip, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

export default function MultipleAutocomplete({
  control,
  fieldName,
  options,
  setValue,
  errors,
  label,
  freeSolo = false,
}) {
  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { value } }) => (
        <Autocomplete
          multiple
          className="w-full"
          size="small"
          freeSolo={freeSolo}
          options={options}
          value={value}
          onChange={(_, newValue) => {
            setValue(fieldName, newValue);
          }}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Box key={key} {...otherProps}>
                {option}
              </Box>
            );
          }}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const tagProps = getTagProps({ index });
              const { key, ...otherTagProps } = tagProps;
              return <Chip key={key} {...otherTagProps} label={option} />;
            })
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              error={!!errors?.[fieldName]}
              helperText={
                errors?.[fieldName] ? errors?.[fieldName]?.message : ''
              }
            />
          )}
        />
      )}
    />
  );
}
