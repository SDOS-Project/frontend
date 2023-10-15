import DialogFooter from '@/components/common/DialogFooter';
import MultipleChipSelect from '@/components/common/MultipleChipSelect';
import { useUpdateProjectMutation } from '@/features/project/apiSice';
import { useGetUserQuery } from '@/features/user/apiSlice';
import { editUserValidationSchema } from '@/schemas/user/edit/schema';
import { areasOfInterests } from '@/types/AreasOfInterests';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
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
      areasOfInterest: user?.areasOfInterest,
    };
  }, [user.firstName, user.lastName, user.email, user.areasOfInterest]);

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
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(editUserValidationSchema),
  });

  const onDiscardClick = useCallback(() => {
    handleCloseDialog();
    reset(defaultValues);
  }, [defaultValues, reset, handleCloseDialog]);

  const [updateProject, { isLoading: isUpdateProjectLoading }] =
    useUpdateProjectMutation();

  const onSubmit = useCallback(
    async (data) => {
      if (
        data.firstName === user.firstName &&
        data.lastName === user.lastName &&
        data.email === user.email &&
        data.areasOfInterest === user.areasOfInterest
      ) {
        onDiscardClick();
        return;
      }
      try {
        await updateProject({ handle, project: data }).unwrap();
        onDiscardClick();
      } catch (error) {
        reset(defaultValues);
      }
    },
    [
      updateProject,
      handle,
      reset,
      defaultValues,
      onDiscardClick,
      user.firstName,
      user.lastName,
      user.email,
      user.areasOfInterest,
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
          <MultipleChipSelect
            control={control}
            fieldName="areasOfInterest"
            label="Areas of Interest"
            options={areasOfInterests}
            errors={errors}
            setValue={setValue}
          />
        </DialogContent>
        <DialogFooter
          saveLabel="Save"
          onDiscardClick={onDiscardClick}
          isLoading={isUpdateProjectLoading}
        />
      </form>
    </Dialog>
  );
}
