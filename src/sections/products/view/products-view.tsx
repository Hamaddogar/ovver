/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useState } from 'react';

import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';

// @mui
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';
import { RoleBasedGuard } from 'src/auth/guard';
import { BottomActions } from 'src/components/bottom-actions';
import ProductTableToolbar from '../product-table-toolbar';
import { useCreateProductMutation, useGetAllProductsQuery } from 'src/redux/store/services/api';
import { TabContext, TabPanel } from '@mui/lab';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import Product from './product';
import { useSelector } from 'react-redux';
import { RootState } from 'src/redux/store/store';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { StepFive, StepFour, StepOne, StepThree, StepTwo } from '../steps';
import ProductDrawer from '../product-drawer';
import Iconify from 'src/components/iconify/iconify';
import { useLocales } from 'src/locales';

export const activeTab = {
  color: '#0F1349',
  background: 'rgb(209, 255, 240)',
  border: '2px solid #1AF9B3',
};
export const nonActiveTab = {
  color: '#8688A3',
  background: 'rgb(245, 245, 248)',
};

// components

export const preparationTimeUnits = [
  {
    name: 'M',
    value: 'minuits',
  },
  {
    name: 'H',
    value: 'hours',
  },
];

export const selectionTypes = ['multiple', 'single'];

export const ProductSchema = Yup.object().shape({
  name: Yup.object().shape({
    en: Yup.string().required(),
    es: Yup.string().required(),
    fr: Yup.string().required(),
    tr: Yup.string().required(),
    ar: Yup.string().required(),
  }),
  description: Yup.object().shape({
    en: Yup.string().required(),
    es: Yup.string().required(),
    fr: Yup.string().required(),
    tr: Yup.string().required(),
    ar: Yup.string().required(),
  }),
  categoryId: Yup.string(),
  subcategoryId: Yup.string(),
  brandId: Yup.string(),
  sort: Yup.number(),
  preparationTime: Yup.number(),
  preparationTimeUnit: Yup.string(),
  ingredients: Yup.array().of(Yup.string()),
  seasons: Yup.array().of(Yup.string()),
  styles: Yup.array().of(Yup.string()),
  occasions: Yup.array().of(Yup.string()),
  fit: Yup.string(),
  calories: Yup.string(),
  price: Yup.number().required(),
  purcahsePrice: Yup.number(),
  purchaseLimit: Yup.number(),
  quantity: Yup.number(),
  barcode: Yup.string(),
  sku: Yup.string(),
  discountType: Yup.string(),
  discountValue: Yup.number(),
  varients: Yup.array().of(
    Yup.object().shape({
      groupName: Yup.object().shape({
        en: Yup.string().required(),
        ar: Yup.string().required(),
        tr: Yup.string().required(),
        es: Yup.string().required(),
        fr: Yup.string().required(),
        de: Yup.string().required(),
      }),
      selectionType: Yup.string(),
      required: Yup.boolean(),
      minimum: Yup.number(),
      maximum: Yup.number(),
      allowMoreQuantity: Yup.boolean(),
      varientRows: Yup.array()
        .of(
          Yup.object().shape({
            name: Yup.object().shape({
              en: Yup.string().required(),
              ar: Yup.string().required(),
              tr: Yup.string().required(),
              es: Yup.string().required(),
              fr: Yup.string().required(),
              de: Yup.string().required(),
            }),
            price: Yup.number(),
            priceAfterDiscount: Yup.number(),
            sku: Yup.string(),
            barcode: Yup.string(),
            quantity: Yup.number(),
          })
        )
        .required(),
    })
  ),
  allBranches: Yup.boolean(),
  avalibleForMobile: Yup.boolean(),
  avalibleForWebsite: Yup.boolean(),
});

export default function OrdersListView() {
  const { t } = useLocales();
  const selectedDomain = useSelector((state: RootState) => state?.selectedDomain?.data);
  const languages = ['en', 'ar', 'de', 'tr', 'es', 'fr'];
  const categoryState = useSelector((state: RootState) => state.category);
  // console.log('CategoryState: ', categoryState);
  const brandState = useSelector((state: RootState) => state.brands);
  const { enqueueSnackbar } = useSnackbar();
  const getAllProductsRes = useGetAllProductsQuery(selectedDomain?.domain);
  const [addProductReq, addProductRes] = useCreateProductMutation();
  const [createProductSections, setcreateProductSections] = useState(0);
  const [openCreateProduct, setOpenCreateProduct]: any = useState(false);
  const [openProductName, setOpenProductName]: any = useState(false);
  const [openProductDescription, setOpenProductDescription]: any = useState(false);
  const [productData, setProductData] = useState<any>(null);
  const [ingrediants, setIngrediants] = useState([0]);
  const [seasons, setSeason] = useState([0]);
  const [styles, setStyles] = useState([0]);
  const [occasion, setOccasion] = useState([0]);
  const [variants, setVariants] = useState([0]);
  const [variantsRows, setVariantsRow] = useState([0]);

  const handleDrawerClose = () => () => {
    setOpenCreateProduct(false);
  };

  const methods = useForm({
    resolver: yupResolver(ProductSchema),
    defaultValues: {
      name: {
        en: '',
        es: '',
        fr: '',
        tr: '',
        ar: '',
      },
      description: {
        en: '',
        es: '',
        fr: '',
        tr: '',
        ar: '',
      },
      categoryId: categoryState.list[0] && categoryState.list[0]._id,
      subcategoryId: categoryState?.subCatList[0] && categoryState?.subCatList[0]?._id,
      quantity: 0,
      brandId: brandState?.list[0]?._id,
      sort: 0, // assuming sort starts from 0 or any number you prefer
      preparationTime: 0, // assuming default preparation time as 0
      preparationTimeUnit: preparationTimeUnits[0].value, // specify default unit if there's one
      ingredients: [], // empty array indicating no default ingredients
      seasons: [], // similarly, an empty array for seasons
      styles: [],
      occasions: [],
      fit: '',
      calories: '',
      price: 0, // assuming default price as 0 or any minimum value
      purcahsePrice: 0, // assuming default purchase price as 0 or any minimum value
      purchaseLimit: 0, // assuming no limit by default
      barcode: '',
      sku: '',
      discountType: '',
      discountValue: 0,
      varients: [],
      allBranches: false,
      avalibleForMobile: false,
      avalibleForWebsite: false,
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
    getValues,
    watch,
    setValue,
  } = methods;

  const selectedDiscountType = watch('discountType');

  const onSubmit = async () => {
    const data = getValues();
    const formData = new FormData();
    productData?.images?.forEach((el: any, index: number) => {
      formData.append(`images`, el as any);
    });
    selectedDomain?.appLanguage?.forEach((el: string) => {
      formData.append(`title[${el}]`, data.name[el as keyof typeof data.name]);
      formData.append(`description[${el}]`, data.description[el as keyof typeof data.description]);
    });
    if (data.categoryId) {
      formData.append('categoryId', data.categoryId);
    }
    if (data.subcategoryId) {
      formData.append('subcategoryId', data.subcategoryId);
    }
    if (data.brandId) {
      formData.append('brandId', data.brandId);
    }
    formData.append('sort', `${data.sort}`);
    formData.append('preparationTime', `${data.preparationTime}`);
    formData.append('preparationTimeUnit', `${data.preparationTimeUnit}`);
    data.ingredients?.forEach((el: any, index: any) => {
      formData.append(`ingredients[${index}]`, `${el}`);
    });
    data.seasons?.forEach((el: any, index: any) => {
      formData.append(`season[${index}]`, `${el}`);
    });
    data.styles?.forEach((el: any, index: any) => {
      formData.append(`style[${index}]`, `${el}`);
    });
    data.occasions?.forEach((el: any, index: any) => {
      formData.append(`occasion[${index}]`, `${el}`);
    });
    formData.append(`quantity`, `${data.quantity}`);
    formData.append(`sellPrice`, `${data.price}`);
    formData.append(`purchasePrice`, `${data.purcahsePrice}`);
    formData.append(`purchaseLimit`, `${data.purchaseLimit}`);
    formData.append(`barcode`, `${data.barcode}`);
    formData.append(`sku`, `${data.sku}`);
    formData.append(`discountType`, `${data.discountType}`);
    formData.append(`discountValue`, `${data.discountValue}`);
    formData.append(`isAvailableOnAllBranhces`, `${data.allBranches}`);
    formData.append(`publish_app`, `${data.avalibleForMobile}`);
    formData.append(`publish_website`, `${data.avalibleForWebsite}`);
    data.varients?.forEach((el: any, index: any) => {
      formData.append(`varients[${index}]`, JSON.stringify(el));
    });

    await addProductReq({ domain: selectedDomain?.domain, data: formData })
      .unwrap()
      .then(() => {
        reset();
        setOpenCreateProduct(false);
        setcreateProductSections(0);
        setProductData(null);
      });
  };

  const handleNextInputs = async () => {
    setcreateProductSections((prev) => prev + 1);
  };

  const handleAddImage = (acceptedFiles: any) => {
    // Assuming productData.images is an array of the current images
    const currentImageCount = productData?.images?.length || 0;
    const maxFilesAllowed = 5;
    const availableSlots = maxFilesAllowed - currentImageCount;

    if (acceptedFiles.length > availableSlots) {
      enqueueSnackbar('Cannot Add More Than 5 images !', { variant: 'error' });
      acceptedFiles = acceptedFiles.slice(0, availableSlots);
    }
    setProductData((prevData: any) => ({
      ...prevData,
      images: [...(prevData?.images || []), ...acceptedFiles],
    }));
  };
  const deleteImage = (imageIndex: any) => {
    setProductData((prevData: any) => {
      const filteredImages = prevData.images.filter((_: any, index: any) => index !== imageIndex);
      return {
        ...prevData,
        images: filteredImages,
      };
    });
  };

  const renderDetails = () => {
    switch (createProductSections) {
      case 0:
        return (
          <StepOne
            openProductName={openProductName}
            setOpenProductName={setOpenProductName}
            languages={languages}
            productData={productData}
            deleteImage={deleteImage}
            handleAddImage={handleAddImage}
            openProductDescription={openProductDescription}
            setOpenProductDescription={setOpenProductDescription}
            categoryState={categoryState}
            brandState={brandState}
            preparationTimeUnits={preparationTimeUnits}
            ingrediants={ingrediants}
            setIngrediants={setIngrediants}
            seasons={seasons}
            setSeason={setSeason}
            styles={styles}
            setStyles={setStyles}
            occasion={occasion}
            setOccasion={setOccasion}
          />
        );
      case 1:
        return (
          <StepTwo
            selectedDiscountType={selectedDiscountType}
            setValue={setValue}
            activeTab={activeTab}
            nonActiveTab={nonActiveTab}
          />
        );
      case 2:
        return (
          <StepThree
            variants={variants}
            setVariants={setVariants}
            selectedDomain={selectedDomain}
            selectionTypes={selectionTypes}
            variantsRows={variantsRows}
            setVariantsRow={setVariantsRow}
          />
        );
      case 3:
        return <StepFour />;
      case 4:
        return <StepFive />;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={false}>
      <RoleBasedGuard hasContent permission="GET_PRODUCTS">
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          <Grid item xs={12} md="auto">
            <CustomCrumbs heading="Products" crums={false} />
          </Grid>
          <RoleBasedGuard permission="CREATE_PRODUCT">
            <Grid item xs={12} md={5}>
              <BottomActions>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  alignItems="center"
                  justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                  spacing="20px"
                  sx={{ width: '100%', maxWidth: { xs: '100%', md: '250px' } }}
                >
                  <Button
                    startIcon={<Iconify icon="typcn:plus" />}
                    fullWidth
                    sx={{ borderRadius: '30px', textTransform: 'capitalize' }}
                    component="button"
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setOpenCreateProduct(true);
                    }}
                  >
                    {t('products.add_product')}
                  </Button>
                </Stack>
              </BottomActions>
            </Grid>
          </RoleBasedGuard>

          <Grid item xs={12}>
            <Box mt="20px">
              <ProductTableToolbar sort={true} setSort={() => {}} query={''} setQuery={() => {}} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <TabContext value={'All'}>
                {/* <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    variant="scrollable"
                    scrollButtons={false}
                    onChange={handleChangeTab}
                    sx={{
                      px: 2.5,
                      boxShadow: (theme) =>
                        `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
                    }}
                  >
                    <Tab
                      iconPosition="end"
                      value="All"
                      label="All Products"
                      icon={
                        <Label
                          variant={(value === 'All' && 'filled') || 'outlined'}
                          color="primary"
                        >
                          {productsLength}
                        </Label>
                      }
                    />
                    {categoryState.list.map((categoryObj: any) => (
                      <Tab
                        key={categoryObj._id}
                        iconPosition="end"
                        value={categoryObj._id}
                        label={categoryObj?.name?.en || ''}
                        icon={
                          <Label
                            variant={(categoryObj._id === value && 'filled') || 'outlined'}
                            color="primary"
                          >
                            {
                              list.filter((product: any) => product.categoryId === categoryObj._id)
                                .length
                            }
                          </Label>
                        }
                      />
                    ))}
                  </TabList>
                </Box> */}

                <TabPanel value={'All'} sx={{ px: 0, minHeight: '50vh' }}>
                  <DragDropContext onDragEnd={() => {}}>
                    <Droppable droppableId="items">
                      {(provided) => (
                        <Grid
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          container
                          spacing={2}
                        >
                          {/* DND START */}
                          {getAllProductsRes?.data?.data?.data?.map((product: any, indx: any) => (
                            <Product product={product} indx={indx} key={indx} />
                          ))}
                        </Grid>
                      )}
                    </Droppable>
                  </DragDropContext>
                </TabPanel>
              </TabContext>
            </Box>
          </Grid>
        </Grid>
        {/* ========== DRAWER ========== */}
        <ProductDrawer
          openCreateProduct={openCreateProduct}
          onClose={handleDrawerClose}
          createProductSections={createProductSections}
          isSubmitting={isSubmitting}
          handleNextInputs={handleNextInputs}
          methods={methods}
          onSubmit={onSubmit}
          renderDetails={renderDetails}
          setcreateProductSections={setcreateProductSections}
        />
      </RoleBasedGuard>
    </Container>
  );
}
