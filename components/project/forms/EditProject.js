import DialogFooter from '@/components/common/DialogFooter';
import {
  useGetProjectQuery,
  useUpdateProjectMutation,
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
import { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AddStudents from './AddStudents';

export default function EditProject({
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
      students: project?.students || [],
    };
  }, [project.name, project.status, project.description, project.students]);

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

  const [updateProject, { isLoading: isUpdateProjectLoading }] =
    useUpdateProjectMutation();

  const areStudentsEqual = useCallback((students1, students2) => {
    if (students1.length !== students2.length) {
      return false;
    }

    for (let i = 0; i < students1.length; i++) {
      const student1 = students1[i];
      const student2 = students2[i];
      if (
        student1.name !== student2.name ||
        student1.email !== student2.email
      ) {
        return false;
      }
    }

    return true;
  }, []);

  const onSubmit = useCallback(
    async (data) => {
      if (
        data.name === project.name &&
        data.status === project.status &&
        data.description === project.description &&
        areStudentsEqual(data.students, project.students)
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
      project.name,
      project.status,
      project.description,
      project.students,
      areStudentsEqual,
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
          <AddStudents control={control} errors={errors} />
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
