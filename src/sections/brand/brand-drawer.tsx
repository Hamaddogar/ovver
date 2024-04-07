'use client';
import FormProvider, {
  RHFImageUpload,
  RHFColorSelector,
  RHFTextField,
} from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

// @mui
import Divider from '@mui/material/Divider';
import { Box, Stack, Typography, Alert, TextField, InputAdornment } from '@mui/material';
// components
import { FieldLoading } from './loading';
import { CustomDrawer } from 'src/components/drawer';
import { useLocales } from 'src/locales';

type Props = {
  brandDrawerOpen: boolean;
  handleDrawerCloseCommon: Function;
  editBrandId: string | null;
  loading: any;
  brandsData: any;
  setBrandsData: any;
  methods: any;
  onSubmit: any;
  errorMsg: string;
  handleBrandData: any;
  languages: { value: string; label: string }[];
};

export default function BrandDrawer({
  brandDrawerOpen,
  handleDrawerCloseCommon,
  editBrandId,
  loading,
  brandsData,
  setBrandsData,
  methods,
  errorMsg,
  onSubmit,
  handleBrandData,
  languages,
}: Props) {
  const { t } = useLocales();
  console.log('bgColor: ', brandsData?.bgColor);
  return (
    <CustomDrawer
      open={brandDrawerOpen}
      onClose={handleDrawerCloseCommon}
      title={editBrandId ? t('brand.edit_brand') : t('brand.add_new_brand')}
      actions={
        <Stack alignItems="center" justifyContent="center" spacing="10px">
          <LoadingButton
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            sx={{ borderRadius: '30px', textTransform: 'capitalize' }}
            loading={loading.createBrand || loading.editBrand}
            onClick={() => methods.handleSubmit(onSubmit as any)()}
          >
            {editBrandId ? t('brand.update') : t('brand.save')}
          </LoadingButton>
        </Stack>
      }
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Divider flexItem />
        {loading.fetchOneBrand ? (
          <>
            <FieldLoading />
            <FieldLoading />
            <FieldLoading />
          </>
        ) : (
          <>
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
            <Box width="100%">
              {/* ========== NAME FIELDS ========== */}
              {languages.map((language, i) => {
                return (
                  <Box key={i}>
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
                        maxWidth: '218px',
                      }}
                    >
                      {t(`brand.name_${language.value}`)}
                    </Typography>
                    <RHFTextField
                      fullWidth
                      variant="filled"
                      value={brandsData?.name?.[language.value] || ''}
                      settingStateValue={handleBrandData}
                      name={`name.${language.value}`}
                    />
                  </Box>
                );
              })}
              {/* ========== BACKGROUND COLOR ========== */}
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
                  maxWidth: '218px',
                }}
              >
                {t('brand.bg_color')}
              </Typography>
              <RHFColorSelector
                value={brandsData?.bgColor}
                onChange={(e) => setBrandsData({ ...brandsData, bgColor: e.target.value })}
                variant="filled"
              />
              {/* ========== IMAGE ========== */}
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{
                  marginTop: 2,
                  marginBottom: 0.5,
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                  fontSize: '.9rem',
                  maxWidth: '218px',
                }}
              >
                {t('brand.image')}
              </Typography>
              <RHFImageUpload
                image={brandsData?.image}
                handleImageChange={(file: File[]) => {
                  setBrandsData((prev: any) => ({
                    ...prev,
                    image: file[0],
                  }));
                }}
                acceptedTypes={['jpeg', 'png']}
                placeholderText={t('brand.upload_image')}
                name="image"
              />
              {/* ========== ICON ========== */}
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{
                  marginTop: 2,
                  marginBottom: 0.5,
                  color: 'text.secondary',
                  textTransform: 'capitalize',
                  fontSize: '.9rem',
                  maxWidth: '218px',
                }}
              >
                {t('brand.icon')}
              </Typography>
              <RHFImageUpload
                image={brandsData?.icon}
                handleImageChange={(file: File[]) => {
                  setBrandsData((prev: any) => ({
                    ...prev,
                    icon: file[0],
                  }));
                }}
                acceptedTypes={['jpeg', 'png']}
                placeholderText={t('brand.upload_icon')}
                name="icon"
              />
            </Box>
          </>
        )}
      </FormProvider>
    </CustomDrawer>
  );
}
