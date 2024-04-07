import { useDropzone } from 'react-dropzone';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
//
import Iconify from '../iconify';
//
import { UploadProps } from './types';
import { Controller } from 'react-hook-form';
import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function UploadBox({
  placeholder,
  error,
  disabled,
  sx,
  name = '',
  ...other
}: UploadProps) {
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    disabled,
    ...other,
  });

  const hasError = !!error || isDragReject;

  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <>
          <Box
            {...getRootProps()}
            sx={{
              m: 0.5,
              width: 64,
              height: 64,
              flexShrink: 0,
              display: 'flex',
              borderRadius: 1,
              cursor: 'pointer',
              alignItems: 'center',
              color: 'text.disabled',
              justifyContent: 'center',
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.08),
              border: (theme) => `dashed 1px ${alpha(theme.palette.grey[500], 0.16)}`,
              ...(isDragActive && {
                opacity: 0.72,
              }),
              ...(disabled && {
                opacity: 0.48,
                pointerEvents: 'none',
              }),
              ...(hasError && {
                color: 'error.main',
                bgcolor: 'error.lighter',
                borderColor: 'error.light',
              }),
              '&:hover': {
                opacity: 0.72,
              },
              ...sx,
            }}
          >
            <input {...getInputProps()} />

            {placeholder || <Iconify icon="eva:cloud-upload-fill" width={28} />}
          </Box>
          {error ? (
            <Typography
              variant="body2"
              sx={{ color: 'error.main', marginTop: '0.5rem', marginInlineStart: '0.9rem' }}
            >
              {error?.message}
            </Typography>
          ) : null}
        </>
      )}
    />
  );
}
