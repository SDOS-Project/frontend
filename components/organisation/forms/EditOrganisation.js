import DialogFooter from '@/components/common/DialogFooter';
import MultipleChipSelect from '@/components/common/MultipleChipSelect';
import { useGetOrganisationQuery } from '@/features/organisation/apiSlice';
import { editUserValidationSchema } from '@/schemas/user/edit/schema';
import { areasOfInterests } from '@/types/AreasOfInterests';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function EditOrganisation({
  isDialogOpen,
  handleCloseDialog,
  handle,
}) {
  const { data: organisation } = useGetOrganisationQuery(handle);
  const textFields = useMemo(
    () => [
      {
        name: 'name',
        label: 'Name',
        type: 'text',
      },
      {
        name: 'address',
        label: 'Address',
        type: 'text',
      },
      {
        name: 'ipPolicy',
        label: 'IP Policy URL',
        type: 'text',
      },
    ],
    []
  );

  const defaultValues = useMemo(() => {
    return {
      name: organisation?.name,
      logoUrl: organisation?.logoUrl,
      address: organisation?.address,
      ipPolicy: organisation?.ipPolicy,
    };
  }, [
    organisation?.name,
    organisation?.logoUrl,
    organisation?.address,
    organisation?.ipPolicy,
  ]);

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

  const [updateOrganisation, { isLoading: isUpdateOrganisationLoading }] =
    useUpdateOrganisationMutation();

  const onSubmit = useCallback(
    async (data) => {
      if (
        data.name === defaultValues.name &&
        data.logoUrl === defaultValues.logoUrl &&
        data.address === defaultValues.address &&
        data.ipPolicy === defaultValues.ipPolicy
      ) {
        onDiscardClick();
        return;
      }
      try {
        await updateOrganisation({ organisation: data }).unwrap();
        onDiscardClick();
      } catch (error) {
        reset(defaultValues);
      }
    },

    [updateOrganisation, reset, defaultValues, onDiscardClick]
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
        Edit Organisation
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
          isLoading={isUpdateOrganisationLoading}
        />
      </form>
    </Dialog>
  );
}
