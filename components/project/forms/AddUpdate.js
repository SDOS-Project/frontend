import DialogFooter from '@/components/common/DialogFooter';
import { selectUser } from '@/features/auth/authSlice';
import { useAddUpdateMutation } from '@/features/project/apiSice';
import { addUpdateValidationSchema } from '@/schemas/project/update/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dialog, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

export default function AddUpdate({ isDialogOpen, handleCloseDialog, handle }) {
  const user = useSelector(selectUser);

  const defaultValues = useMemo(() => {
    return {
      userHandle: user?.handle,
      content: '',
    };
  }, [user?.handle]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(addUpdateValidationSchema),
  });

  const onDiscardClick = useCallback(() => {
    handleCloseDialog();
    reset(defaultValues);
  }, [defaultValues, reset, handleCloseDialog]);

  const [addUpdate, { isLoading }] = useAddUpdateMutation();

  const onSubmit = useCallback(
    async (data) => {
      console.log(data);
      try {
        await addUpdate({ handle, update: data }).unwrap();
        onDiscardClick();
      } catch (error) {
        reset(defaultValues);
      }
    },
    [addUpdate, handle, reset, defaultValues, onDiscardClick]
  );

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      PaperProps={{
        className: 'dialog-layout-md',
      }}>
      <DialogTitle className="font-heading text-primary-main text-xl">
        Add Update
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-y-5">
          <Controller
            name="content"
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
                error={!!errors.content}
                helperText={errors.content ? errors.content?.message : ''}
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
