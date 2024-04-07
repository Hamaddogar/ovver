import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
// utils
import { fData } from 'src/utils/format-number';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
  RHFAutocomplete,
  RHFDatePicker,
  RHFPhoneField,
  RHFSelect,
} from 'src/components/hook-form';
import { useSelector } from 'react-redux';
import { editMyUser, fetchMyUser } from 'src/redux/store/thunks/user';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { Autocomplete, Button, MenuItem, TextField } from '@mui/material';
import { AccountGeneralLoading } from './loading';
import { useLocales } from 'src/locales';
import axios from 'axios';
import { FieldLoading } from '../brand/loading';

// ----------------------------------------------------------------------
type Country = { code: string; iso2c: string; title: { [key: string]: string } };
type UserDataType = {
  fullName: string;
  email: string;
  country: Country; // Custom country object
  phoneNumber: string; // Phone number
  birthday: string; // Date in the format: yyyy-mm-dd
  gender: 'MALE' | 'FEMALE'; // Gender can be either 'MALE' or 'FEMALE'
  location: string; // Address
  image: string | File | null; // Image can be a URL (string), a File, or null
};
// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const { t, currentLang } = useLocales();
  const dispatch = useDispatch<AppDispatch>();
  const [countriesLoading, setCountriesLoading] = useState(false);

  const { user, loading } = useSelector((state: any) => state.user);

  const UpdateUserSchema = Yup.object().shape({
    fullName: Yup.string().required('name_required'),
    // country: Yup.string().required('country_required'),
    phoneNumber: Yup.string().required('phone_required'),
    birthday: Yup.string().required('birthday_required'),
    // not required
    location: Yup.string().notRequired(),
    image: Yup.mixed().notRequired(),
  });

  const [countries, setCountries] = useState<Country[]>([]);
  const [defaultValues, setDefaultValues] = useState<UserDataType>({
    fullName: user?.fullName,
    email: user?.email,
    country: user?.country,
    phoneNumber: user?.phoneNumber,
    birthday: user?.birthday,
    gender: user?.gender,
    location: user?.location,
    image: user?.image,
  });
  const [selectedCountry, setSelectedCountry] = useState(defaultValues?.country?.iso2c);

  const methods = useForm<any>({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    const formValues = new FormData();
    formValues.append(`fullName`, data.fullName);
    formValues.append(`phoneNumber`, data.phoneNumber);
    formValues.append(`birthday`, data.birthday);
    formValues.append(`gender`, defaultValues.gender);
    formValues.append(`location[0]`, data.location);
    if (!!selectedCountry) {
      formValues.append(`country`, selectedCountry);
    }
    if (!!data.image && typeof data.image !== 'string') {
      formValues.append(`image`, data.image);
    }
    dispatch(
      editMyUser({
        data: formValues,
      })
    ).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar(t('userAccount.success_edit'), { variant: 'success' });
        // reset();
      } else {
        enqueueSnackbar(`${'common.error'} ${response.error.message}`, { variant: 'error' });
      }
    });
  });

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  const getCountries = async () => {
    setCountriesLoading(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_HOST_API}/country/all`, {
        headers: {
          'x-lang': currentLang.value,
        },
      });
      if (res?.data) {
        setCountries(res.data.data.data);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setCountriesLoading(false);
    }
  };
  useEffect(() => {
    getCountries();
    dispatch(fetchMyUser());
  }, []);
  useEffect(() => {
    if (!selectedCountry) {
      setSelectedCountry(defaultValues.country?.iso2c as string);
    }
  }, [defaultValues]);
  useEffect(() => {
    if (user) {
      setDefaultValues({
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        gender: user.gender,
        location: user.location[0],
        image: user.image,
      });
      reset({
        fullName: user.fullName,
        email: user.email,
        country: user.country,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        gender: user.gender,
        location: user.location[0],
        image: user.image,
      });
    }
  }, [user, reset]);

  if (loading.fetchMyUser) {
    return <AccountGeneralLoading />;
  }
  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          {/* ========== IMAGE ========== */}
          <Card
            sx={{
              pt: 10,
              pb: 5,
              px: 3,
              textAlign: 'center',
              height: '100%',
            }}
          >
            <RHFUploadAvatar
              name="image"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 3,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.disabled',
                  }}
                >
                  {t('userAccount.image_allowed_ex', { var: '*.jpeg, *.jpg, *.png, *.gif' })}
                  <br />
                  {t('userAccount.image_max_size', { var: fData(3145728) })}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
              sx={{
                '& label': { textTransform: 'capitalize' },
                '& input': { borderRadius: 'inherit !important' },
                '& p': { color: 'text.secondary', textTransform: 'capitalize', px: 1 },
              }}
            >
              {/* ========== FULL NAME ========== */}
              <Box>
                <Typography>{t('userAccount.fullName')}</Typography>
                <RHFTextField name="fullName" />
              </Box>
              {/* ========== EMAIL ========== */}
              <Box>
                <Typography>{t('userAccount.email')}</Typography>
                <RHFTextField disabled value={defaultValues.email} name="email" />
              </Box>
              {/* ========== ADDRESS ========== */}
              <Box>
                <Typography>{t('userAccount.address')}</Typography>
                <RHFTextField name="location" />
              </Box>
              <Box>
                <Typography>{t('userAccount.phoneNumber')}</Typography>
                {countriesLoading || loading.fetchMyUser ? (
                  <FieldLoading />
                ) : (
                  <RHFPhoneField
                    name="phoneNumber"
                    // label={t('userAccount.phoneNumber')}
                    countries={countries}
                  />
                )}
              </Box>
              {/* ========== COUNTRY ========== */}
              <Box>
                <Typography>{t('userAccount.country')}</Typography>
                {countriesLoading || loading.fetchMyUser ? (
                  <FieldLoading />
                ) : (
                  <Autocomplete
                    value={
                      countries.find((country) => country.iso2c === selectedCountry)?.iso2c || ''
                    }
                    onChange={(event, newValue) => {
                      setSelectedCountry(newValue as string);
                    }}
                    id="country-select"
                    options={countries.map((country) => country.iso2c)}
                    getOptionLabel={(option) =>
                      countries.find((country) => country.iso2c === option)?.title?.localized || ''
                    }
                    renderInput={(params) => (
                      <TextField name="country" {...params} variant="outlined" />
                    )}
                  />
                )}
              </Box>
              {/* ========== BIRTHDAY ========== */}
              <Box>
                <Typography>{t('userAccount.birthday')}</Typography>
                <RHFDatePicker name="birthday" sx={{ width: '100%' }} />
              </Box>
              {/* ========== GENDER ========== */}
              <Box>
                <Typography>{t('userAccount.gender')}</Typography>
                <Stack textTransform="capitalize" direction="row" gap={2}>
                  <Button
                    onClick={() => setDefaultValues({ ...defaultValues, gender: 'MALE' })}
                    fullWidth
                    variant="soft"
                    color={defaultValues.gender === 'MALE' ? 'primary' : 'inherit'}
                    sx={{
                      p: 1.5,
                      border: '1px solid',
                      borderColor:
                        defaultValues.gender === 'MALE' ? 'primary.main' : 'text.disabled',
                      color: defaultValues.gender === 'MALE' ? 'text.primary' : 'text.disabled',
                      borderWidth: 3,
                    }}
                  >
                    <Iconify icon={'fa-solid:male'} />
                    {t(`userAccount.MALE`)}
                  </Button>
                  <Button
                    onClick={() => setDefaultValues({ ...defaultValues, gender: 'FEMALE' })}
                    fullWidth
                    variant="soft"
                    color={defaultValues.gender === 'FEMALE' ? 'primary' : 'inherit'}
                    sx={{
                      p: 1.5,
                      border: '1px solid',
                      borderColor:
                        defaultValues.gender === 'FEMALE' ? 'primary.main' : 'text.disabled',
                      color: defaultValues.gender === 'FEMALE' ? 'text.primary' : 'text.disabled',
                      borderWidth: 3,
                    }}
                  >
                    <Iconify icon={'fa-solid:female'} />
                    {t(`userAccount.FEMALE`)}
                  </Button>
                </Stack>
              </Box>
            </Box>

            {/* ========== SAVE OPTIONS / SUBMIT BUTTON ========== */}
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3, textTransform: 'capitalize' }}>
              <LoadingButton
                type="submit"
                variant="contained"
                color={'primary'}
                loading={loading.editMyUser}
              >
                {t('userAccount.save_changes')}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
