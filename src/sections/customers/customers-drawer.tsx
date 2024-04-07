'use client';
import FormProvider, { RHFPhoneField, RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

// @mui
import Divider from '@mui/material/Divider';
import { Box, Stack, Typography, Alert, useTheme } from '@mui/material';
// components
import { FieldLoading } from '../brand/loading';
import { CustomDrawer } from 'src/components/drawer';
import { useLocales } from 'src/locales';

type Props = {
  drawerOpen: boolean;
  handleDrawerCloseCommon: Function;
  editCustomerId: string | null;
  loading: any;
  customerData: any;
  methods: any;
  onSubmit: VoidFunction;
  errorMsg: string;
  handleCustomerData: Function;
};

export default function CustomersDrawer({
  drawerOpen,
  handleDrawerCloseCommon,
  editCustomerId,
  loading,
  customerData,
  methods,
  errorMsg,
  onSubmit,
  handleCustomerData,
}: Props) {
  const { t } = useLocales();
  const theme = useTheme();

  return (
    <CustomDrawer
      open={drawerOpen}
      onClose={handleDrawerCloseCommon}
      title={editCustomerId ? t('customers.edit_customer') : t('customers.add_customer')}
      actions={
        <Stack alignItems="center" justifyContent="center" spacing="10px">
          <LoadingButton
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ borderRadius: '30px', textTransform: 'capitalize' }}
            loading={loading.createCustomer || loading.editCustomer}
            onClick={() => methods.handleSubmit(onSubmit as any)()}
          >
            {editCustomerId ? t('customers.update') : t('customers.save')}
          </LoadingButton>
        </Stack>
      }
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Divider flexItem />
        {loading.fetchOneCustomer ? (
          <>
            <FieldLoading />
            <FieldLoading />
            <FieldLoading />
          </>
        ) : (
          <>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            {/* ========== NAME ========== */}
            <Box width="100%">
              <Box>
                <Typography
                  component="p"
                  noWrap
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                    marginTop: 2,
                    marginBottom: 0.5,
                    textTransform: 'capitalize',
                    fontSize: '.9rem',
                  }}
                >
                  {t('customers.name')}
                </Typography>
                <RHFTextField
                  fullWidth
                  variant="filled"
                  value={customerData?.fullName || ''}
                  settingStateValue={handleCustomerData}
                  name="fullName"
                />
              </Box>
              {/* ========== PHONE NUMBER ========== */}
              <Box>
                <Typography
                  component="p"
                  noWrap
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                    marginTop: 2,
                    marginBottom: 0.5,
                    textTransform: 'capitalize',
                    fontSize: '.9rem',
                  }}
                >
                  {t('customers.phoneNumber')}
                </Typography>
                <RHFPhoneField name="phoneNumber" variant="filled" />
              </Box>
              {/* ========== EMAIL ========== */}
              <Box>
                <Typography
                  component="p"
                  noWrap
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                    marginTop: 2,
                    marginBottom: 0.5,
                    textTransform: 'capitalize',
                    fontSize: '.9rem',
                  }}
                >
                  {t('customers.email')}
                </Typography>
                <RHFTextField
                  dir="ltr"
                  fullWidth
                  variant="filled"
                  value={customerData?.email || ''}
                  settingStateValue={handleCustomerData}
                  name="email"
                />
              </Box>
              {/* ========== ADDRESS ========== */}
              <Box>
                <Typography
                  component="p"
                  noWrap
                  variant="subtitle2"
                  sx={{
                    color: 'text.secondary',
                    marginTop: 2,
                    marginBottom: 0.5,
                    textTransform: 'capitalize',
                    fontSize: '.9rem',
                  }}
                >
                  {t('customers.address')}
                </Typography>
                <RHFTextField
                  fullWidth
                  variant="filled"
                  value={customerData?.location || ''}
                  settingStateValue={handleCustomerData}
                  name="location"
                />
              </Box>
            </Box>
          </>
        )}
      </FormProvider>
    </CustomDrawer>
  );
}
