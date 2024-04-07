/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useState } from 'react';

// @mui
import Button from '@mui/material/Button';
import { Box, Stack, Step, StepLabel, Stepper } from '@mui/material';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store/store';

import FormProvider from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';

import { allLangs, useLocales } from 'src/locales';
import {
  StepProductInformation,
  StepProductDetails,
  StepBranches,
  StepAvailable,
  StepBusiness,
  StepMedia,
  StepOptions,
} from './steps';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';
import { createProduct } from 'src/redux/store/thunks/products';
import { useDispatch } from 'react-redux';

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

export default function NewProductForm() {
  // TODO: change this for ease of use, set it to the step ur working on
  const [currentStep, setCurrentStep] = useState(1);
  // TODO: change this for ease of use, set it to the step ur working on
  const { t } = useLocales();
  const { push } = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const selectedDomain = useSelector((state: RootState) => state?.selectedDomain?.data);
  const categoryState = useSelector((state: RootState) => state.category);
  const brandState = useSelector((state: RootState) => state.brands);
  const { enqueueSnackbar } = useSnackbar();
  const [productData, setProductData] = useState<any>(null);

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

    dispatch(createProduct({ data: formData }))
      .then(() => {
        push(paths.dashboard.products.root);
      })
      .catch((err) => console.log('err', err));
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
    switch (currentStep) {
      case 0:
        return <StepProductInformation languages={allLangs} />;
      case 1:
        return <StepProductDetails />;
      case 2:
        return <StepMedia />;
      case 3:
        return <StepBusiness />;
      case 4:
        return <StepBranches />;
      case 5:
        return <StepOptions />;
      case 6:
        return <StepAvailable />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* ========== STEPPER ========== */}
      <Stepper
        activeStep={currentStep}
        alternativeLabel
        sx={{
          // maxWidth: '500px',
          overflowX: 'auto',
        }}
      >
        {[
          'information',
          'details',
          'media',
          'business',
          'branches',
          'variations',
          'available',
        ]?.map((label: string) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          return (
            <Step key={label} sx={{ textTransform: 'capitalize' }} {...stepProps}>
              <StepLabel sx={{ width: '55px', textTransform: 'capitalize' }} {...labelProps}>
                {t(`products.create_product.${label}`)}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* ========== FORM INPUTS ========== */}
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box width="100%">{renderDetails()}</Box>
        {/* ========== step BUTTONS ========== */}
        <Stack direction="row" justifyContent="end" gap={2} sx={{ py: 4 }}>
          {currentStep > 0 && (
            <Button
              fullWidth
              variant="soft"
              color="inherit"
              size="large"
              onClick={() => {
                setCurrentStep((prev) => prev - 1);
              }}
              sx={{
                width: 'fit-content',
                borderRadius: '30px',
                px: 10,
                marginInlineEnd: '10px',
                bgcolor: 'text.secondary',
                color: 'background.paper',
                '&:hover': { color: 'text.primary' },
              }}
            >
              {t('products.create_product.back')}
            </Button>
          )}
          {currentStep < 6 ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setCurrentStep((prev) => prev + 1);
              }}
              sx={{ width: 'fit-content', borderRadius: '30px', px: 10 }}
            >
              {t('products.create_product.next')}
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              onClick={() => {
                // setCurrentStep((prev) => prev + 1);
              }}
              sx={{ width: 'fit-content', borderRadius: '30px', px: 10 }}
            >
              {t('common.submit')}
            </Button>
          )}
        </Stack>
      </FormProvider>
    </>
  );
}
