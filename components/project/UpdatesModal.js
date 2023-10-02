import { Box, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';

function UpdatesModal({ open, handleClose }) {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    borderRadius: '6px',
    transform: 'translate(-50%, -50%)',
    width: '75%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  );
}

export default UpdatesModal;
