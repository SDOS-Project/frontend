import { Typography } from '@mui/material';

export default function FormFieldLabel({ title, subtitle }) {
  return (
    <>
      {title && (
        <Typography className={`font-semibold${!subtitle ? ' mb-2' : ''}`}>
          {title}
        </Typography>
      )}
      {subtitle && (
        <Typography className="font-light text-sm mb-2">{subtitle}</Typography>
      )}
    </>
  );
}
