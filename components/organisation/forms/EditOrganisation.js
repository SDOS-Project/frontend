import DialogFooter from '@/components/common/DialogFooter';
import {
  useGetOrganisationQuery,
  useUpdateOrganisationMutation,
} from '@/features/organisation/apiSlice';
import { editOrganisationValidationSchema } from '@/schemas/organisation/edit/schema';
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
      address: organisation?.address,
      ipPolicy: organisation?.ipPolicy,
    };
  }, [organisation?.name, organisation?.address, organisation?.ipPolicy]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(editOrganisationValidationSchema),
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
        data.name === organisation?.name &&
        data.address === organisation?.address &&
        data.ipPolicy === organisation?.ipPolicy
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

    [
      updateOrganisation,
      reset,
      defaultValues,
      onDiscardClick,
      organisation?.name,
      organisation?.address,
      organisation?.ipPolicy,
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
