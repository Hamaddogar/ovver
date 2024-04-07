/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// @mui
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography } from '@mui/material';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { BottomActions } from 'src/components/bottom-actions';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import NavigatorBar from 'src/components/NavigatorBar';
import { RoleBasedGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';

import type { AppDispatch } from 'src/redux/store/store';
import {
  createBrand,
  deleteBrand,
  editBrand,
  fetchAllBrands,
  fetchOneBrand,
  setBrand,
  sortBrand,
} from 'src/redux/store/thunks/brand';
import BrandPaper from '../brand-paper';
import Iconify from 'src/components/iconify/iconify';

import BrandDrawer from '../brand-drawer';
import { PaperLoading } from '../loading';
import { allLangs, useLocales } from 'src/locales';
import { LoadingButton } from '@mui/lab';
import SearchSort from '../search-sort';
import { TableNoData } from 'src/components/table';
import BrandsFiltersResult from '../brands-filters-result';

// ----------------------------------------------------------------------
export type BrandSorts = 'custom' | 'createdAt' | '-createdAt';

export default function BrandsView() {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useLocales();
  const { verifyPermission } = useAuthContext();
  const settings = useSettingsContext();
  const confirm = useBoolean();
  const { enqueueSnackbar } = useSnackbar();

  const initialPageSize = 5;
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<BrandSorts>('custom');
  const [editBrandId, setEditBrandId] = useState<string | null>(null);
  const [removeData, setRemoveData] = useState<string | null>(null);
  const [brandDrawer, setBrandDrawer] = useState<boolean>(false);
  const [brandsData, setBrandsData] = useState<any>(null);
  // const [bgColor, setBgColor] = useState('#ffffff');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const { builder, loading: builderLoading } = useSelector((state: any) => state.builder);
  const { list, errors, brand, loading, count } = useSelector((state: any) => state.brands);

  const languages =
    builder?.appLanguage.map((lng: string) => {
      return { value: lng, label: allLangs.find((l) => l.value === lng)?.label };
    }) || [];
  let nameShape: any = {};
  languages.forEach((lang: any) => {
    nameShape[lang.value] = Yup.string().required(t(`brand.${lang.value}_name_required`));
  });
  const BrandSchema = Yup.object().shape({
    name: Yup.object().shape(nameShape),
  });

  const methods = useForm({
    resolver: yupResolver(BrandSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  // handling fetch events
  const [actualBrands, setActualBrands] = useState([]);
  const fetchBrands = () => {
    dispatch(fetchAllBrands({ pageNumber, pageSize, query, sort })).then((res) => {
      setActualBrands(res?.payload?.data?.data);
      // setBrands(res?.payload?.data?.data)
      // console.log('res', res)
    });
  };
  const handleSortChange = (val: BrandSorts) => {
    setSort(val);
  };
  // handling submit events
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editBrandId) {
        await handleEditBrand();
      } else {
        await handleCreateBrand();
      }
    } catch (err) {
      console.error(err);
      reset();
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });

  // reseting removeData value
  useEffect(() => {
    if (!confirm.value) {
      setRemoveData(null);
    }
  }, [confirm]);

  // reseting drawer data
  useEffect(() => {
    if (brand && Object.entries(brand).length > 0) {
      setBrandsData(brand);
      // if (brand?.bgColor) {
      //   setBgColor(brand.bgColor);
      // }
      if (brand?.name) {
        Object.entries(brand).forEach(([fieldName, nestedData]: any) => {
          if (fieldName === 'name') {
            Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
              const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
              methods.setValue(fullFieldName as 'name.en' | 'name.ar', value);
            });
          }
        });
      }
    } else {
      setBrandsData(null);
      reset();
    }
  }, [brand, reset]);

  // ----------------------------- Brand CRUD -----------------------------
  const handleCreateBrand = async () => {
    const FormValues = new FormData();
    Object.keys(brandsData.name).forEach((key) => {
      const value = brandsData.name[key];
      FormValues.append(`name[${key}]`, value);
    });
    if (brandsData?.bgColor) {
      FormValues.append(`bgColor`, brandsData.bgColor);
    }
    if (!!brandsData.image && typeof brandsData.image !== 'string') {
      FormValues.append('image', brandsData.image);
    }
    if (!!brandsData.icon && typeof brandsData.icon !== 'string') {
      FormValues.append('icon', brandsData.icon);
    }

    await dispatch(createBrand(FormValues)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setBrandsData(null);
        fetchBrands();
        setBrandDrawer(false);
        enqueueSnackbar(t('brand.created'), { variant: 'success' });
      } else {
        enqueueSnackbar(`${t('common.error')} ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleEditBrand = async () => {
    const FormValues = new FormData();
    Object.keys(brandsData.name).forEach((key) => {
      const value = brandsData.name[key];
      if (key !== 'localized') {
        FormValues.append(`name[${key}]`, value);
      }
    });
    if (brandsData?.bgColor) {
      FormValues.append(`bgColor`, brandsData.bgColor);
    }
    if (!!brandsData.image && typeof brandsData.image !== 'string') {
      FormValues.append('image', brandsData.image);
    }
    if (!!brandsData.icon && typeof brandsData.icon !== 'string') {
      FormValues.append('icon', brandsData.icon);
    }

    dispatch(editBrand({ brandId: editBrandId, data: FormValues })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setBrandsData(null);
        fetchBrands();
        setBrandDrawer(false);

        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }
    });
  };
  const handleRemoveBrand = () => {
    dispatch(deleteBrand(removeData)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        fetchBrands();
        enqueueSnackbar(t('brand.deleted'), { variant: 'success' });

        confirm.onFalse();
      } else {
        enqueueSnackbar(`${'common.error'} ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  // ----------------------------------------------------------
  const handleBrandData = (e: any) => {
    const { name, value } = e.target;
    const language = name.includes('.') ? name.split('.')[1] : undefined;

    setBrandsData((prevData: any) => ({
      ...prevData,
      name: {
        ...prevData?.name,
        ...(language === 'en' || language === 'ar' ? { [language]: value } : {}),
      },
    }));
  };

  // ----------------------------- Handle Brand Drawer! -----------------------------
  const toggleDrawerCommon =
    (id: any = null) =>
    () => {
      setBrandDrawer((pv) => !pv);
      setEditBrandId(id);
      if (id) {
        dispatch(fetchOneBrand(id));
      } else {
        setBrandsData({});
        dispatch(setBrand({}));
      }
    };
  const handleDrawerCloseCommon = () => () => {
    setBrandDrawer(false);
  };

  // ----------------------------- Drag! -----------------------------
  const [listItems, setListItems] = useState(actualBrands);
  useEffect(() => {
    setListItems(actualBrands);
  }, [actualBrands]);

  const handleOnDragEnd = async (result: any) => {
    const draggedBrand: any = listItems?.[result.source.index];
    if (sort !== 'custom') {
      enqueueSnackbar(t('brand.sort_error'), { variant: 'error' });
    } else {
      await dispatch(
        sortBrand({ brandId: draggedBrand?._id, data: { sortIndex: result.destination.index + 1 } })
      ).then((res) => {
        if (!result.destination) return;
        const items = Array.from(listItems);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setListItems(items);
      });
    }
  };

  // ----------------------------- permissions -----------------------------
  const [allowAction, setAllowAction] = useState<{ edit: boolean; remove: boolean }>({
    edit: false,
    remove: false,
  });
  const getPermission = async (moduleName: string, permissionName: string): Promise<void> => {
    try {
      const data = { permission: permissionName };
      const responseData = await verifyPermission?.(data);

      if (moduleName === 'edit') {
        setAllowAction((prevAllowAction) => ({ ...prevAllowAction, edit: responseData }));
      } else if (moduleName === 'remove') {
        setAllowAction((prevAllowAction) => ({ ...prevAllowAction, remove: responseData }));
      }
    } catch (error) {
      console.error(`Error while checking ${moduleName} permission:`, error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      await getPermission('edit', 'UPDATE_BRAND_BY_ID');
      await getPermission('remove', 'DELETE_BRAND_BY_ID');
    };
    fetchData();
  }, []);

  // ----------------------------- refetch user changes -----------------------------
  const [initialRender, setInitialRender] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (initialRender) {
      setInitialRender(false);
      fetchBrands();
    } else {
      if (query) {
        timeoutId = setTimeout(() => {
          fetchBrands();
        }, 700); // delay of 0.7 seconds
      } else {
        fetchBrands();
      }
    }

    return () => {
      clearTimeout(timeoutId); // cleanup on unmount or query change
    };
  }, [query, pageNumber, pageSize, sort, builder]);

  return (
    <Container maxWidth={false}>
      <RoleBasedGuard returnBoolean hasContent permission="GET_BRANDS">
        <Stack direction="row">
          <Grid
            container
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            {/* ========== TITLE ========== */}
            <Grid item xs="auto">
              <CustomCrumbs
                heading={t('brand.brands')}
                crums={false}
                sx={{ fontWeight: 'medium' }}
              />
            </Grid>
            {/* ========== ACTIONS / add new ========== */}
            <RoleBasedGuard permission="CREATE_BRAND">
              <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'end' }}>
                <BottomActions>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                    spacing="10px"
                    sx={{ width: { xs: '100%', sm: 'fit-content' } }}
                  >
                    <Button
                      startIcon={<Iconify icon="typcn:plus" />}
                      fullWidth
                      sx={{ borderRadius: '30px', textTransform: 'capitalize', py: 1, px: 5 }}
                      component="button"
                      variant="contained"
                      color="primary"
                      onClick={toggleDrawerCommon()}
                    >
                      {t('brand.add_new_brand')}
                    </Button>
                  </Stack>
                </BottomActions>
              </Grid>
            </RoleBasedGuard>

            {/* ========== SEARCH AND SORT ========== */}
            <Grid item xs={12}>
              <Box>
                <SearchSort
                  sort={sort}
                  onChange={handleSortChange}
                  query={query}
                  setQuery={setQuery}
                />
                {query && <BrandsFiltersResult setQuery={setQuery} sx={{ p: 2.5, pt: 0 }} />}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Divider flexItem sx={{ my: '20px' }} />
            </Grid>

            {/* ========== MAIN BRANDS VIEW ========== */}
            {/* ========== Brands View Header ========== */}
            <Grid item xs={12} sm={6}>
              <Typography component="h5" variant="h5" className="first-letter-capitalize">
                {t('brand.you_have', { var: count })}
              </Typography>
            </Grid>
            {/* ========== BRAND LIST ========== */}
            <Box sx={{ minHeight: '60vh', width: '100%' }}>
              {loading.fetchAllBrands || builderLoading ? (
                <>
                  <PaperLoading />
                  <PaperLoading />
                  <PaperLoading />
                </>
              ) : count > 0 ? (
                <DragDropContext onDragEnd={handleOnDragEnd}>
                  <Droppable droppableId="items">
                    {(provided) => (
                      <Grid
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        item
                        xs={12}
                        container
                        sx={{ mt: '20px' }}
                        spacing={2}
                      >
                        {listItems?.map((brand: any, index: number) => (
                          <BrandPaper
                            key={brand._id}
                            brand={brand}
                            index={index}
                            allowAction={allowAction}
                            setRemoveData={setRemoveData}
                            confirm={confirm}
                            toggleDrawerCommon={toggleDrawerCommon}
                          />
                        ))}
                        {provided.placeholder}
                      </Grid>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <TableNoData
                  notFound={true}
                  sx={{
                    width: '300px',
                    borderRadius: 1.5,
                    border: `dashed 1px`,
                    borderColor: 'text.disabled',
                  }}
                />
              )}
            </Box>

            {/* ========== Brand Pagination ========== */}
            <Stack
              sx={{
                width: '100%',
                display: 'flex',
                marginTop: '1rem',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {Math.ceil(count / pageSize) > 1 && (
                <Button
                  variant="soft"
                  sx={{ px: 3, marginInlineStart: 'auto', textTransform: 'capitalize' }}
                  onClick={() => {
                    setPageSize((prev) => prev + initialPageSize);
                  }}
                >
                  {t('common.load_more')}
                </Button>
                // <NavigatorBar
                //   setPageNumber={setPageNumber}
                //   pageSize={pageSize}
                //   itemsLength={count}
                // />
              )}
            </Stack>
          </Grid>

          {/* ========== Brand Drawer / add and edit Item ========== */}
          <BrandDrawer
            languages={languages}
            brandDrawerOpen={brandDrawer}
            handleDrawerCloseCommon={handleDrawerCloseCommon}
            editBrandId={editBrandId}
            loading={loading}
            brandsData={brandsData}
            setBrandsData={setBrandsData}
            methods={methods}
            onSubmit={onSubmit}
            errorMsg={errorMsg}
            handleBrandData={handleBrandData}
          />
        </Stack>
        {/* ========== Brands Item ========== */}
        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          noCancel={false}
          title={t('brand.delete_btn')}
          content={t('brand.delete_text')}
          action={
            <LoadingButton
              loading={loading.deleteBrand}
              fullWidth
              color="error"
              variant="soft"
              size="large"
              onClick={handleRemoveBrand}
              sx={{ borderRadius: '30px' }}
            >
              {t('brand.delete_btn')}
            </LoadingButton>
          }
        />
      </RoleBasedGuard>
    </Container>
  );
}
