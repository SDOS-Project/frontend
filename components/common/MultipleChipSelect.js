import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from '@mui/material';
import React, { useCallback } from 'react';
import { Controller } from 'react-hook-form';

export default function MultipleChipSelect({
  control,
  fieldName,
  options,
  setValue,
  errors,
  label,
}) {
  const handleChange = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;
      setValue(fieldName, typeof value === 'string' ? value.split(',') : value);
    },
    [fieldName, setValue]
  );

  return (
    <Controller
      name={fieldName}
      control={control}
      render={({ field: { _, value } }) => (
        <FormControl className="w-full mb-2 lg:mb-0" size="small">
          <InputLabel className={errors?.[fieldName] && 'text-error-main'}>
            {label}
          </InputLabel>
          <Select
            className="w-full"
            size="small"
            value={value}
            multiple
            onChange={handleChange}
            error={!!errors?.[fieldName]}
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => {
              return (
                <Box className="flex flex-wrap gap-0.5">
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              );
            }}>
            {options.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          {!!errors?.[fieldName] && (
            <FormHelperText className="text-error-main ml-4">
              {errors?.[fieldName] ? errors?.[fieldName]?.message : ''}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
}
