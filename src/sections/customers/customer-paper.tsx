'use client';

// @mui
import { Box, Typography, Tooltip, IconButton, Grid, Paper, Chip } from '@mui/material';
// components
import Iconify from 'src/components/iconify/iconify';
import { useLocales } from 'src/locales';
import { fNumber } from 'src/utils/format-number';
import { STATUS_OPTIONS } from './view/customers-view';

type Props = {
  index: number;
  item: any;
  allowAction: any;
  setRemoveData: Function;
  confirm: any;
  toggleDrawerCommon: any;
};

export default function CustomerPaper({
  index,
  item,
  allowAction,
  setRemoveData,
  confirm,
  toggleDrawerCommon,
}: Props) {
  const { t } = useLocales();

  return (
    <Grid item key={index} xs={12} textTransform="capitalize">
      <Paper
        onClick={toggleDrawerCommon('details', item._id)}
        elevation={5}
        sx={{
          cursor: 'pointer',
          borderRadius: '16px',
          border: `2px solid`,
          borderColor: 'background.paper',
          '&:hover': {
            borderColor: 'primary.main',
          },
        }}
      >
        <Grid
          container
          item
          alignItems="center"
          justifyContent="space-between"
          rowGap={3}
          sx={{ px: 3, py: { xs: 3, md: 0 }, minHeight: '80px' }}
        >
          {/* ===== IMAGE AND NAME+PHONE ===== */}
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              {/* ===== IMAGE ===== */}
              {item.image ? (
                <Box component="img" src={item?.image} alt=" " width="22px" />
              ) : (
                <Box
                  component="div"
                  width="60px"
                  height="60px"
                  display={'flex'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Iconify
                    icon={
                      item?.country
                        ? `flagpack:${item.country?.iso2c?.toLowerCase()}`
                        : 'uil:images'
                    }
                    width="40px"
                    height="40px"
                    borderRadius="50%"
                  />
                </Box>
              )}
              {/* ===== NAME + PHONE NUMBER ===== */}
              <Box display="flex" gap="0px" flexDirection="column">
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.9rem', fontWeight: 900 }}
                >
                  {item.fullName}
                </Typography>
                <Typography
                  dir="ltr"
                  textAlign="end"
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.8rem' }}
                >
                  {item.phoneNumber}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* ===== ORDERS ===== */}
          <Grid item xs={6} md={2} textAlign="center">
            <Typography component="p" variant="subtitle2" sx={{ opacity: 0.7, fontSize: '.8rem' }}>
              {t('customers.orders')}
            </Typography>
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ fontSize: '.9rem', fontWeight: 900 }}
            >
              {item.totalCountOrder} {t('customers.orders')}
            </Typography>
          </Grid>

          {/* ===== TOTAL VALUE ===== */}
          <Grid item xs={6} md={2} textAlign="center">
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.8rem' }}
            >
              {t('customers.total')}
            </Typography>
            <Typography
              component="p"
              variant="subtitle2"
              sx={{ fontSize: '.9rem', fontWeight: 900 }}
            >
              {fNumber(item.totalCostOrders)} KWD
            </Typography>
          </Grid>

          {/* ===== TYPE CHIP ===== */}
          <Grid item xs={6} md={2} textAlign="center">
            <Chip
              label={t(`customers.${item.type}`)}
              size="small"
              sx={{ borderRadius: '10000px' }}
              color={
                (STATUS_OPTIONS.find((status) => status.value === item.type)?.color as any) ||
                'default'
              }
            />
          </Grid>

          {/* ===== ACTIONS / edit - remove ===== */}
          <Grid item xs={6} md={2} textAlign="end" onClick={(e) => e.stopPropagation()}>
            {allowAction.remove && (
              <Tooltip title={t('customers.delete_btn')}>
                <IconButton
                  onClick={() => {
                    setRemoveData(item?._id);
                    confirm.onTrue();
                  }}
                >
                  <Iconify color="text.secondary" icon="lucide:trash-2" width={25} />
                </IconButton>
              </Tooltip>
            )}
            {allowAction.remove && (
              <Tooltip title={t('customers.edit')}>
                <IconButton>
                  <Iconify
                    color="text.secondary"
                    icon="lucide:edit"
                    onClick={toggleDrawerCommon('createOrEdit', item._id)}
                    width={25}
                  />
                </IconButton>
              </Tooltip>
            )}
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
