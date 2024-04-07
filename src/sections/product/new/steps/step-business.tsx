// PRODUCT BUSINESS

import { useState } from 'react';
import { Box, Button, Grid, Stack, Switch, Typography, alpha, useTheme } from '@mui/material';
import { useLocales } from 'src/locales';
import SectionTitle from '../section-title';
import { RHFAutocomplete, RHFDatePicker, RHFTextField } from 'src/components/hook-form';

export default function StepBusiness() {
  const { t } = useLocales();
  const theme = useTheme();
  const [value, setValue] = useState<string[]>([]);
  const [isDiscountPercentage, setIsDiscountPercentage] = useState(false);
  const [isUnlimited, setIsUnlimited] = useState(false);

  return (
    <Grid container>
      {/* ========== PRODUCT PRICE ========== */}
      <Grid item xs={12} md={6} xl={4} sx={{ px: 2 }} textTransform="capitalize">
        <SectionTitle title={t('products.create_product.product_price')} />
        {/* ===== purchase price ===== */}
        <Stack
          sx={{
            width: '100%',
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.purchase_price')}
          </Typography>
          <RHFTextField variant="filled" name="name" value={''} onChange={(e) => {}} />
        </Stack>
        {/* ===== sell price ===== */}
        <Stack
          sx={{
            width: '100%',
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.sell_price')}
          </Typography>
          <RHFTextField variant="filled" name="name" value={''} onChange={(e) => {}} />
        </Stack>
        {/* ===== discount type ===== */}
        <Stack
          sx={{
            width: '100%',
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.discount_type')}
          </Typography>
          <Stack textTransform="capitalize" direction="row" gap={3}>
            <Button
              onClick={() => setIsDiscountPercentage(false)}
              fullWidth
              variant="soft"
              color={!isDiscountPercentage ? 'primary' : 'inherit'}
              sx={{
                p: 1.2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: !isDiscountPercentage ? 'primary.main' : 'text.disabled',
                color: !isDiscountPercentage ? 'text.primary' : 'text.secondary',
                borderWidth: 3,
              }}
            >
              {t('products.create_product.fixed')}
            </Button>
            <Button
              onClick={() => setIsDiscountPercentage(true)}
              fullWidth
              variant="soft"
              color={isDiscountPercentage ? 'primary' : 'inherit'}
              sx={{
                p: 1.2,
                borderRadius: 2,
                border: '1px solid',
                borderColor: isDiscountPercentage ? 'primary.main' : 'text.disabled',
                color: isDiscountPercentage ? 'text.primary' : 'text.secondary',
                borderWidth: 3,
              }}
            >
              {t('products.create_product.percentage')}
            </Button>
          </Stack>
        </Stack>
        {/* ===== discount ===== */}
        <Stack
          sx={{
            width: '100%',
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.discount')}
          </Typography>
          <RHFTextField variant="filled" name="name" value={''} onChange={(e) => {}} />
        </Stack>
        {/* ===== discount date ===== */}
        <Stack direction="row" gap={2}>
          <Stack
            sx={{
              width: '100%',
              mt: 4,
            }}
          >
            <Typography
              component="p"
              noWrap
              variant="body1"
              sx={{
                opacity: 0.7,
                fontSize: '1.2rem',
                display: 'flex',
                textTransform: 'capitalize',
              }}
            >
              {t('products.create_product.start_date')}
            </Typography>
            <RHFDatePicker variant="filled" name="" sx={{ width: '100%' }} />
          </Stack>
          <Stack
            sx={{
              width: '100%',
              mt: 4,
            }}
          >
            <Typography
              component="p"
              noWrap
              variant="body1"
              sx={{
                opacity: 0.7,
                fontSize: '1.2rem',
                display: 'flex',
                textTransform: 'capitalize',
              }}
            >
              {t('products.create_product.end_date')}
            </Typography>
            <RHFDatePicker variant="filled" name="" sx={{ width: '100%' }} />
          </Stack>
        </Stack>
      </Grid>
      {/* ========== PRODUCT STOCK ========== */}
      <Grid item xs={12} md={6} xl={4} sx={{ px: 2 }} textTransform="capitalize">
        <SectionTitle title={t('products.create_product.product_stock')} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 5,
            mb: 5,
          }}
        >
          <Stack>
            <Typography
              component="p"
              noWrap
              variant="body1"
              sx={{
                opacity: 0.7,
                fontSize: '1.2rem',
                display: 'flex',
              }}
            >
              {t('products.create_product.stock')}
            </Typography>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{
                fontSize: '1.2rem',
                display: 'flex',
              }}
            >
              {t('products.create_product.unlimited')}
            </Typography>
          </Stack>
          <Switch value={isUnlimited} onChange={() => setIsUnlimited((prev) => !prev)} />
        </Box>
        {!isUnlimited && (
          <>
            {/* ===== quantity in stock ===== */}
            <Stack
              sx={{
                width: '100%',
                mt: 4,
              }}
            >
              <Typography
                component="p"
                noWrap
                variant="body1"
                sx={{
                  opacity: 0.7,
                  fontSize: '1.2rem',
                  display: 'flex',
                  textTransform: 'capitalize',
                }}
              >
                {t('products.create_product.quantity_stock')}
              </Typography>
              <RHFTextField variant="filled" name="name" value={''} onChange={(e) => {}} />
            </Stack>
            {/* ===== max quantity per user ===== */}
            <Stack
              sx={{
                width: '100%',
                mt: 4,
              }}
            >
              <Typography
                component="p"
                noWrap
                variant="body1"
                sx={{
                  opacity: 0.7,
                  fontSize: '1.2rem',
                  display: 'flex',
                  textTransform: 'capitalize',
                }}
              >
                {t('products.create_product.max_quantity_user')}
              </Typography>
              <RHFTextField variant="filled" name="name" value={''} onChange={(e) => {}} />
            </Stack>
            {/* ===== low quantity ===== */}
            <Stack
              sx={{
                width: '100%',
                mt: 4,
              }}
            >
              <Typography
                component="p"
                noWrap
                variant="body1"
                sx={{
                  opacity: 0.7,
                  fontSize: '1.2rem',
                  display: 'flex',
                  textTransform: 'capitalize',
                }}
              >
                {t('products.create_product.low_quantity')}
              </Typography>
              <RHFTextField
                variant="filled"
                name="name"
                InputProps={{
                  sx: { bgcolor: alpha(theme.palette.error.main, 0.2) },
                }}
                value={''}
                onChange={(e) => {}}
              />
            </Stack>
          </>
        )}
        {/* ===== occasion ===== */}
        <Stack
          sx={{
            width: '100%',
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.occasion')}
          </Typography>
          <RHFAutocomplete
            name=""
            multiple
            freeSolo
            sx={{
              '& .MuiAutocomplete-tag': {
                bgcolor: 'text.disabled',
                color: 'text.primary',
              },
            }}
            variant="filled"
            options={[]}
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            getOptionLabel={(option: string) => option}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
