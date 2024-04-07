'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { Box } from '@mui/material';
import Image from 'next/image';
import { getCookie } from 'src/auth/context/jwt/utils';

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const userEmail = getCookie('user-email');

  const [isError, setIsError] = useState<boolean>(false)


  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .min(8, 'Code must be at least 8 characters')
      .required('Password is required'),
  });

  const defaultValues = {
    email: userEmail ?? '',
    password: ''
  };
  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    clearErrors
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      await login?.(data.email, data.password);
      router.push(returnTo || PATH_AFTER_LOGIN);
      reset()
    } catch (error) {
      console.error(error);

      // clearErrors();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Typography sx={{ color: '#0F1546' }} variant="h4">
          Login
        </Typography>
        <Image alt="" width={30} height={30} src="/raw/smile.png" />
      </Box>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.jwt.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack> */}
    </Stack>
  );
  useEffect(() => {
    if (!userEmail) {
      router.replace(paths.auth.jwt.checkUser)
    }
  }, [])
  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField
        setIsError={setIsError}
        variant="filled"
        name="email"
        sx={{
          '& > :not(style)': { color: 'black' },
          '& input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #18ddbe inset',
            borderRadius: '9999px',
          },
          '& input': {
            backgroundColor: 'white',
            borderRadius: '9999px',
          },
          backgroundColor: 'transparent',
          borderRadius: '9999px',
          boxShadow: isError ? 'none' : '0 0 10px rgba(0, 0, 0, 0.3)'

        }}
        placeholder="Email address"
      />
      <RHFTextField
        setIsError={setIsError}
        sx={{
          '& > :not(style)': { color: 'black', backgroundColor: 'transparent' },
          '& input': {
            backgroundColor: 'white',
            borderRadius: '9999px',
          },
          '& input::hover': {
            backgroundColor: 'white',
          },
          '& input::focused': {
            backgroundColor: 'white',
          },
          '& .MuiInputBase-root': {
            backgroundColor: 'white',
            borderRadius: '9999px',
          },
          '& input:-webkit-autofill': {
            '-webkit-box-shadow': '0 0 0 100px #18ddbe inset',
            borderRadius: '9999px',
          },
          boxShadow: isError ? 'none' : '0 0 10px rgba(0, 0, 0, 0.3)',
          borderRadius: '9999px',
        }}
        name="password"
        placeholder="Password"
        variant="filled"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment sx={{ backgroundColor: 'white' }} position="end">
              <IconButton sx={{ backgroundColor: 'white' }} onClick={password.onToggle} edge="end">
                <Iconify
                  sx={{ backgroundColor: 'white' }}
                  icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row-reverse',
          justifyContent: 'space-between',
        }}
      >
        <Link
          component={RouterLink}
          href={paths.auth.jwt.forgotPassword}
          variant="body2"
          color="inherit"
          underline="always"
          sx={{ color: '#101746' }}
        >
          Forgot password?
        </Link>

        <button
          type="submit"
          style={{
            cursor: 'pointer',
            border: '2px solid #101746',
            padding: '16px',
            borderRadius: '300px',
            background: 'transparent',
            fontSize: '17px',
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
          disabled={isSubmitting}
        >
          <span>Login</span>
          <IconButton
            size="small"
            style={{
              padding: '5px',
              color: 'black'
            }}
            disabled={isSubmitting}
          >
            <ArrowForwardIcon />
          </IconButton>
        </button>
      </Box>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
