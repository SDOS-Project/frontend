import DialogFooter from '@/components/common/DialogFooter';
import {
  useAddUpdateMutation,
  useGetProjectQuery,
} from '@/features/project/apiSice';
import { editProjectValidationSchema } from '@/schemas/project/edit/schema';
import { ProjectStatus } from '@/types/ProjectStatus';
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
import { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function EditProfile({
  isDialogOpen,
  handleCloseDialog,
  handle,
}) {
  const { data: project } = useGetProjectQuery(handle);
  const defaultValues = useMemo(() => {
    return {
      name: project?.name,
      status: project?.status,
      description: project?.description,
    };
  }, [project.name, project.status, project.description]);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(editProjectValidationSchema),
  });

  const onDiscardClick = useCallback(() => {
    handleCloseDialog();
    reset(defaultValues);
  }, [defaultValues, reset, handleCloseDialog]);

  const [addUpdate, { isLoading: isAddUpdateLoading }] = useAddUpdateMutation();

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
        Edit Profile
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent className="flex flex-col gap-y-5">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                label="Name"
                variant="outlined"
                className="w-full"
                error={!!errors.name}
                helperText={errors.name ? errors.name?.message : ''}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl className="w-full mb-2 lg:mb-0" size="small">
                <InputLabel className={errors?.status && 'text-error-main'}>
                  Status
                </InputLabel>
                <Select
                  {...field}
                  label="status"
                  error={!!errors.status}
                  className="w-full">
                  {Object.keys(ProjectStatus)?.map((status) => {
                    return (
                      <MenuItem key={status} value={status}>
                        {ProjectStatus[status]}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText className="text-error-main">
                  {errors?.status && errors?.status?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                multiline
                rows={5}
                label="Description"
                variant="outlined"
                className="w-full"
                error={!!errors.description}
                helperText={
                  errors.description ? errors.description?.message : ''
                }
              />
            )}
          />
        </DialogContent>
        <DialogFooter
          showSaveIcon={false}
          saveLabel="Add Update"
          onDiscardClick={onDiscardClick}
          isLoading={isAddUpdateLoading}
        />
      </form>
    </Dialog>
  );
}
