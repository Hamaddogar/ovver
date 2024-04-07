/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { useState, useCallback, useEffect } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, Grid, Stack, Tabs } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useSnackbar } from 'notistack';
// utils
import { useBoolean } from 'src/hooks/use-boolean';
// components
// import NavigatorBar from 'src/components/NavigatorBar';
import { BottomActions } from 'src/components/bottom-actions';
// import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { TableNoData } from 'src/components/table';
// types
// import { IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';
//
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'src/redux/store/store';

import Iconify from 'src/components/iconify/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { RoleBasedGuard } from 'src/auth/guard';
import { useAuthContext } from 'src/auth/hooks';
import CustomersTableToolbar from '../customers-toolbar';
import CustomersFiltersResult from '../customers-filters-result';
import {
  createCustomer,
  deleteCustomer,
  editCustomer,
  fetchCustomersList,
  fetchOneCustomer,
  setCustomers,
} from 'src/redux/store/thunks/customers';
import { useGetCustomerAnalyticsQuery } from 'src/redux/store/services/api';
import { useLocales } from 'src/locales';
import CustomersDrawer from '../customers-drawer';
import CustomerPaper from '../customer-paper';
import AnalyticsDialog from '../analytics-dialog';
import CustomersDetailsDrawer from '../customers-details-drawer';
import { PaperLoading } from 'src/sections/brand/loading';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------
type AvailableCustomerTypes =
  | 'All'
  | 'New'
  | 'Loyal'
  | 'NotActive'
  | 'Super'
  | 'Champions'
  | 'Promising'
  | 'Need_Attention';

export const STATUS_OPTIONS = [
  { value: 'All', label: 'All', color: 'default' },
  { value: 'New', label: 'New', color: 'success' },
  { value: 'Loyal', label: 'Loyal', color: 'warning' },
  { value: 'NotActive', label: 'Not Active', color: 'error' },
  { value: 'Super', label: 'Super', color: 'warning' },
  { value: 'Champions', label: 'Champions', color: 'secondary' },
  { value: 'Promising', label: 'Promising', color: 'info' },
  { value: 'Need_Attention', label: 'Need Attention', color: 'error' },
];

// const defaultFilters: IOrderTableFilters = {
//   name: '',
//   status: 'all',
//   startDate: null,
//   endDate: null,
// };
export type CustomerSorts = 'custom' | 'createdAt' | '-createdAt';

// ----------------------------------------------------------------------

export default function OrdersListView() {
  const { t } = useLocales();
  const domain = useSelector((state: RootState) => state.selectedDomain);
  const response = useGetCustomerAnalyticsQuery(domain?.data?.domain);
  const dispatch = useDispatch<AppDispatch>();
  const { enqueueSnackbar } = useSnackbar();
  const { list, error, customer, loading, count } = useSelector((state: any) => state.customers);

  const initialPageSize = 5;
  const [pageSize, setPageSize] = useState<number>(initialPageSize);
  const [pageNumber, setPageNumber] = useState(1);
  // const [sort, setSort] = useState<CustomerSorts>('custom');
  const [query, setQuery] = useState('');
  const [type, setType] = useState<AvailableCustomerTypes>('All');
  const [editId, setEditId] = useState(null);
  const [removeData, setRemoveData] = useState<any>(null);
  const confirm = useBoolean();

  // const table = useTable({ defaultOrderBy: 'orderNumber' });

  const [value, setValue] = useState('All');

  // const [filters, setFilters] = useState(defaultFilters);

  const [customerData, setCustomerData] = useState<any>(null);

  const [errorMsg, setErrorMsg] = useState('');

  const CustomerSchema = Yup.object().shape({
    fullName: Yup.string().required(t('customers.field_required')),
    phoneNumber: Yup.string().required(t('customers.field_required')),
    email: Yup.string().required(t('customers.field_required')).email(t('customers.invalid_email')),
    location: Yup.string().required(t('customers.field_required')),
    // bgColor: Yup.string().notRequired(),
  });

  const methods = useForm({
    resolver: yupResolver(CustomerSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const [listItems, setListItems] = useState([]);
  const fetchCustomers = () => {
    dispatch(fetchCustomersList({ query, type, pageNumber, pageSize })).then((res) => {
      setListItems(res.payload.data);
    });
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (editId) {
        await editCustomerFun();
      } else {
        await createCustomerFun();
      }
    } catch (error) {
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  // const handleSortChange = (val: CustomerSorts) => {
  //   setSort(val);
  // };

  // fetch customers
  const [initialRender, setInitialRender] = useState(true);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (initialRender) {
      setInitialRender(false);
      fetchCustomers();
    } else {
      if (query) {
        timeoutId = setTimeout(() => {
          fetchCustomers();
        }, 700); // delay of 0.7 seconds
      } else {
        fetchCustomers();
      }
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query, type, pageSize, pageNumber]);

  // reseting removeData value
  useEffect(() => {
    if (!confirm.value) {
      setRemoveData(null);
    }
  }, [confirm]);

  // Edit customer
  useEffect(() => {
    if (customer) {
      const updatedData = {
        image: customer.image,
        fullName: customer.fullName,
        email: customer.email,
        phoneNumber: customer.phoneNumber,
        gender: customer.gender,
        country: customer.country,
        location: customer.location && customer.location.length > 0 ? customer.location[0] : null,
      };

      setCustomerData(updatedData);

      // Use setValue to update each field separately
      Object.entries(updatedData).forEach(([fieldName, value]: any) => {
        methods.setValue(fieldName, value);
      });
    } else {
      setCustomerData(null);
      reset();
    }
  }, [customer, methods, reset]);

  // ----------------------------------------------------------------------------------------------------

  const handleCustomerData = (e: any) => {
    setCustomerData((prevData: any) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleDropImage = useCallback(
    (acceptedFiles: File[]) => {
      const newFile = acceptedFiles[0];
      if (newFile) {
        setCustomerData({ ...customerData, image: newFile });
      }
    },
    [customerData]
  );

  const createCustomerFun = () => {
    if (customerData) {
      const FormValues: any = new FormData();
      Object?.keys(customerData).forEach((key) => {
        if (key === 'image' && !!customerData.image && typeof customerData.image !== 'string') {
          FormValues.append('image', customerData.image);
        } else if (key === 'location') {
          FormValues.append(`${key}[0]`, customerData[key]);
        } else if (key !== 'location' && key !== 'image') {
          FormValues.append(key, customerData[key]);
        }
      });
      FormValues.append('deviceToken', 'only for android and ios app.');

      dispatch(createCustomer(FormValues)).then((response: any) => {
        if (response.meta.requestStatus === 'fulfilled') {
          setCustomerData(null);
          fetchCustomers();
          enqueueSnackbar(t('customers.created'), { variant: 'success' });
          setOpenCreateCustomer(false);
        } else {
          enqueueSnackbar(`${t('customers.error')} ${response.error.message}`, {
            variant: 'error',
          });
        }
      });
    }
  };

  const editCustomerFun = () => {
    const FormValues: any = new FormData();
    Object?.keys(customerData).forEach((key) => {
      if (key === 'image' && !!customerData.image && typeof customerData.image !== 'string') {
        FormValues.append('image', customerData.image);
      } else if (key === 'location') {
        FormValues.append(`${key}[0]`, customerData[key]);
      } else if (key !== 'location' && key !== 'image') {
        if (typeof customerData[key] !== 'undefined') {
          FormValues.append(key, customerData[key]);
        }
      }
    });
    dispatch(editCustomer({ customerId: editId, data: FormValues })).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        fetchCustomers();
        enqueueSnackbar(t('customers.success_edit'), { variant: 'success' });
        setOpenCreateCustomer(false);
      } else {
        enqueueSnackbar(`${t('customers.error')} ${response.error.message}`, { variant: 'error' });
      }
    });
  };

  function removeCustomerFun() {
    dispatch(deleteCustomer(removeData)).then((response: any) => {
      if (response.meta.requestStatus === 'fulfilled') {
        fetchCustomers();
        enqueueSnackbar(t('customers.deleted'), { variant: 'success' });
        confirm.onFalse();
      } else {
        enqueueSnackbar(`${t('customers.error')} ${response.error.message}`, {
          variant: 'error',
        });
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------

  // const canReset =
  // !!filters.name || filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);

  // const handleFilters = useCallback(
  //   (name: string, value: IOrderTableFilterValue) => {
  //     table.onResetPage();
  //     setFilters((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   },
  //   [table]
  // );

  // const handleResetFilters = useCallback(() => {
  //   setFilters(defaultFilters);
  // }, []);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: AvailableCustomerTypes) => {
    setValue(newValue);
    setType(newValue);
  };

  // new order
  const [openDetails, setOpenDetails] = useState(false);
  const [openCreateCustomer, setOpenCreateCustomer] = useState(false);
  const [openAnalytics, setOpenAnalytics] = useState(false);

  const toggleDrawerCommon =
    (state: string, id: any = null) =>
    (event: React.SyntheticEvent | React.MouseEvent) => {
      if (state === 'createOrEdit') {
        setOpenCreateCustomer((pv) => !pv);
        setEditId(id);
        if (id) {
          dispatch(fetchOneCustomer(id));
        } else {
          setCustomerData({});
          dispatch(setCustomers(null));
        }
      } else if (state === 'details') {
        dispatch(fetchOneCustomer(id));
        setOpenDetails((pv) => !pv);
      } else if (state === 'analytics') setOpenAnalytics((pv) => !pv);
    };

  const handleDrawerCloseCommon =
    (state: string) => (event: React.SyntheticEvent | React.KeyboardEvent) => {
      if (state === 'createOrEdit') setOpenCreateCustomer(false);
      else if (state === 'details') setOpenDetails(false);
      else if (state === 'analytics') setOpenAnalytics(false);
    };

  // -----
  const { verifyPermission } = useAuthContext();
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
      await getPermission('edit', 'UPDATE_CUSTOMER_BY_ID');
      await getPermission('remove', 'DELETE_CUSTOMER_BY_ID');
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth={false}>
      <RoleBasedGuard hasContent permission="GET_CUSTOMERS">
        <Stack direction="row">
          <Grid
            container
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
            rowGap={0}
            pb={{ xs: 8, sm: 0 }}
          >
            {/* ========== TITLE ========== */}
            <Grid item xs={12} sm="auto" textTransform="capitalize">
              <CustomCrumbs heading={t('customers.customers')} crums={false} />
            </Grid>
            {/* ========== BUTTONS ========== */}
            <RoleBasedGuard permission="CREATE_CUSTOMER">
              <Grid
                item
                xs={12}
                sm="auto"
                textAlign={{ xs: 'center', sm: 'end' }}
                sx={{ whiteSpace: 'nowrap' }}
              >
                <BottomActions>
                  <Stack
                    textTransform="capitalize"
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
                    spacing={{ xs: '10px', sm: '20px' }}
                    sx={{ width: '100%' }}
                  >
                    <Button
                      startIcon={<Box component="img" src="/raw/orderreport.svg" />}
                      fullWidth
                      sx={{ py: 1, px: 5, borderRadius: '30px', color: 'text.secondary' }}
                      component="h5"
                      variant="soft"
                      onClick={toggleDrawerCommon('analytics')}
                    >
                      {t('customers.analytics')}
                    </Button>
                    <Button
                      startIcon={<Iconify icon="typcn:plus" />}
                      fullWidth
                      sx={{ py: 1, px: 5, borderRadius: '30px' }}
                      component="h5"
                      variant="contained"
                      color="primary"
                      onClick={toggleDrawerCommon('createOrEdit')}
                    >
                      {t('customers.add_customer')}
                    </Button>
                  </Stack>
                </BottomActions>
              </Grid>
            </RoleBasedGuard>

            {/* ========== SEARCH AND SORT ========== */}
            <Grid item xs={12}>
              <Box>
                <CustomersTableToolbar
                  query={query}
                  setQuery={setQuery}
                  // sort={sort}
                  // onSortChange={handleSortChange}
                  // filters={filters}
                  // onFilters={handleFilters}
                  // canReset={canReset}
                  // onResetFilters={handleResetFilters}
                />

                {query && (
                  <CustomersFiltersResult
                    // filters={filters}
                    // onFilters={handleFilters}
                    setQuery={setQuery}
                    // onResetFilters={handleResetFilters}
                    sx={{ p: 2.5, pt: 0 }}
                  />
                )}
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box>
                {/* ========== TABS ========== */}
                <TabContext value={value}>
                  {/* ========== TABS / labels ========== */}
                  <Box
                    sx={{
                      width: '100%',
                    }}
                  >
                    <Tabs scrollButtons={false} value={value} onChange={handleChangeTab}>
                      {STATUS_OPTIONS.map((tab) => {
                        const tabValue =
                          tab.value === 'All'
                            ? response.data?.data?.totalUserCount || 0
                            : response.data?.data?.[tab.value]?.count || 0;
                        return (
                          <Tab
                            sx={{
                              width: 'fit-content',
                            }}
                            key={tab.value}
                            value={tab.value}
                            label={`${t(`customers.${tab.label}`)} (${tabValue})`}
                          />
                        );
                      })}
                    </Tabs>
                  </Box>

                  {/* ========== TABS / content ========== */}
                  <TabPanel value={value} sx={{ px: 0, minHeight: '50vh' }}>
                    {/* <DragDropContext onDragEnd={handleOnDragEnd}> */}
                    {/* <Droppable droppableId="items"> */}
                    {/* {(provided) => ( */}
                    <Grid
                      // {...provided.droppableProps}
                      // ref={provided.innerRef}
                      container
                      spacing={2}
                    >
                      {loading.fetchCustomersList ? (
                        <>
                          <PaperLoading />
                          <PaperLoading />
                          <PaperLoading />
                        </>
                      ) : count > 0 ? (
                        listItems?.map((itemObj: any, index: number) => (
                          <CustomerPaper
                            item={itemObj}
                            index={index}
                            allowAction={allowAction}
                            setRemoveData={setRemoveData}
                            confirm={confirm}
                            toggleDrawerCommon={toggleDrawerCommon}
                          />
                        ))
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
                    </Grid>
                    {/* )} */}
                    {/* </Droppable> */}
                    {/* </DragDropContext> */}
                  </TabPanel>
                  {/* ========== PAGINATION ========== */}
                  <Box
                    sx={{
                      width: '100%',
                      display: 'flex',
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
                    )}
                  </Box>
                </TabContext>
              </Box>
            </Grid>
          </Grid>
        </Stack>

        {/* ========== CUSTOMERS DETAILS DRAWER ========== */}
        <CustomersDetailsDrawer
          open={openDetails}
          onClose={() => handleDrawerCloseCommon('details')}
          customerData={customer}
          loading={loading}
        />
        {/* ========== CUSTOMERS DRAWER / add - edit ========== */}
        <CustomersDrawer
          drawerOpen={openCreateCustomer}
          handleDrawerCloseCommon={() => handleDrawerCloseCommon('createOrEdit')}
          editCustomerId={editId}
          loading={loading}
          customerData={customerData}
          methods={methods}
          onSubmit={onSubmit}
          errorMsg={errorMsg}
          handleCustomerData={handleCustomerData}
        />

        {/* ========== ANALYTICS ========== */}
        <AnalyticsDialog
          openAnalytics={openAnalytics}
          handleDrawerCloseCommon={handleDrawerCloseCommon}
          analyticsData={response?.data}
          publishDate={domain?.data?.createdAt}
        />
        {/* ========== REMOVE CUSTOMER ========== */}
        <ConfirmDialog
          open={confirm.value}
          onClose={confirm.onFalse}
          noCancel={false}
          title={t('customers.delete_btn')}
          content={t('customers.delete_text')}
          action={
            <LoadingButton
              loading={loading.deleteCustomer}
              fullWidth
              color="error"
              variant="soft"
              size="large"
              onClick={() => removeCustomerFun()}
              sx={{ borderRadius: '30px' }}
            >
              {t('customers.delete_btn')}
            </LoadingButton>
          }
        />
      </RoleBasedGuard>
    </Container>
  );
}
