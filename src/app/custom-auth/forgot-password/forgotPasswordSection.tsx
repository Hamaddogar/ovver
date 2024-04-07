'use client';
import React from 'react';
import AuthSection from '../../../sections/auth-sections/authSection';
import { RHFTextField } from '../../../components/hook-form';
import { Box, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  forgotPasswordData,
  forgotPasswordDefaultValues,
  ForgotPasswordFormNames,
  ForgotPasswordLabels,
  forgotPasswordSchema,
} from './constants';
import { useAuthContext } from '../../../auth/hooks';
import { setCookie } from '../../../auth/context/jwt/utils';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { PATH_AFTER_FORGOTPASSWORD } from 'src/config-global';

const ForgotPasswordSection = () => {
  const { forgotPassword } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(forgotPasswordSchema),
    defaultValues: forgotPasswordDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result: any = await forgotPassword?.(data.email);
      if (result) {
        const { success } = result;
        if (success) {
          setCookie('forgot_password_email', data.email, 7);
          enqueueSnackbar('Code has been sent successfully', { variant: 'success' });
          router.replace(PATH_AFTER_FORGOTPASSWORD);
        }
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  });
  return (
    <AuthSection
      title={forgotPasswordData.title}
      description={forgotPasswordData.description as string}
      buttonLabel={forgotPasswordData.buttonLabel as string}
      methods={methods}
      onSubmit={onSubmit}
      buttonProps={{
        props: {
          loading: isSubmitting,
        },
      }}
      children={<>
        <Box width='100%'>
          <Typography
            noWrap
            variant={'body1'}
            color={'#8688A3'}
            gutterBottom={true}
            sx={{ opacity: '0.6', fontSize: '14px', fontWeight: '900' }}
          >
            {ForgotPasswordLabels.Email}
          </Typography>
          <RHFTextField
            fullWidth
            variant='filled'
            name={ForgotPasswordFormNames.Email}
          />
        </Box>
      </>}
    />
  );
};

export default ForgotPasswordSection;
