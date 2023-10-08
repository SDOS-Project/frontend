import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/firebase-config';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { Avatar, Box, CircularProgress, Typography } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export default function ImageUpload({ userType, setValue }) {
  const [downloadURL, setDownloadURL] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [progressUpload, setProgressUpload] = useState(0);

  const handleUploadFile = (imageFile) => {
    if (imageFile) {
      if (imageFile.size > 1000000) {
        toast.error('File size must be less than 1MB');
        return;
      }
      setIsUploading(true);
      const name = imageFile.name;
      const storageRef = ref(storage, `images/${userType}/${name}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgressUpload(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        },
        (error) => {
          console.error(error.message);
          setIsUploading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setDownloadURL(url);
            setValue('logoUrl', url);
          });
          setIsUploading(false);
        }
      );
    } else {
      console.log('No file selected');
    }
  };

  return (
    <>
      {downloadURL && (
        <>
          <Avatar src={downloadURL} alt={downloadURL} className="w-40 h-40" />
        </>
      )}
      {isUploading && (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
          <CircularProgress variant="determinate" />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Typography
              variant="caption"
              component="div"
              color="text.secondary">
              {`${Math.round(progressUpload)}%`}
            </Typography>
          </Box>
        </Box>
      )}
      <Button
        component="label"
        variant="contained"
        disabled={isUploading}
        startIcon={<CloudUploadIcon />}>
        Upload Profile Picture
        <VisuallyHiddenInput
          type="file"
          accept=".jpeg, .jpg, .png, .svg"
          onChange={(event) => {
            handleUploadFile(event.target.files[0]);
          }}
        />
      </Button>
    </>
  );
}
