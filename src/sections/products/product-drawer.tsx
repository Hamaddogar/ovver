'use client';
import FormProvider from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

// @mui
import Divider from '@mui/material/Divider';
import { Box, Button, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { CustomDrawer } from 'src/components/drawer';
import { useLocales } from 'src/locales';

export default function ProductDrawer({
  openCreateProduct,
  onClose,
  createProductSections,
  isSubmitting,
  handleNextInputs,
  methods,
  onSubmit,
  renderDetails,
  setcreateProductSections,
}: any) {
  const { t } = useLocales();
  return (
    <CustomDrawer
      open={openCreateProduct}
      onClose={onClose}
      title={t('products.add_product')}
      actions={
        <Stack
          alignItems="center"
          justifyContent="center"
          spacing="10px"
          textTransform="capitalize"
        >
          {createProductSections !== 4 ? (
            // Render only the "Next" button for the first section
            <>
              <LoadingButton
                fullWidth
                variant="soft"
                color="success"
                size="large"
                loading={isSubmitting}
                onClick={handleNextInputs}
                sx={{ borderRadius: '30px' }}
              >
                {t('products.next')}
              </LoadingButton>
              {createProductSections > 0 && (
                <Button
                  fullWidth
                  variant="outlined"
                  color="inherit"
                  size="large"
                  onClick={() => setcreateProductSections((prev: any) => prev - 1)} // Adjust this function as needed to go back to the first section
                  sx={{ borderRadius: '30px', marginLeft: '10px' }}
                >
                  {t('products.back')}
                </Button>
              )}
            </>
          ) : (
            // Render "Submit/Update" and "Back" buttons for other sections
            <>
              <LoadingButton
                fullWidth
                variant="soft"
                color="success"
                size="large"
                loading={isSubmitting}
                onClick={onSubmit}
                sx={{ borderRadius: '30px' }}
              >
                {t('common.save')}
              </LoadingButton>
              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                size="large"
                onClick={() => setcreateProductSections((prev: any) => prev - 1)} // Adjust this function as needed to go back to the first section
                sx={{ borderRadius: '30px', marginLeft: '10px' }}
              >
                {t('products.back')}
              </Button>
            </>
          )}
        </Stack>
      }
    >
      <Stepper activeStep={createProductSections} alternativeLabel>
        {[
          t('prodicts.step_number', { stepNumber: 1 }),
          t('prodicts.step_number', { stepNumber: 2 }),
          t('prodicts.step_number', { stepNumber: 3 }),
          t('prodicts.step_number', { stepNumber: 4 }),
          t('prodicts.step_number', { stepNumber: 5 }),
        ]?.map((label: any, index: number) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step sx={{ textTransform: 'capitalize' }} key={label} {...stepProps}>
              <StepLabel sx={{ width: '55px' }} {...labelProps}>
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Divider flexItem />
        <Box width="100%">{renderDetails()}</Box>
      </FormProvider>
    </CustomDrawer>
  );
}
