import { Warning } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useCallback } from 'react';

export default function RemoveUser({
  isDialogOpen,
  handleCloseDialog,
  userHandle,
}) {
  const onDiscardClick = useCallback(() => {
    handleCloseDialog();
  }, [handleCloseDialog]);

  const onSubmit = useCallback(
    async (data) => {},

    []
  );

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
          disabled={false}>
          Discard
        </Button>
        <LoadingButton
          autoFocus
          variant="contained"
          className="bg-error-dark"
          type="action"
          loading={false}
          onClick={() => onSubmit()}
          color="error">
          Remove
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
