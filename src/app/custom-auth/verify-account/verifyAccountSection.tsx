'use client';
import React from 'react';
import AuthSection from '../../../sections/auth-sections/authSection';
import { RHFCode } from '../../../components/hook-form';
import { Box, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  verifyAccountData,
  verifyAccountDefaultValues,
  VerifyAccountFormNames,
  verifyAccountSchema,
} from './constants';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { getCookie } from '../../../auth/context/jwt/utils';
import { useAuthContext } from '../../../auth/hooks';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/navigation';
import { PATH_AFTER_LOGIN } from 'src/config-global';

const VerifyAccountSection = () => {
  const { verifyOtp, sendOtp } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(verifyAccountSchema),
    defaultValues: verifyAccountDefaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  let userEmail = getCookie('forgot_password_email') ?? '';

  const onSubmit = handleSubmit(async (data) => {
    try {
      const result: any = await verifyOtp?.(userEmail, Number(data.code));
      if (result) {
        const { success } = result;
        if (success) {
          // clearCookie('forgot_password_email');
          enqueueSnackbar('Verified successfully', { variant: 'success' });
          router.replace(PATH_AFTER_LOGIN);
        }
      }
    } catch (error) {
      // Todo need to set error under totp field if the otp value is wrong
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  });

  const onResendOtpClicked = async () => {
    try {
      const result: any = await sendOtp?.(userEmail);
      if (result) {
        const { success } = result;
        if (success) {
          enqueueSnackbar('Code has been sent successfully', { variant: 'success' });
        }
      }
    } catch (error) {
      enqueueSnackbar(error?.message, { variant: 'error' });
    }
  };


  return (
    <AuthSection
      title={verifyAccountData.title}
      description={verifyAccountData.description as string}
      buttonLabel={verifyAccountData.buttonLabel as string}
      methods={methods}
      onSubmit={onSubmit}
      buttonProps={{
        props: {
          loading: isSubmitting,
        },
      }}
      children={<>
        <Box width='100%'>
          <RHFCode
            wrapperSx={{
              height: '90px',
            }}
            sx={{
              '& fieldset': {
                border: 'none',
              },
            }}
            // length={6}
            // gap={0.7}
            name={VerifyAccountFormNames.Code}
            TextFieldsProps={{
              sx: {
                backgroundColor: '#F5F5F8',
                borderRadius: '16px',
              },
              inputProps: {
                style: {
                  fontWeight: 'bold',
                  color: '#0F1349',
                  fontSize: '20px',
                  height: '20px',
                  caretColor: '#1BFDB7',
                },
              },
            }}
          />
          <Stack>
            <Typography color={'#8688A3'} variant={'body2'}>
              I don't receive the OTP code
            </Typography>
            {/* Todo needs to be disabled after send the code for a period of time */}
            <Link
              color={'#0F1349'}
              variant='button'
              sx={{
                cursor: 'pointer',
              }}
              onClick={onResendOtpClicked}
            >
              Resend OTP Code
            </Link>
          </Stack>
        </Box>
      </>}
    />
  );
};

export default VerifyAccountSection;
