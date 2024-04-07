import { RHFTextField } from 'src/components/hook-form';
import { Box, Grid, Typography } from '@mui/material';

export default function StepTwo({ selectedDiscountType, setValue, activeTab, nonActiveTab }: any) {
  return (
    <>
      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Price
      </Typography>
      <RHFTextField type="number" fullWidth variant="filled" name="price" />

      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Purcahse Price
      </Typography>
      <RHFTextField fullWidth variant="filled" name="purcahsePrice" type="number" />
      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Purchase limit
      </Typography>
      <RHFTextField fullWidth variant="filled" name="purchaseLimit" type="number" />
      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Barcode
      </Typography>
      <RHFTextField fullWidth variant="filled" name="barcode" />
      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Sku
      </Typography>
      <RHFTextField fullWidth variant="filled" name="sku" />
      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Discount
      </Typography>
      <RHFTextField fullWidth variant="filled" name="discountValue" type="number" />
      <Grid
        container
        mt="20px"
        columnSpacing="20px"
        pb="5px"
        alignItems="flex-end"
        rowGap="20px"
        justifyContent="space-between"
      >
        <Grid item xs={6}>
          <Box
            sx={{
              width: '100%',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '.9rem',
              borderRadius: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              ...(selectedDiscountType === 'fixed_amount' ? activeTab : nonActiveTab),
            }}
            onClick={(e) => setValue('discountType', 'fixed_amount')}
          >
            Fixed Amount
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              width: '100%',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '.9rem',
              borderRadius: '16px',
              fontWeight: 800,
              cursor: 'pointer',
              ...(selectedDiscountType === 'percentage' ? activeTab : nonActiveTab),
            }}
            onClick={(e) => setValue('discountType', 'percentage')}
          >
            Percentage
          </Box>
        </Grid>
      </Grid>
      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem' }}
      >
        Quantity
      </Typography>
      <RHFTextField type="number" fullWidth variant="filled" name="quantity" />
    </>
  );
}
