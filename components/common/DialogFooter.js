import React from 'react';
import { Button, DialogActions } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';

function DialogFooter({
  onDiscardClick,
  isLoading,
  discardLabel = 'Discard',
  saveLabel = 'Save',
  showSaveIcon = true,
  isSaveDisabled = false,
  showSaveButton = true,
  onSaveClick,
}) {
  return (
    <DialogActions className="flex flex-row gap-4 mr-4 mb-4">
      <Button
        className={!showSaveButton && 'bg-primary-main'}
        autoFocus
        variant={!showSaveButton && 'contained'}
        onClick={onDiscardClick}
        disabled={isLoading}>
        {discardLabel}
      </Button>
      {showSaveButton && (
        <LoadingButton
          autoFocus
          variant="contained"
          className="bg-primary-main"
          type="action"
          loading={isLoading}
          disabled={isSaveDisabled}
          onClick={onSaveClick}
          loadingPosition="start"
          startIcon={showSaveIcon ? <SaveIcon /> : null}>
          {saveLabel}
        </LoadingButton>
      )}
    </DialogActions>
  );
}

export default DialogFooter;
