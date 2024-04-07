import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import LoadingButton from '@mui/lab/LoadingButton';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useDispatch } from 'react-redux';
import { editPassword } from 'src/redux/store/thunks/user';
import { AppDispatch } from 'src/redux/store/store';
import { useLocales } from 'src/locales';
import { Tooltip } from '@mui/material';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useLocales();
  const { loading } = useSelector((state: any) => state.user);

  const passwordShown = useBoolean();
  const newPasswordShown = useBoolean();
  const confirmPasswordShown = useBoolean();

  const ChangePassWordSchema = Yup.object().shape({
    oldPassword: Yup.string().required(t('userAccount.old_password_required')),
    newPassword: Yup.string()
      .required(t('userAccount.new_password_required'))
      .min(8, t('userAccount.password_length', { var: 8 }))
      .test(
        'no-match',
        t('userAccount.no_match'),
        (value, { parent }) => value !== parent.oldPassword
      ),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword')],
      t('userAccount.passwords_mismatch')
    ),
  });

  const defaultValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  };

  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch<AppDispatch>();
  const onSubmit = handleSubmit(async (data) => {
    dispatch(
      editPassword({
        data: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword,
        },
      })
    ).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        enqueueSnackbar(t('userAccount.password_changed'), { variant: 'success' });
        reset();
      } else {
        enqueueSnackbar(`${'common.error'} ${response.error.message}`, { variant: 'error' });
      }
    });
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack component={Card} spacing={3} sx={{ p: 3, '& label': { textTransform: 'capitalize' } }}>
        <RHFTextField
          name="oldPassword"
          type={passwordShown.value ? 'text' : 'password'}
          label={t('userAccount.oldPassword')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={passwordShown.value ? t('common.show') : t('common.hide')}>
                  <IconButton onClick={passwordShown.onToggle} edge="end">
                    <Iconify
                      icon={passwordShown.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="newPassword"
          label={t('userAccount.newPassword')}
          type={newPasswordShown.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={newPasswordShown.value ? t('common.show') : t('common.hide')}>
                  <IconButton onClick={newPasswordShown.onToggle} edge="end">
                    <Iconify
                      icon={newPasswordShown.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
          helperText={
            <Stack component="span" direction="row" alignItems="center">
              <Iconify icon="eva:info-fill" width={16} sx={{ mr: 0.5 }} />
              {t('userAccount.password_length', { var: 8 })}
            </Stack>
          }
        />

        <RHFTextField
          name="confirmNewPassword"
          type={confirmPasswordShown.value ? 'text' : 'password'}
          label={t('userAccount.confirmPassword')}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Tooltip title={confirmPasswordShown.value ? t('common.show') : t('common.hide')}>
                  <IconButton onClick={confirmPasswordShown.onToggle} edge="end">
                    <Iconify
                      icon={confirmPasswordShown.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'}
                    />
                  </IconButton>
                </Tooltip>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          type="submit"
          variant="contained"
          color={'primary'}
          loading={loading.editPassword}
          sx={{ ml: 'auto', textTransform: 'capitalize' }}
        >
          {t('userAccount.save_changes')}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
