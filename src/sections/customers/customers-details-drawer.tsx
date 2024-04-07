// @mui
import Divider from '@mui/material/Divider';
import { Box, Stack, Chip, Typography } from '@mui/material';
// components
import { CustomDrawer } from 'src/components/drawer';
// hooks
import { useLocales } from 'src/locales';
import { fNumber } from 'src/utils/format-number';
import { FieldLoading } from '../brand/loading';
import { fDate } from 'src/utils/format-time';
import Iconify from 'src/components/iconify/iconify';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  customerData: any;
  loading: any;
};
export default function CustomersDetailsDrawer({ open, onClose, customerData, loading }: Props) {
  const { t } = useLocales();
  return (
    <CustomDrawer open={open} onClose={onClose} title={t('customers.details')}>
      <Divider flexItem />
      {loading.fetchOneCustomer ? (
        <>
          <FieldLoading />
          <FieldLoading />
          <FieldLoading />
        </>
      ) : (
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          textTransform="capitalize"
          gap="25px"
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {customerData?.image ? (
              <Box component="img" src="/raw/CustomerAvatar.svg" alt=" " width="55px" />
            ) : (
              <Iconify
                icon={
                  customerData?.country
                    ? `flagpack:${customerData.country?.iso2c?.toLowerCase()}`
                    : 'uil:images'
                }
                width="40px"
                height="40px"
                borderRadius="50%"
              />
            )}
            <Box display="flex" gap="0px" flexDirection="column">
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '1.1rem', fontWeight: 900 }}
              >
                {customerData?.fullName}
                <Chip
                  label={t(`customers.${customerData?.type}`)}
                  size="small"
                  color="primary"
                  sx={{
                    color: '#0F164A',
                    fontSize: '11px',
                    borderRadius: '16px',
                    height: 'auto',
                    mx: 1,
                    padding: '2px 5px 0px 5px',
                  }}
                />
              </Typography>
              <Typography
                component="a"
                dir="ltr"
                href={`mailto:${customerData?.email}`}
                variant="subtitle2"
                textTransform="none"
                sx={{ opacity: 0.7, fontSize: '.8rem', textDecoration: 'none', color: 'inherit' }}
              >
                {customerData?.email}
              </Typography>
            </Box>
          </Box>
          <Divider flexItem />

          {customerData?.country && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Box component="img" src="/raw/earth.svg" alt=" " width="25px" />
              <Box display="flex" gap="0px" flexDirection="column">
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  {t('customers.country')}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.8rem', fontWeight: 900 }}
                >
                  {customerData?.country?.title?.localized}
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            component="a"
            href={`tel:${customerData?.phoneNumber}`}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <Box component="img" src="/raw/mobile_num.svg" alt=" " width="25px" />
            <Box display="flex" gap="0px" flexDirection="column">
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.8rem' }}
              >
                {t('customers.phoneNumber')}
              </Typography>
              <Typography
                dir="ltr"
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 900 }}
              >
                {customerData?.phoneNumber}
              </Typography>
            </Box>
          </Box>

          {customerData?.location?.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Box component="img" src="/raw/pin-address.svg" alt=" " width="25px" />
              <Box display="flex" gap="0px" flexDirection="column">
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  {t('customers.address')}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.8rem', fontWeight: 900 }}
                >
                  {customerData?.location}
                </Typography>
              </Box>
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Box component="img" src="/raw/calendar-days.svg" alt=" " width="25px" />
            <Box display="flex" gap="0px" flexDirection="column">
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.8rem' }}
              >
                {t('customers.user_since')}
              </Typography>
              <Typography
                component="p"
                dir="ltr"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 900 }}
              >
                {fDate(customerData?.createdAt)}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <Box component="img" src="/raw/bolt-solid-status.svg" alt=" " width="25px" />
            <Box display="flex" gap="0px" flexDirection="column">
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.8rem' }}
              >
                {t('customers.status')}
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.8rem', fontWeight: 900 }}
              >
                {customerData?.isActive ? t('customers.active') : t('customers.not_active')}
              </Typography>
            </Box>
          </Box>

          {/* ========== TODO: real order data!! ========== */}
          <Box
            sx={{
              padding: '10px',
              boxShadow: '0px 4px 20px #0F134914',
              borderRadius: '12px',
              background: 'background.paper',
            }}
          >
            <Stack sx={{ mb: 2 }}>
              <Box>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  {t('customers.total_orders')}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.8rem', fontWeight: 900 }}
                >
                  {/* TODO: currency */}
                  {fNumber(customerData?.totalCostOrders)} KWD (
                  {fNumber(customerData?.totalCountOrder)} {t('customers.orders')})
                </Typography>
              </Box>
            </Stack>
            {customerData?.totalCountOrder > 0 && (
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.8rem' }}
                  >
                    {t('customers.first_order')}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ fontSize: '.8rem', fontWeight: 700 }}
                  >
                    {fDate(customerData?.firstOrderDate)}
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ opacity: 0.7, fontSize: '.8rem' }}
                  >
                    {t('customers.latest_order')}
                  </Typography>
                  <Typography
                    component="p"
                    variant="subtitle2"
                    sx={{ fontSize: '.8rem', fontWeight: 700 }}
                  >
                    {fDate(customerData.latestOrderDate)}
                  </Typography>
                </Box>
                {/* <Box>
                <Chip label="Successful" size="small" color="success" />
              </Box> */}
              </Stack>
            )}

            {/* <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Box display="flex" alignItems="center" gap="5px">
                <Box component="img" src="/raw/flag.png" alt="" />
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.8rem', fontWeight: 900 }}
                >
                  Mohamed Hassan
                </Typography>
              </Box>
              <Box>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  2 items
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.8rem', fontWeight: 900 }}
                >
                  120 KWD
                </Typography>
              </Box>
            </Stack> */}
          </Box>
        </Box>
      )}
    </CustomDrawer>
  );
}
