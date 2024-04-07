'use client';
import FormProvider, { RHFSelect, RHFTextField } from 'src/components/hook-form';
import LoadingButton from '@mui/lab/LoadingButton';

// @mui
import Divider from '@mui/material/Divider';
import { Box, Grid, Stack, Typography, Paper, Alert, Tooltip, IconButton } from '@mui/material';
// components
import { CustomDrawer } from 'src/components/drawer';
import { useLocales } from 'src/locales';
import RHFColorSelector from 'src/components/hook-form/rhf-color-selector';
import { FieldLoading } from '../brand/loading';
import { UploadBox } from 'src/components/upload';
import Iconify from 'src/components/iconify/iconify';
import MenuItem from '@mui/material/MenuItem';

type Props = {
  subcategoryDrawerOpen: boolean;
  handleDrawerCloseCommon: Function;
  editSubCategoryId: string | null;
  loading: any;
  SubcategoriesData: any;
  setSubCategoriesData: any;
  methods: any;
  onSubmit: any;
  errorMsg: string;
  handleSubCategoriesData: any;
  handleSubCategoryLogo: any;
  handleSubCategoryImage: any;
  onClick: any;
  handleChangeMySubCat: any;
  subCatArray: any;
  bgColor: any;
  setColor: any;
};
export default function SubCategoriesDrawer({
  subcategoryDrawerOpen,
  handleDrawerCloseCommon,
  editSubCategoryId,
  loading,
  SubcategoriesData,
  setSubCategoriesData,
  methods,
  errorMsg,
  onSubmit,
  handleSubCategoriesData,
  handleSubCategoryLogo,
  handleSubCategoryImage,
  onClick,
  handleChangeMySubCat,
  subCatArray,
  bgColor,
  setColor,
}: Props) {
  const { t } = useLocales();

  return (
    <>
      <CustomDrawer
        open={subcategoryDrawerOpen}
        onClose={handleDrawerCloseCommon}
        title={
          editSubCategoryId ? t('categories.EditSubcategory') : t('categories.AddNewSubcategory')
        }
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              loading={loading}
              onClick={onClick}
              sx={{ borderRadius: '30px', textTransform: 'capitalize' }}
            >
              {editSubCategoryId ? t('categories.Update') : t('categories.Save')}
            </LoadingButton>
          </Stack>
        }
      >
        {loading === true ? (
          <>
            <FieldLoading />
            <FieldLoading />
            <FieldLoading />
          </>
        ) : (
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <Divider flexItem />
            {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

            <Box
              width="100%"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '2px',
                marginTop: '12px',
              }}
            >
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{
                  opacity: 0.7,
                  fontSize: '.9rem',
                  maxWidth: { xs: '120px', md: '218px' },
                }}
              >
                {t('categories.SubcategoryNameEnglish')}
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={SubcategoriesData?.name?.en || ''}
                settingStateValue={handleSubCategoriesData}
                name="name.en"
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                {t('categories.SubcategoryNameArabic')}
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={SubcategoriesData?.name?.ar || ''}
                settingStateValue={handleSubCategoriesData}
                name="name.ar"
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                {t('categories.Category')}
              </Typography>

              <RHFSelect
                fullWidth
                variant="filled"
                name="category"
                value={SubcategoriesData?.category || ''}
                settingStateValue={handleChangeMySubCat}
              >
                {subCatArray.length > 0 &&
                  subCatArray.map((item: any, i: any) => (
                    <MenuItem key={i} value={item._id}>
                      {item?.name?.en || item?.name || ''}
                    </MenuItem>
                  ))}
              </RHFSelect>
              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                {t('categories.BackgroundColoroptional')}
              </Typography>

              <RHFColorSelector
                value={bgColor || ''}
                onChange={(e: any) => {
                  const bgColor = e.target.value;
                  setColor(bgColor);
                  setSubCategoriesData((prev: any) => ({
                    ...prev,
                    bgColor,
                  }));
                }}
                variant="filled"
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                {t('categories.logo')}
              </Typography>
              <Stack direction="row" spacing="10px">
                {SubcategoriesData?.icon ? (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      gap: '10px',
                      flexDirection: 'row',
                      position: 'relative',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      width={'100px'}
                      component="img"
                      borderRadius={'5px'}
                      src={
                        typeof SubcategoriesData.icon === 'string'
                          ? SubcategoriesData.icon
                          : URL.createObjectURL(SubcategoriesData.icon)
                      }
                      alt="subCategory"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <UploadBox
                        onDrop={handleSubCategoryLogo}
                        maxFiles={1}
                        maxSize={5242880}
                        accept={{
                          'image/jpeg': [],
                          'image/png': [],
                        }}
                        placeholder={
                          <Stack spacing={0.5} alignItems="center">
                            <IconButton>
                              <Iconify color="text.secondary" icon="lucide:edit" width={25} />
                            </IconButton>{' '}
                          </Stack>
                        }
                        sx={{
                          border: 'unset',
                          borderRadius: '50px',
                          width: '40px',
                          height: '40px',
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <UploadBox
                    onDrop={handleSubCategoryLogo}
                    maxFiles={1}
                    maxSize={5242880}
                    accept={{
                      'image/jpeg': [],
                      'image/png': [],
                    }}
                    placeholder={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          flexDirection: 'column',
                        }}
                      >
                        <Iconify
                          sx={{ cursor: 'pointer' }}
                          icon="uil:upload"
                          style={{ color: '#8688A3' }}
                        />
                        <span style={{ color: '#8688A3', fontSize: '.7rem' }}>Upload Image</span>
                      </Box>
                    }
                    sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
                  />
                )}
              </Stack>

              <Typography
                my="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                {t('categories.CategoryImage')}
              </Typography>
              <Stack direction="row" spacing="10px" alignItems="center">
                {SubcategoriesData?.image ? (
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'start',
                      gap: '10px',
                      flexDirection: 'row',
                      position: 'relative',
                      borderRadius: '10px',
                      overflow: 'hidden',
                    }}
                  >
                    <Box
                      component="img"
                      width={'100px'}
                      borderRadius={'5px'}
                      sx={{
                        display: 'flex',
                        justifyContent: 'end',
                      }}
                      src={
                        typeof SubcategoriesData.image === 'string'
                          ? SubcategoriesData.image
                          : URL.createObjectURL(SubcategoriesData.image)
                      }
                      alt="subCategory"
                    />
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <UploadBox
                        onDrop={handleSubCategoryImage}
                        maxFiles={1}
                        maxSize={5242880}
                        accept={{
                          'image/jpeg': [],
                          'image/png': [],
                        }}
                        placeholder={
                          <Stack spacing={0.5} alignItems="center">
                            <IconButton>
                              <Iconify color="text.secondary" icon="lucide:edit" width={25} />
                            </IconButton>{' '}
                          </Stack>
                        }
                        sx={{
                          border: 'unset',
                          borderRadius: '50px',
                          width: '40px',
                          height: '40px',
                        }}
                      />
                    </Box>
                  </Box>
                ) : (
                  <UploadBox
                    onDrop={handleSubCategoryImage}
                    maxFiles={1}
                    maxSize={5242880}
                    accept={{
                      'image/jpeg': [],
                      'image/png': [],
                    }}
                    placeholder={
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          flexDirection: 'column',
                        }}
                      >
                        <Iconify
                          sx={{ cursor: 'pointer' }}
                          icon="uil:upload"
                          style={{ color: '#8688A3' }}
                        />
                        <span style={{ color: '#8688A3', fontSize: '.7rem' }}>
                          {t('categories.upload_image')}
                        </span>
                      </Box>
                    }
                    sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
                  />
                )}
              </Stack>
            </Box>
          </FormProvider>
        )}
      </CustomDrawer>
    </>
  );
}
