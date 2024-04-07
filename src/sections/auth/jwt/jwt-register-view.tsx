'use client';

import * as Yup from 'yup';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import '../../../globals.css';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useSearchParams, useRouter } from 'src/routes/hooks';
// config
import { PATH_AFTER_LOGIN, PATH_AFTER_REGISTER } from 'src/config-global';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import Iconify from 'src/components/iconify';
import FormProvider, { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box } from '@mui/system';
import Image from 'next/image';
import { getCookie, setCookie } from 'src/auth/context/jwt/utils';
import { InputLabel, MenuItem } from '@mui/material';
// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register, sendOtp, getCountries } = useAuthContext();
  const [captcha, setCaptcha] = useState<any>();
  const [captchaError, setCaptchaError] = useState<string>();

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const [countries, setCountries] = useState([]);

  const [selectedValue, setSelectedValue] = useState<string>('default');

  const [selectedCountry, setSelectedCountry] = useState<any>(null);

  const [isError, setIsError] = useState<boolean>(false);

  const userEmail = getCookie('user-email');

  const RegisterSchema = Yup.object().shape({
    fullName: Yup.string().required('Full name required'),
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Code must be at least 8 characters'),
    country: Yup.string().required('Country is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .test(
        'phone-size',
        `Phone number must be between ${selectedCountry?.min_tel_length} and ${selectedCountry?.max_tel_length} characters`,
        (value) => {
          const length = value?.length || 0;
          return (
            length >= selectedCountry?.min_tel_length && length <= selectedCountry?.max_tel_length
          );
        }
      ),
  });

  const defaultValues = {
    fullName: '',
    email: userEmail ?? '',
    password: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data: any) => {
    console.log(data, 'this is data');
    data['countryCode'] = selectedCountry.code;
    // if (captcha) {
    if (true) {
      try {
        // need to change this
        // await register?.(data.email, data.password, data.firstName, data.lastName);

        const result: any = await sendOtp?.(data.email);
        if (result) {
          const { success } = result;
          // eslint-disable-next-line no-empty
          if (success) {
            setCookie(
              'register_user_data',
              JSON.stringify({
                email: data.email,
                password: data.password,
                fullName: data.fullName,
                country: data.country,
                countryCode: selectedCountry.code,
                phoneNumber: data.phoneNumber,
              }),
              7
            );
            router.push(PATH_AFTER_REGISTER);
          }
        }

        // router.push(returnTo || PATH_AFTER_LOGIN);
      } catch (error) {
        console.error(error);
        reset();
        setErrorMsg(typeof error === 'string' ? error : error.message);
      }
    } else {
      setCaptchaError("Please verify that you're a human");
    }
  });

  const handleSelectChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const iso2c = event.target.value as string;
    const country = countries.find((c: any) => c?.iso2c === iso2c);
    if (country) {
      setSelectedCountry(country);
      setSelectedValue(iso2c);
    } else {
      setSelectedCountry(null);
      setSelectedValue(iso2c);
    }
  };

  const fecthCountries = async () => {
    try {
      const result = await getCountries();
      const { success, data } = result;
      if (result && success) {
        setCountries(() => data.data);
      }
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };
  useEffect(() => {
    fecthCountries();
    if (!userEmail) {
      router.replace(paths.auth.jwt.checkUser);
    }
  }, []);
  const renderHead = (
    <Stack spacing={2} sx={{ mb: 1, position: 'relative' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Typography sx={{ color: '#0F1546' }} variant="h4">
          Sign Up
        </Typography>
        <Image alt="" width={30} height={30} src="/raw/smile.png" />
      </Box>

      {/* <Stack direction="row" spacing={0.5}>
        <Typography variant="body2"> Already have an account? </Typography>

        <Link href={paths.auth.jwt.login} component={RouterLink} variant="subtitle2">
          Sign in
        </Link>
      </Stack> */}
    </Stack>
  );

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  );

  const renderForm = (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
          <RHFTextField
            setIsError={setIsError}
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
              outline: 'none',
              boxShadow: isError ? 'none' : '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
            variant="filled"
            name="fullName"
            placeholder="Full Name"
          />
          <RHFTextField
            setIsError={setIsError}
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
              outline: 'none',
              boxShadow: isError ? 'none' : '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
            variant="filled"
            name="email"
            placeholder="Email address"
          />
        </Stack>
        <Stack direction="column" spacing={1}>
          {/* country */}
          <RHFSelect
            variant="filled"
            name="country"
            value={selectedValue}
            placeholder="Country"
            settingStateValue={handleSelectChange}
            sx={{
              '& > :not(style)': { color: '#637381' }, // This targets children elements except <style>
              '& .MuiSelect-select': {
                // Targeting the select input directly for styles
                '-webkit-text-fill-color': 'black', // Ensures text color is black, important for autofill
                backgroundColor: 'white',
                borderRadius: '18px',
                '&:focus': {
                  // When the element is focused
                  backgroundColor: 'white',
                  borderRadius: '18px',
                },
                '&:-webkit-autofill': {
                  // Targeting Chrome/Safari autofill
                  '-webkit-box-shadow': '0 0 0 100px #18ddbe inset',
                  '-webkit-text-fill-color': 'black',
                  borderRadius: '18px',
                },
              },
              '& .MuiFilledInput-underline:after, & .MuiFilledInput-underline:before': {
                display: 'none', // Removes underline effect from filled variant
              },
              backgroundColor: 'transparent',
              borderRadius: '18px',
              outline: 'none',
            }}
          >
            <MenuItem value="default" disabled>
              Select Country
            </MenuItem>
            {countries.map((country: any) => (
              <MenuItem value={country?.iso2c}>
                <img
                  src={country?.image}
                  alt={country?.title.en}
                  style={{ width: '24px', marginRight: '8px' }}
                />
                {country?.title.en}
              </MenuItem>
            ))}
          </RHFSelect>
          {/* phone */}
          <RHFTextField
            setIsError={setIsError}
            sx={{
              '& > :not(style)': { color: 'black', backgroundColor: 'transparent' },
              '& input': {
                backgroundColor: 'white',
                borderRadius: '9999px',
              },
              '& .MuiInputBase-root': {
                backgroundColor: 'white',
                borderRadius: '9999px',
              },
              '& input:-webkit-autofill': {
                '-webkit-box-shadow': '0 0 0 100px #18ddbe inset',
                borderRadius: '9999px',
              },

              borderRadius: '9999px',
              boxShadow: isError ? 'none' : '0 0 10px rgba(0, 0, 0, 0.3)',
            }}
            variant="filled"
            name="phoneNumber"
            placeholder="Phone Number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="end">
                  {selectedCountry && (
                    <>
                      <img
                        src={selectedCountry.image}
                        alt=""
                        style={{ width: 24, height: 16, marginRight: 8 }}
                      />
                      <Typography variant="body1" style={{ marginRight: 20 }}>
                        {selectedCountry.code}
                      </Typography>
                    </>
                  )}
                </InputAdornment>
              ),
            }}
          />
        </Stack>
        {/* pass */}
        <RHFTextField
          setIsError={setIsError}
          sx={{
            '& > :not(style)': { color: 'black', backgroundColor: 'transparent' },
            '& input': {
              backgroundColor: 'white',
              borderRadius: '9999px',
            },
            '& .MuiInputBase-root': {
              backgroundColor: 'white',
              // Set the background color for the side icons
              borderRadius: '9999px',
            },
            '& input:-webkit-autofill': {
              '-webkit-box-shadow': '0 0 0 100px #18ddbe inset',
              borderRadius: '9999px',
            },
            boxShadow: isError ? 'none' : '0 0 10px rgba(0, 0, 0, 0.3)',
            borderRadius: '9999px',
          }}
          variant="filled"
          name="password"
          placeholder="Password"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        {/* ReCaptcha */}
        {/* <Box sx={{ width: '100%', marginRight: 'auto', marginLeft: 'auto' }}>
          <ReCAPTCHA
            className="recaptcha"
            style={{ width: '100%', padding: '9px' }}
            onChange={setCaptcha}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
          />
        </Box> */}
        {captchaError && (
          <Typography sx={{ fontSize: '14px', color: 'red' }}>{captchaError}</Typography>
        )}

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
            justifyContent: 'space-evenly',
          }}
          disabled={isSubmitting}
        >
          <span>Sign Up</span>
          <IconButton
            size="small"
            style={{
              padding: '5px',
              color: 'black',
            }}
            disabled={isSubmitting}
          >
            <ArrowForwardIcon />
          </IconButton>
        </button>
      </Stack>
    </FormProvider>
  );

  return (
    <>
      {renderHead}

      {renderForm}

      {/* {renderTerms} */}
    </>
  );
}
