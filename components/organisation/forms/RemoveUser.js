import { selectUser } from '@/features/auth/authSlice';
import { useDeleteUserMutation } from '@/features/organisation/apiSlice';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

export default function RemoveUser({
  isDialogOpen,
  handleCloseDialog,
  userHandle,
}) {
  const userState = useSelector(selectUser);
  const [deleteUser, { isLoading: isDeleteUserLoading }] =
    useDeleteUserMutation();

  const onDiscardClick = useCallback(() => {
    handleCloseDialog();
  }, [handleCloseDialog]);

  const onSubmit = useCallback(async () => {
    try {
      await deleteUser({ userHandle, orgHandle: userState.handle });
    } catch (error) {
      handleCloseDialog();
    }
  }, [deleteUser, userHandle, userState.handle, handleCloseDialog]);

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      PaperProps={{
        className: 'dialog-layout-md',
      }}>
      <DialogTitle className="font-heading text-error-dark text-xl flex items-center gap-1">
        Are you sure?
      </DialogTitle>
      <DialogContent className="flex gap-2">
        Removing this user will remove all the projects of this user on the
        platform.
      </DialogContent>
      <DialogActions className="flex flex-row gap-4 mr-4 mb-4">
        <Button
          autoFocus
          variant="text"
          className="text-black"
          onClick={() => onDiscardClick()}
          disabled={isDeleteUserLoading}>
          Discard
        </Button>
        <LoadingButton
          autoFocus
          variant="contained"
          className="bg-error-dark"
          type="action"
          loading={isDeleteUserLoading}
          onClick={() => onSubmit()}
          color="error">
          Remove
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
