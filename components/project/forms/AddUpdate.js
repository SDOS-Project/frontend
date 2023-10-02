import DialogFooter from '@/components/common/DialogFooter';
import { addUpdateValidationSchema } from '@/schemas/project/update/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function AddUpdate({ isDialogOpen, handleCloseDialog, handle }) {
  const defaultValues = useMemo(() => {
    return {
      update: '',
    };
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(addUpdateValidationSchema),
  });

  const onDiscardClick = () => {
    handleCloseDialog();
    reset(defaultValues);
  };

  const onSubmit = useCallback(async (data) => {
    console.log(data);
  }, []);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      className="max-w-sm md:max-w-full ml-auto mr-auto"
      PaperProps={{
        className: 'dialog-layout-md',
      }}>
      <DialogTitle className="font-heading text-primary-main text-xl">
        Add Update
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-y-5">
          <Controller
            name="update"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                multiline
                rows={5}
                label="Update"
                variant="outlined"
                className="w-full"
                error={!!errors.update}
                helperText={errors.update ? errors.update?.message : ''}
              />
            )}
          />
        </DialogContent>
        <DialogFooter
          showSaveIcon={false}
          saveLabel="Add Update"
          onDiscardClick={onDiscardClick}
        />
      </form>
    </Dialog>
  );
}
