import DialogFooter from '@/components/common/DialogFooter';
import MultipleAutocomplete from '@/components/common/MultipleAutocomplete';
import MultipleChipSelect from '@/components/common/MultipleChipSelect';
import {
  useGetUserQuery,
  useUpdateProfileMutation,
} from '@/features/user/apiSlice';
import { editUserValidationSchema } from '@/schemas/user/edit/schema';
import { areasOfInterests } from '@/types/AreasOfInterests';
import {
  disciplineDisplayMapping,
  disciplineEnumMapping,
  engineeringFields,
} from '@/types/EngineeringFields';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function EditProfile({
  isDialogOpen,
  handleCloseDialog,
  handle,
}) {
  const { data: user } = useGetUserQuery(handle);
  const defaultValues = useMemo(() => {
    return {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      discipline: disciplineDisplayMapping[user?.discipline],
      areasOfInterest: user?.areasOfInterest,
    };
  }, [
    user?.firstName,
    user?.lastName,
    user?.email,
    user?.areasOfInterest,
    user?.discipline,
  ]);

  const textFields = useMemo(
    () => [
      {
        name: 'firstName',
        label: 'First Name',
        type: 'text',
      },
      {
        name: 'lastName',
        label: 'Last Name',
        type: 'text',
      },
    ],
    []
  );

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(editUserValidationSchema),
  });

  const selectedDiscipline = watch('discipline');

  useEffect(() => {
    if (getValues('discipline') !== selectedDiscipline) {
      console.log('resetting areas of interest');
      setValue('areasOfInterest', []);
    }
  }, [selectedDiscipline, getValues, setValue]);

  const areasOfInterestOptions = useMemo(() => {
    return engineeringFields[selectedDiscipline] || [];
  }, [selectedDiscipline]);

  const onDiscardClick = useCallback(() => {
    handleCloseDialog();
    reset(defaultValues);
  }, [defaultValues, reset, handleCloseDialog]);

  const [updateProfile, { isLoading: isUpdateProfileLoading }] =
    useUpdateProfileMutation();

  const onSubmit = useCallback(
    async (data) => {
      if (
        data.firstName === user.firstName &&
        data.lastName === user.lastName &&
        data.email === user.email &&
        data.discipline === disciplineDisplayMapping[user?.discipline] &&
        data.areasOfInterest === user.areasOfInterest
      ) {
        onDiscardClick();
        return;
      }
      try {
        await updateProfile({
          user: {
            ...data,
            discipline: Object.keys(disciplineEnumMapping).includes(
              data.discipline
            )
              ? disciplineEnumMapping[data.discipline]
              : data.discipline,
          },
        }).unwrap();
        onDiscardClick();
      } catch (error) {
        reset(defaultValues);
      }
    },
    [
      updateProfile,
      reset,
      defaultValues,
      onDiscardClick,
      user.firstName,
      user.lastName,
      user.email,
      user.areasOfInterest,
      user.discipline,
    ]
  );

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues, isDialogOpen]);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      PaperProps={{
        className: 'dialog-layout-md',
      }}>
      <DialogTitle className="font-heading text-primary-main text-xl">
        Edit Profile
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-y-5">
          {textFields.map((textField) => (
            <Controller
              key={textField.name}
              name={textField.name}
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="w-full"
                  size="small"
                  label={textField.label}
                  type={textField.type}
                  variant="outlined"
                  error={!!errors[textField.name]}
                  helperText={
                    errors[textField.name]
                      ? errors[textField.name]?.message
                      : ''
                  }
                />
              )}
            />
          ))}
          <Controller
            name="discipline"
            control={control}
            render={({ field }) => (
              <FormControl className="w-full" size="small">
                <InputLabel className={errors?.discipline && 'text-error-main'}>
                  Discipline
                </InputLabel>
                <Select
                  {...field}
                  defaultValue={user?.discipline}
                  label="discipline"
                  error={!!errors.discipline}
                  className="w-full">
                  {Object.entries(engineeringFields).map(([key, _]) => (
                    <MenuItem key={key} value={key}>
                      {disciplineDisplayMapping[key] || key}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText className="text-error-main">
                  {errors?.discipline && errors?.discipline?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
          <MultipleAutocomplete
            control={control}
            fieldName="areasOfInterest"
            label="Areas of Interest"
            options={areasOfInterestOptions}
            errors={errors}
            setValue={setValue}
            freeSolo={true}
          />
        </DialogContent>
        <DialogFooter
          saveLabel="Save"
          onDiscardClick={onDiscardClick}
          isLoading={isUpdateProfileLoading}
        />
      </form>
    </Dialog>
  );
}
