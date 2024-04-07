'use client';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadingButton from '@mui/lab/LoadingButton';
// @mui
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Typography, Paper, Alert, Tooltip, IconButton } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
// components
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';
import { BottomActions } from 'src/components/bottom-actions';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { RoleBasedGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';
import {
  createCategory,
  createSubCategory,
  deleteCategory,
  deleteSubCategory,
  editCategory,
  editSubCategory,
  fetchCategorysList,
  fetchOneCategory,
  fetchOneSubCategory,
  fetchSubCategorysList,
  setCategory,
  setSubCategory,
  sortCategory,
  sortSubCategory,
} from '../../../redux/store/thunks/category';
import type { AppDispatch } from '../../../redux/store/store';
import { MuiColorInput } from 'mui-color-input';
import { CustomDrawer } from 'src/components/drawer';
import { useLocales } from 'src/locales';
import { FieldLoading, PaperLoading } from 'src/sections/brand/loading';
import { DraggablePaper } from 'src/components/dashboard';
import { TableNoData } from 'src/components/table';
import RHFColorSelector from 'src/components/hook-form/rhf-color-selector';
import CategoriesDrawer from '../categories-drawer';
import SubCategoriesDrawer from '../sub-categories-drawer';
// ----------------------------------------------------------------------
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
  notFound: boolean;
};
export default function CategoriesView() {
  const [visibleItems, setVisibleItems] = useState<{ [key: string]: number }>({});
  const { t } = useLocales();
  const [bgColor, setColor] = useState<any>(null)
  const dispatch = useDispatch<AppDispatch>();
  const initialPageSize = 5;
  const [pageSize, setPageSize] = useState<number>(initialPageSize); const [pageNumber, setPageNumber] = useState<number>(1);
  const [categoriesLength, setCategoriesLength] = useState<number>(0);
  const [editCatId, setEditCatId] = useState<any>(null);
  const [editSubCatId, setEditSubCatId] = useState<any>(null);
  const [removeData, setRemoveData] = useState<any>(null);
  const [subcategoriesFetched, setsubCategoriesFetched] = useState(false)
  const { verifyPermission } = useAuthContext();
  const settings = useSettingsContext();
  const confirm = useBoolean();
  const [activeCategory, setActiveCategory] = useState('main');
  // const [loading, setLoading] = useState(false)
  const [loadingCategory, setLoadingCategory] = useState(false)
  const [loadingSub, setLoadingSub] = useState(false)
  const [categoryDrawer, setCategoryDrawer] = useState<boolean>(false);
  const [subCategoryDrawer, setSubCategoryDrawer] = useState<boolean>(false);
  const { error, category, subCategory, loading, count } = useSelector(
    (state: any) => state.category
  );
  const [categoriesData, setCategoriesData] = useState<any>(null);
  const [subCategoriesData, setSubCategoriesData] = useState<any>(null);
  const [subCatArray, setSubCatArray] = useState([])
  const [itemList, setItemsList] = useState([])
  const [errorMsg, setErrorMsg] = useState<any>('');

  useEffect(() => {
    const initialVisibleItems: { [key: string]: number } = {};
    subCatArray.forEach((cat: any) => {
      initialVisibleItems[cat._id] = 2;
    });
    setVisibleItems(initialVisibleItems);
  }, [subCatArray]);

  useEffect(() => {
    setItemsList(itemList);
  }, [itemList]);

  useEffect(() => {
    setSubCatArray(subCatArray);
  }, [subCatArray]);
  const { enqueueSnackbar } = useSnackbar();
  const CategorySchema = Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),

  });

  // Sub Category
  const SubCategorySchema = Yup.object().shape({
    name: Yup.object().shape({
      en: Yup.string().required('English Name is required'),
      ar: Yup.string().required('Arabic Name is required'),
    }),
    category: Yup.string().required('Category is required'),
  });

  const methods = useForm({
    resolver: yupResolver(CategorySchema),
  });

  const subCatMethods = useForm({
    resolver: yupResolver(SubCategorySchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editCatId) {
        await handleEditCategory();
      } else {
        await handleCreateCategory();
      }
    } catch (err) {
      console.error(err);
      reset();
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });
  const onSubmitSubCat = subCatMethods.handleSubmit(async (data) => {
    try {
      if (editSubCatId) {
        await handleEditSubCategory();
      } else {
        await handleCreateSubCategory();
      }
    } catch (err) {
      console.error(err);
      subCatMethods.reset();
      setErrorMsg(typeof err === 'string' ? err : err.message);
    }
  });
  // reseting removeData value
  useEffect(() => {
    if (!confirm.value) {
      setRemoveData(null);
    }
  }, [confirm]);

  useEffect(() => {
    if (category && Object.entries(category).length > 0) {
      setCategoriesData(category);
      if (category?.name) {
        Object.entries(category).forEach(([fieldName, nestedData]: any) => {
          if (fieldName === 'name') {
            Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
              const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
              methods.setValue(fullFieldName as 'name.en' | 'name.ar', value);
            });
          }
        });
      }
    } else {
      setCategoriesData(null);
      reset();
    }
  }, [category, reset]);

  useEffect(() => {
    if (subCategory && Object.entries(subCategory).length > 0) {
      const newSubCategoryObj = {
        name: {},
        category: '',
        image: '',
        icon: '',
      };
      Object.entries(subCategory).forEach(([fieldName, nestedData]: any) => {
        if (fieldName === 'name') {
          Object.entries(nestedData).forEach(([nestedFieldName, value]: any) => {
            const fullFieldName: string = `${fieldName}.${nestedFieldName}`;
            if (nestedFieldName === 'en' || nestedFieldName === 'ar') {
              newSubCategoryObj.name = {
                ...newSubCategoryObj?.name,
                [nestedFieldName]: value,
              };
              subCatMethods.setValue(fullFieldName as 'name.en' | 'name.ar', value);
            }
          });
        } else if (fieldName === 'category') {
          subCatMethods.setValue(fieldName, nestedData._id);
          newSubCategoryObj.category = nestedData._id;
        } else if (fieldName === 'image') {
          newSubCategoryObj.image = nestedData;
        } else if (fieldName === 'icon') {
          newSubCategoryObj.icon = nestedData;
        }
      });

      setSubCategoriesData(newSubCategoryObj);
    } else {
      setSubCategoriesData(null);
      subCatMethods.reset();
    }
  }, [subCategory]);

  // -----------------------------------------------------------------------------------------
  const handleLoadMore = (categoryId: string, subCatLength: number) => {
    setVisibleItems((prev) => {
      const currentCount = prev[categoryId] || 2;
      const newCount = currentCount === 2 ? subCatLength : 2;
      return {
        ...prev,
        [categoryId]: newCount,
      };
    });
  };

  const handleCreateCategory = () => {

    const FormValues: any = new FormData();
    Object.keys(categoriesData.name).forEach((key) => {
      const value = categoriesData.name[key];
      FormValues.append(`name[${key}]`, value);
    });
    if (categoriesData.image && typeof categoriesData.image !== 'string') {
      FormValues.append('image', categoriesData.image);
    }

    if (categoriesData.icon && typeof categoriesData.icon !== 'string') {
      FormValues.append('icon', categoriesData.icon);
    }

    if (categoriesData?.bgColor !== undefined) {
      FormValues.append('bgColor', String(categoriesData.bgColor));
    }


    dispatch(createCategory(FormValues)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
          setItemsList(response.payload.data.data)
          setCategoriesLength(response.payload.data.count);

          setLoadingCategory(false)
        });
        dispatch(fetchSubCategorysList(error))
          .then((response: any) => {
            // setSubCategoriesLength(response?.payload?.data?.count)
            setSubCategoriesData(response?.payload?.data?.data);
            setSubCatArray(response?.payload?.data?.data)
          })
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
        setCategoryDrawer(false)
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
      }

    });
  };
  const handleEditCategory = () => {

    const FormValues: any = new FormData();
    Object.keys(categoriesData.name).forEach((key) => {
      const value = categoriesData.name[key];
      if (key !== 'localized') {
        FormValues.append(`name[${key}]`, value);
      }
    });
    if (categoriesData.image && typeof categoriesData.image !== 'string') {
      FormValues.append('image', categoriesData.image);
    }

    if (categoriesData.icon && typeof categoriesData.icon !== 'string') {
      FormValues.append('icon', categoriesData.icon);
    }

    if (categoriesData?.bgColor !== undefined) {
      FormValues.append('bgColor', String(categoriesData.bgColor));
    }

    dispatch(editCategory({ categoryId: editCatId, data: FormValues })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
          setCategoriesLength(response.payload.data.count);
          setItemsList(response.payload.data.data)
          setCategoryDrawer(false)
          setLoadingCategory(false)
        });
        dispatch(fetchSubCategorysList(error)).then((response: any) => {
          setSubCatArray(response?.payload?.data?.data)
        });
        enqueueSnackbar('Successfully Updated!', { variant: 'success' });
      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });

      }
    });
  };
  const handleRemoveCategory = () => {
    ;
    if (removeData && removeData.type === 'category') {
      dispatch(deleteCategory(removeData.id)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
            setLoadingCategory(false);
            setItemsList(response.payload.data.data)
            setCategoriesLength(response.payload.data.count)
            enqueueSnackbar('Category Successfully Deleted!', { variant: 'success' });
            confirm.onFalse();
          });
          dispatch(fetchSubCategorysList(error))
            .then((response: any) => {
              // setSubCategoriesLength(response?.payload?.data?.count)
              setSubCategoriesData(response?.payload?.data?.data);
              setSubCatArray(response?.payload?.data?.data)

            })
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
          setLoadingCategory(false);
        }
      });
    } else if (removeData && removeData.type === 'subcategory') {
      dispatch(deleteSubCategory(removeData.id)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchSubCategorysList(error)).then((res: any) => {
            setSubCatArray(res?.payload?.data?.data)
            setLoadingCategory(false);
            enqueueSnackbar('Subcategory Successfully Deleted!', { variant: 'success' });
            confirm.onFalse();
          });
          dispatch(fetchCategorysList({ pageNumber, pageSize })).then((response: any) => {
            setLoadingCategory(false);
            setItemsList(response.payload.data.data)
            setCategoriesLength(response.payload.data.count)
            confirm.onFalse();
          });

        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });
          ;
          setLoadingCategory(false);
        }
      });
    }
  };
  // ---------------------------------------------Sub Categories--------------------------------------------
  const handleCreateSubCategory = () => {

    const FormValues: any = new FormData();
    Object.keys(subCategoriesData.name).forEach((key) => {
      const value = subCategoriesData.name[key];
      FormValues.append(`name[${key}]`, value);
    });
    if (subCategoriesData.image && typeof subCategoriesData.image !== 'string') {
      FormValues.append('image', subCategoriesData.image);
    }
    if (subCategoriesData.icon && typeof subCategoriesData.icon !== 'string') {
      FormValues.append('icon', subCategoriesData.icon);
    }
    if (subCategoriesData?.category) {
      FormValues.append('category', subCategoriesData.category);
    }

    if (subCategoriesData?.bgColor) {
      FormValues.append('bgColor', String(subCategoriesData.bgColor));
    }
    dispatch(createSubCategory(FormValues)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        setSubCategoriesData(null);
        dispatch(fetchSubCategorysList(error)).then((response: any) => {
          setsubCategoriesFetched(true)
          setSubCatArray(response?.payload?.data?.data)
        });
        dispatch(fetchCategorysList({ pageNumber, pageSize })).then((res) => {
          setItemsList(res?.payload?.data.data)

        });
        enqueueSnackbar('Successfully Created!', { variant: 'success' });
        setSubCategoryDrawer(false)

      } else {
        enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });

      }
    });
  };
  const handleEditSubCategory = () => {

    const FormValues: any = new FormData();
    Object.keys(subCategoriesData.name).forEach((key) => {
      const value = subCategoriesData.name[key];
      if (key !== 'localized') {
        FormValues.append(`name[${key}]`, value);
      }
    });
    if (typeof subCategoriesData.image !== 'string') {
      FormValues.append('image', subCategoriesData.image);
    }
    if (typeof subCategoriesData.icon !== 'string') {
      FormValues.append('icon', subCategoriesData.icon);
    }
    if (subCategoriesData?.category) {
      FormValues.append('category', subCategoriesData.category);
    }
    if (subCategoriesData?.bgColor) {
      FormValues.append('bgColor', subCategoriesData.bgColor);
    }
    dispatch(editSubCategory({ subcategoryId: editSubCatId, data: FormValues })).then(
      (response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          dispatch(fetchSubCategorysList(error)).then((res: any) => {
            setSubCategoryDrawer(false)
            setLoadingSub(false)
            setSubCatArray(res?.payload?.data?.data)

          });

          enqueueSnackbar('Successfully Updated!', { variant: 'success' });
        } else {
          enqueueSnackbar(`Error! ${response.error.message}`, { variant: 'error' });

        }
      }
    );
  };

  // --------------------------------------------Sub CategoryData----------------------------------------------
  const handleSubCategoryData = (e: any) => {
    const { name, value } = e.target;
    const language = name.split('.')[1];

    setSubCategoriesData((prevData: any) => ({
      ...prevData,
      name: {
        ...prevData?.name,
        [language]: value,
      },
    }));
  };

  const handleSubCategoryImage = (files: any) => {
    if (files.length > 0) {
      setSubCategoriesData({ ...subCategoriesData, image: files[0] });
    }
  };
  // const removeSubCatImage = () => {
  //   setSubCategoriesData((current: any) => {
  //     const { image, ...rest } = current;
  //     return rest;
  //   });
  // };
  // const removeSubCatLogo = () => {
  //   setSubCategoriesData((current: any) => {
  //     const { icon, ...rest } = current;
  //     return rest;
  //   });
  // };

  // ------------------------------------------------------------------------------------------
  const handleCategoryData = (e: any) => {
    const { name, value } = e.target;
    const language = name.includes('.') ? name.split('.')[1] : undefined;

    setCategoriesData((prevData: any) => ({
      ...prevData,
      name: {
        ...prevData?.name,
        ...(language === 'en' || language === 'ar' ? { [language]: value } : {}),
      },
      ...(name === 'bgColor' ? { [name]: value } : {}),
    }));
  };

  const handleCategoryImage = (files: any) => {
    if (files.length > 0) {
      setCategoriesData({ ...categoriesData, image: files[0] });
    }
  };
  const handleCategoryLogo = (files: any) => {
    if (files.length > 0) {
      setCategoriesData({ ...categoriesData, icon: files[0] });
    }
  };
  const handleSubCategoryLogo = (files: any) => {
    if (files.length > 0) {
      setSubCategoriesData({ ...subCategoriesData, icon: files[0] });
    }
  };
  // const removeImage = () => {
  //   setCategoriesData((current: any) => {
  //     const { image, ...rest } = current;
  //     return rest;
  //   });
  // };
  // const removeLogo = () => {
  //   setCategoriesData((current: any) => {
  //     const { icon, ...rest } = current;
  //     return rest;
  //   });

  // };

  // ----------------------------------------------------------------------------------------
  const handleChangeCategory =
    (newValue: string) => (event: React.SyntheticEvent | React.MouseEvent) => {
      setActiveCategory(newValue);
    };
  const handleChangeMySubCat = (event: SelectChangeEvent) => {
    setSubCategoriesData({ ...subCategoriesData, category: event.target.value as string });
  };
  // common
  const toggleDrawerCommon =
    (state: string, id: any = null) =>
      (event: React.SyntheticEvent | React.MouseEvent) => {
        if (state === 'cat') {
          setCategoryDrawer((pv) => !pv);
          setEditCatId(id);
          if (id) {
            dispatch(fetchOneCategory(id));
          } else {
            setCategoriesData({});
            dispatch(setCategory({}));
          }
        } else if (state === 'sub') {
          setSubCategoryDrawer((pv) => !pv);
          setEditSubCatId(id);
          if (id) {

            dispatch(fetchOneSubCategory(id)).then((res: any) => {
              const data = res.payload.bgColor;
              setColor(data)

            });
          } else {
            setSubCategoriesData({});
            setColor(null)
            dispatch(setSubCategory({}));
          }
        }
      };
  const handleDrawerCloseCommon = () => () => {
    setCategoryDrawer(false);
  };
  const handleDrawerSubCloseCommon = () => () => {
    setSubCategoryDrawer(false);
  };


  useEffect(() => {
    setLoadingCategory(true); // Start loading
    dispatch(fetchCategorysList({ pageNumber, pageSize }))
      .then((response: any) => {
        setCategoriesLength(response.payload.data.count);
        setItemsList(response.payload.data.data)

        setLoadingCategory(false);
      })
      .catch((error: any) => {
        console.error("Error fetching categories:", error);
        setLoadingCategory(false);
      });
  }, [pageNumber, pageSize, dispatch]);


  const handleOnDragEnd = async (result: any) => {
    const draggedCategory: any = itemList?.[result.source.index];
    await dispatch(
      sortCategory({ categodyId: draggedCategory?._id, data: { sortIndex: result.destination.index + 1 } })
    ).then((res) => {
      if (!result.destination) return;
      const items = Array.from(itemList);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setItemsList(items)
    });
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
      await getPermission('edit', 'UPDATE_CATEGORY_BY_ID');
      await getPermission('remove', 'DELETE_CATEGORY_BY_ID');
    };
    fetchData();
  }, []);
  useEffect(() => {
    setLoadingSub(true); // Start subloading

    dispatch(fetchSubCategorysList(error))
      .then((response: any) => {
        // setSubCategoriesLength(response?.payload?.data?.count)
        setSubCategoriesData(response?.payload?.data?.data);
        setSubCatArray(response?.payload?.data?.data)
        setLoadingSub(false); // Stop subloading after fetching
      })
      .catch((error: any) => {
        console.error("Error fetching subcategories:", error);
        setLoadingSub(false); // Stop subloading in case of an error
      });
  }, []);
  const subcategoryCount = subCatArray?.map((cat: any, indx: any) => {
    return subCatArray?.flatMap((item: any) =>
      item.subcategories.filter((subItem: any) => subItem.category === cat?._id)
    ).length;
  });
  const totalSubcategories = subcategoryCount.reduce((acc: any, count: any) => acc + count, 0);

  return (
    <Container maxWidth={false}  >
      <RoleBasedGuard returnBoolean hasContent permission="GET_CATEGORYS">
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          sx={{
            width: {
              lg: categoryDrawer || subCategoryDrawer === true ? "calc(100% - 380px)" : "100%",
              md: categoryDrawer || subCategoryDrawer === true ? "calc(100% - 380px)" : "100%",

            }
          }}
        >
          <Grid item xs={12} md="auto">
            <CustomCrumbs
              heading={t("categories.Categories")}
              description={t("categories.Doyouwantanyhelp")}
              crums={false}
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <Stack
              sx={{ bgcolor: 'background.neutral', borderRadius: '16px', p: '5px' }}
              direction="row"
              alignItems="center"
              justifyContent={{ xs: 'flex-start', md: 'flex-end' }}
              spacing="20px"
            >
              <Button
                onClick={handleChangeCategory('main')}
                fullWidth
                variant="contained"
                sx={
                  activeCategory === 'main'
                    ? {
                      borderRadius: '12px',
                      color: '#0F1349',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0px 6px 20px #00000033',
                      '&:hover': { backgroundColor: '#FFFFFF' },
                    }
                    : {
                      borderRadius: '12px',
                      color: '#8688A3',
                      backgroundColor: 'background.neutral',
                      '&:hover': { backgroundColor: 'background.neutral' },
                    }
                }
              >
                {' '}
                {t("categories.Categories")}{' '}
              </Button>
              <Button
                onClick={handleChangeCategory('sub')}
                fullWidth
                variant="contained"
                sx={
                  activeCategory === 'sub'
                    ? {
                      borderRadius: '12px',
                      color: '#0F1349',
                      backgroundColor: '#FFFFFF',
                      boxShadow: '0px 6px 20px #00000033',
                      '&:hover': { backgroundColor: '#FFFFFF' },
                    }
                    : {
                      borderRadius: '12px',
                      color: '#8688A3',
                      backgroundColor: 'background.neutral',
                      '&:hover': { backgroundColor: '#FFFFFF' },
                    }
                }
              >
                {' '}
                {t("categories.Subcategories")}{' '}
              </Button>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider flexItem sx={{ my: '20px' }} />
          </Grid>

          {activeCategory === 'main' && (
            <>
              <Grid item xs={12} sm={6}

              >
                <Typography component="h5" variant="h5">
                  {t("categories.Youhave")} {categoriesLength} {t("categories.Categories")}
                </Typography>
              </Grid>
              <RoleBasedGuard permission="CREATE_CATEGORY">
                <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'right' }}>
                  <BottomActions>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      alignItems="center"
                      justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                      spacing="10px"
                      sx={{ width: '100%', maxWidth: { xs: '100%', sm: '187px' } }}
                    >
                      <Button
                        startIcon="+"
                        fullWidth
                        sx={{ borderRadius: '30px', color: '#0F1349' }}
                        component="button"
                        variant="contained"
                        color="primary"
                        onClick={toggleDrawerCommon('cat')}
                      >
                        {t("categories.AddNewCategory")}{' '}
                      </Button>
                    </Stack>
                  </BottomActions>
                </Grid>
              </RoleBasedGuard>
              <Box sx={{ minHeight: '60vh', width: '100%' }}>
                {loadingCategory === true ? (
                  <>
                    <PaperLoading />
                    <PaperLoading />
                    <PaperLoading />
                  </>
                ) : (
                  categoriesLength > 0 ? (
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

                            {
                              // Start
                              itemList?.map((category: any, indx: number) => (
                                <DraggablePaper key={indx} index={indx}
                                  actions={
                                    <>
                                      {allowAction.remove && (
                                        <Tooltip title={t('brand.delete_btn')}>
                                          <IconButton
                                            onClick={() => {
                                              setRemoveData({
                                                type: 'category',
                                                id: category._id,
                                              });
                                              confirm.onTrue();
                                            }}
                                          >
                                            <Iconify color="text.secondary" icon="lucide:trash-2" width={25} />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                      {allowAction.edit && (
                                        <Tooltip title={t('brand.edit')}>
                                          <IconButton>
                                            <Iconify
                                              color="text.secondary"
                                              icon="lucide:edit"
                                              onClick={toggleDrawerCommon('cat', category._id)}
                                              width={25}
                                            />
                                          </IconButton>
                                        </Tooltip>
                                      )}
                                    </>
                                  }
                                >
                                  <Grid
                                    ref={provided.innerRef}
                                    item
                                    xs={12}
                                  >
                                    <Grid
                                      container
                                      item
                                      alignItems="center"
                                      justifyContent="space-between"
                                      rowGap={3}
                                      sx={{ py: { xs: 1.5 } }}
                                    >
                                      <Grid item xs="auto">
                                        <Box
                                          sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '15px',
                                          }}
                                        >

                                          {category?.image ? (
                                            <Box
                                              component="img"
                                              src={category.image}
                                              alt=" "
                                              width="60px"
                                            />
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
                                                icon="uil:images"
                                                width="40px"
                                                height="40px"
                                              />
                                            </Box>
                                          )}
                                          <Box display="flex" gap="0px" flexDirection="column">
                                            <Typography
                                              component="p"
                                              variant="subtitle2"
                                              sx={{ fontSize: '.9rem', fontWeight: 800 }}
                                            >
                                              {' '}
                                              {category?.name?.en || category.name}{' '}
                                            </Typography>
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
                                              {category?.subcategoriesNumber}  {t("categories.Subcategories")} - {category?.productsNumber} {t("categories.products")}
                                            </Typography>
                                          </Box>
                                        </Box>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </DraggablePaper>
                              )

                              )
                            }
                            {provided.placeholder}
                          </Grid>
                        )}
                      </Droppable>
                    </DragDropContext>
                  ) :
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <TableNoData notFound={categoriesLength === 0}
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        />
                      </Box>
                    </>
                )}

              </Box>
              <Stack
                sx={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {Math.ceil(categoriesLength / pageSize) !== 1 && categoriesLength > 5 && (

                  <Button
                    variant="soft"
                    sx={{ px: 3, marginInlineStart: 'auto', textTransform: 'capitalize', marginTop: "20px" }}
                    onClick={() => {
                      setPageSize((prev) => prev + initialPageSize);
                    }}
                  >
                    {t('common.load_more')}
                  </Button>
                )}
              </Stack>
            </>
          )}

          {activeCategory === 'sub' && (
            <>
              <Grid item xs={12} sm={6}>
                <Typography component="h5" variant="h5">
                  {t("categories.Youhave")} {subcategoryCount.reduce((acc: any, count: any) => acc + count, 0)} {t("categories.Subcategories")}{' '}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6} textAlign={{ xs: 'center', sm: 'right' }}>
                <BottomActions>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                    spacing="10px"
                    sx={{ width: '100%', maxWidth: { xs: '100%', sm: '100%' } }}
                  >
                    <Button
                      startIcon="+"
                      // fullWidth
                      sx={{
                        borderRadius: '30px', color: '#0F1349', whiteSpace: "nowrap",
                        padding: "6px 20px 6px 20px"
                      }}
                      component="button"
                      variant="contained"
                      color="primary"
                      onClick={toggleDrawerCommon('sub')}
                    >
                      {t("categories.AddNewSubcategory")}{' '}
                    </Button>
                  </Stack>
                </BottomActions>
              </Grid>

              {loadingSub === true ? (
                <>
                  <PaperLoading />
                  <PaperLoading />
                  <PaperLoading />
                </>
              ) : (
                totalSubcategories > 0 ? (
                  <Grid item xs={12} container spacing={2}>
                    {subCatArray?.map((cat: any, indx: any) => {
                      const subCat = subCatArray?.flatMap((item: any) =>
                        item.subcategories?.filter((subItem: any) => subItem.category === cat?._id)
                      );
                      const categoryId = cat?._id;
                      const subCatLength = subCat.length;
                      const visibleItemCount = visibleItems[categoryId] || 0;
                      const showLoadMoreButton = subCatLength > 2;

                      return (
                        <React.Fragment key={indx}>
                          {subCat.length > 0 && (
                            <Grid item xs={12} sx={{ mt: '20px' }}>
                              <Typography
                                component="p"
                                variant="subtitle2"
                                sx={{ fontSize: '1rem', fontWeight: 800 }}
                              >
                                {' '}
                                {cat?.name?.en || cat?.name || ''}{' '}
                              </Typography>
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
                                {subCat.length} subcategories
                              </Typography>
                            </Grid>
                          )}

                          <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="items">
                              {(provided) => (
                                <Grid


                                  item
                                  xs={12}
                                  container
                                  sx={{ mt: '20px' }}
                                  spacing={2}
                                >
                                  {subCat.slice(0, visibleItemCount).map((subCatObject: any, subIndex: any) => (

                                    <DraggablePaper key={subIndex} index={subIndex}
                                      actions={
                                        <>
                                          {allowAction.remove && (
                                            <Tooltip title={t('brand.delete_btn')}>
                                              <IconButton
                                                onClick={() => {
                                                  setRemoveData({ type: 'subcategory', id: subCatObject._id });
                                                  confirm.onTrue();
                                                }}
                                              >
                                                <Iconify color="text.secondary" icon="lucide:trash-2" width={25} />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                          {allowAction.edit && (
                                            <Tooltip title={t('brand.edit')}>
                                              <IconButton>
                                                <Iconify
                                                  color="text.secondary"
                                                  icon="lucide:edit"
                                                  onClick={toggleDrawerCommon('sub', subCatObject._id)}
                                                  width={25}
                                                />
                                              </IconButton>
                                            </Tooltip>
                                          )}
                                        </>
                                      }
                                    >
                                      <Grid item xs={12}>
                                        <Grid
                                          container
                                          item
                                          alignItems="center"
                                          justifyContent="space-between"
                                          rowGap={3}
                                          sx={{ py: { xs: 1.5 } }}
                                        >
                                          <Grid item xs="auto">
                                            <Box
                                              sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '15px',
                                              }}
                                            >
                                              {subCatObject?.image ? (
                                                <Box
                                                  component="img"
                                                  src={subCatObject.image}
                                                  alt=" "
                                                  width="60px"
                                                />
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
                                                    icon="uil:images"
                                                    width="40px"
                                                    height="40px"
                                                  />
                                                </Box>
                                              )}

                                              <Box display="flex" gap="0px" flexDirection="column">
                                                <Typography
                                                  component="p"
                                                  variant="subtitle2"
                                                  sx={{ fontSize: '.9rem', fontWeight: 800 }}
                                                >
                                                  {' '}
                                                  {subCatObject?.name?.en || subCatObject?.name}{' '}
                                                </Typography>
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
                                                  {subCatObject?.productsNumber} {t("categories.products")}
                                                </Typography>
                                              </Box>
                                            </Box>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </DraggablePaper>

                                  ))}

                                  {showLoadMoreButton && (

                                    <Button
                                      variant="soft"
                                      sx={{ px: 3, marginInlineStart: 'auto', textTransform: 'capitalize', marginTop: "20px" }}
                                      onClick={() => handleLoadMore(categoryId, subCatLength)}
                                    >

                                      {visibleItemCount === 2 ? 'Show More' : 'Show Less'}
                                    </Button>

                                  )}
                                </Grid>

                              )}
                            </Droppable>
                          </DragDropContext>
                        </React.Fragment>
                      );
                    })}
                  </Grid>
                ) : (
                  <Box
                    sx={{
                      display: "flex !important",
                      margin: "0 auto"
                    }}
                  >
                    {subcategoryCount.reduce((acc: any, count: any) => acc + count, 0) === 0 &&
                      <TableNoData
                        notFound={true}
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      />

                    }

                  </Box>
                )
              )}

            </>
          )}
        </Grid>

        {/* add and edit Item */}
        <CategoriesDrawer
          categoryDrawerOpen={categoryDrawer}
          handleDrawerCloseCommon={handleDrawerCloseCommon}
          loading={loading}
          methods={methods}
          onSubmit={onSubmit}
          errorMsg={errorMsg}
          handleCategoriesData={handleCategoryData}
          setCategoriesData={setCategoriesData}
          categoriesData={categoriesData}
          handleCategoryImage={handleCategoryImage}
          handleCategoryLogo={handleCategoryLogo}
          editCategoryId={editCatId}
        />
        <SubCategoriesDrawer
          subcategoryDrawerOpen={subCategoryDrawer}
          handleDrawerCloseCommon={handleDrawerSubCloseCommon}
          setSubCategoriesData={setSubCategoriesData}
          editSubCategoryId={editSubCatId}
          loading={loading}
          SubcategoriesData={subCategoriesData}
          subCatArray={subCatArray}
          bgColor={bgColor}
          setColor={setColor}
          onClick={() => subCatMethods.handleSubmit(onSubmitSubCat as any)()}
          methods={subCatMethods}
          onSubmit={onSubmitSubCat}
          handleSubCategoriesData={handleSubCategoryData}
          handleSubCategoryImage={handleSubCategoryImage}
          handleSubCategoryLogo={handleSubCategoryLogo}
          errorMsg={errorMsg}
          handleChangeMySubCat={handleChangeMySubCat}
        />

        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          noCancel={false}
          title="Delete"
          content={<>{t("categories.wantdeleteitems")}</>}
          action={

            <Stack alignItems="center" justifyContent="center" spacing="10px">
              <LoadingButton
                fullWidth
                variant="soft"
                color="error"
                size="large"
                sx={{ borderRadius: '30px' }}
                loading={loading}
                onClick={handleRemoveCategory}
              >
                {t("categories.Delete")}
              </LoadingButton>
            </Stack>
          }
        />
      </RoleBasedGuard>
    </Container>
  );
}
