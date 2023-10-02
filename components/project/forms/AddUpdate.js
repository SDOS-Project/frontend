import { Dialog, DialogTitle } from '@mui/material';

export default function AddUpdate({ isDialogOpen, handleCloseDialog, handle }) {
  // const onDiscardClick = () => {
  //     handleCloseDialog();
  //     reset(defaultValues);
  //   };
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
    </Dialog>
  );
}
