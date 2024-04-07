'use client';

import React, { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import ImagesSection from './imagesSection';
import { LoadingButtonTypeMap } from '@mui/lab/LoadingButton/LoadingButton';
import FormProvider from '../../components/hook-form';
import Scrollbar from '../../components/scrollbar/scrollbar';

type props = {
  title?: string
  description?: string
  children: ReactNode
  buttonLabel: string
  buttonProps?: Omit<LoadingButtonTypeMap, 'defaultComponent'>
  methods?: any
  onSubmit?: any
}

const AuthSection = ({ buttonLabel, description, children, buttonProps, onSubmit, methods, title }: props) => {
  let sharedStyle = {
    padding: '20px 10px',
    maxWidth: '350px',
    width: '100%',
    margin: 'auto',
  };
  const submitButton = <LoadingButton
    fullWidth
    sx={{ borderRadius: '30px', color: '#0F1349', py: '16px' }}
    variant='contained'
    color='primary'
    type={'submit'}
    {...buttonProps?.props}
  >
    {buttonLabel ?? 'Submit'}
  </LoadingButton>;
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <Scrollbar sx={{ height: 1 }}>
          <Box sx={sharedStyle}>
            {title && <Typography variant={'h5'} fontWeight={'bold'} gutterBottom={true}>
              {title}
            </Typography>}
            {description && <Typography color={'#8688A3'} variant={'body2'}>
              {description}
            </Typography>}
            <ImagesSection />
            {children}
          </Box>
        </Scrollbar>
        <Box sx={sharedStyle}>
          {submitButton}
        </Box>
      </Box>
    </FormProvider>
  );
};

export default AuthSection;
