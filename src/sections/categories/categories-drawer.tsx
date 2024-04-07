'use client';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
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

type Props = {
  categoryDrawerOpen: boolean;
  handleDrawerCloseCommon: Function;
  editCategoryId: string | null;
  loading: any;
  categoriesData: any;
  setCategoriesData: any;
  methods: any;
  onSubmit: any;
  errorMsg: string;
  handleCategoriesData: any;
  handleCategoryLogo: any;
  handleCategoryImage: any;
};
export default function CategoriesDrawer({
  categoryDrawerOpen,
  handleDrawerCloseCommon,
  editCategoryId,
  loading,
  categoriesData,
  setCategoriesData,
  methods,
  errorMsg,
  onSubmit,
  handleCategoriesData,
  handleCategoryLogo,
  handleCategoryImage,
}: Props) {
  const { t } = useLocales();

  return (
    <>
      <CustomDrawer
        open={categoryDrawerOpen}
        onClose={handleDrawerCloseCommon}
        title={editCategoryId ? t('categories.EditCategory') : t('categories.AddNewCategory')}
        actions={
          <Stack alignItems="center" justifyContent="center" spacing="10px">
            <LoadingButton
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{ borderRadius: '30px', textTransform: 'capitalize' }}
              loading={loading}
              onClick={() => methods.handleSubmit(onSubmit as any)()}
            >
              {editCategoryId ? t('categories.Update') : t('categories.Save')}
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
                gap: '6px',
                paddingTop: '12px',
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
                {t('categories.CategoryNameEnglish')}
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={categoriesData?.name?.en || ''}
                settingStateValue={handleCategoriesData}
                name="name.en"
              />

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                {t('categories.CategoryNameArabic')}
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                value={categoriesData?.name?.ar || ''}
                settingStateValue={handleCategoriesData}
                name="name.ar"
              />
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
                value={categoriesData?.bgColor || ''}
                onChange={(e: any) =>
                  setCategoriesData({ ...categoriesData, bgColor: e.target.value })
                }
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
                {categoriesData?.icon ? (
                  <Box width={'100%'} display={'flex'}>
                    <Box
                      display={'flex'}
                      m={1}
                      justifyContent={'center'}
                      alignItems={'center'}
                      width={'80px'}
                      height={'80px'}
                    >
                      <Box
                        component="img"
                        borderRadius={'5px'}
                        src={
                          typeof categoriesData.icon === 'string'
                            ? categoriesData.icon
                            : URL.createObjectURL(categoriesData.icon)
                        }
                        alt=""
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <UploadBox
                            onDrop={handleCategoryLogo}
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
                      <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem' }}
                      >
                        {t('categories.Maximumsizeis5mb')}
                      </Typography>

                      <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {t('categories.YouuseextensionsPNGJPG')}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <UploadBox
                    onDrop={handleCategoryLogo}
                    maxFiles={1}
                    maxSize={5242880}
                    accept={{
                      'image/jpeg': [],
                      'image/png': [],
                    }}
                    placeholder={
                      <Stack spacing={0.5} alignItems="center">
                        <Iconify
                          sx={{ cursor: 'pointer' }}
                          icon="eva:cloud-upload-fill"
                          width={40}
                        />
                        <Typography variant="body2"> {t('categories.UploadLogo')} </Typography>
                      </Stack>
                    }
                    sx={{ flexGrow: 1, height: 'auto', py: 2.5, mb: 3 }}
                  />
                )}
              </Stack>

              <Typography
                mt="20px"
                component="p"
                noWrap
                variant="subtitle2"
                sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
              >
                {t('categories.CategoryImage')}
              </Typography>
              <Stack direction="row" spacing="10px">
                {categoriesData?.image ? (
                  <Box width={'100%'} display={'flex'}>
                    <Box
                      display={'flex'}
                      m={1}
                      justifyContent={'center'}
                      alignItems={'center'}
                      width={'80px'}
                      height={'80px'}
                    >
                      <Box
                        component="img"
                        borderRadius={'5px'}
                        src={
                          typeof categoriesData.image === 'string'
                            ? categoriesData.image
                            : URL.createObjectURL(categoriesData.image)
                        }
                        alt=""
                      />
                    </Box>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <UploadBox
                          onDrop={handleCategoryImage}
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
                      <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.9rem' }}
                      >
                        {t('categories.Maximumsizeis5mb')}
                      </Typography>

                      <Typography
                        mt="0px"
                        component="p"
                        variant="subtitle2"
                        sx={{ opacity: 0.7, fontSize: '.8rem' }}
                      >
                        {t('categories.YouuseextensionsPNGJPG')}
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  <UploadBox
                    onDrop={handleCategoryImage}
                    maxFiles={1}
                    maxSize={5242880}
                    accept={{
                      'image/jpeg': [],
                      'image/png': [],
                    }}
                    placeholder={
                      <Stack spacing={0.5} alignItems="center">
                        <Iconify
                          sx={{ cursor: 'pointer' }}
                          icon="eva:cloud-upload-fill"
                          width={40}
                        />
                        <Typography variant="body2"> {t('categories.Uploadfile')} </Typography>
                      </Stack>
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
