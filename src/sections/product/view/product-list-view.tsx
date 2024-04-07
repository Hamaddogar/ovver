'use client';

import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';
// @mui
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableSkeleton,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
// types
import { IProductItem, IProductTableFilters, IProductTableFilterValue } from 'src/types/product';
//
import ProductTableRow from '../product-table-row';
import { useSelector } from 'react-redux';
import { fetchProductsList } from 'src/redux/store/thunks/products';
import { useDispatch } from 'react-redux';
import { Grid, Stack } from '@mui/material';
import { useLocales } from 'src/locales';
import ProductsTableToolbar from './product-toolbar';
import CustomCrumbs from 'src/components/custom-crumbs';
import { BottomActions } from 'src/components/bottom-actions';

// ----------------------------------------------------------------------

const defaultFilters: IProductTableFilters = {
  name: '',
  price: 0,
  quantity: 0,
  publish_app: true,
  publish_website: true,
  stock: [],
};

// ----------------------------------------------------------------------

export default function ProductListView() {
  const router = useRouter();
  const { t } = useLocales();
  const table = useTable();

  const TABLE_HEAD = [
    { id: 'name', label: t('products.name') },
    { id: 'price', label: t('products.price'), width: 140 },
    { id: 'quantity', label: t('products.quantity'), width: 140 },
    { id: 'sorting', label: t('products.sorting'), width: 140 }, // TODO: sort??!!!!!!!
    { id: 'publish_web', label: t('products.publish_web'), width: 140 },
    { id: 'publish_mobile', label: t('products.publish_mobile'), width: 140 },
    { id: 'actions', label: t('products.actions'), width: 110 },
  ];

  const [tableData, setTableData] = useState<IProductItem[]>([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [products, setProducts] = useState([]);
  // const { products, productsLoading, productsEmpty } = useGetProducts();
  const { builder, loading: builderLoading } = useSelector((state: any) => state.builder);
  const { list, errors, brand, loading, count } = useSelector((state: any) => state.products);

  // console.log('products', list);

  const confirm = useBoolean();

  const dispatch = useDispatch();

  useEffect(() => {
    // TODO: ANYYYY
    dispatch(fetchProductsList() as any).then((res: any) => {
      // console.log('res: ', res?.payload?.data?.data);
      if (res?.payload?.data?.count > 0) {
        setTableData(res?.payload?.data?.data);
      }
    });
  }, [list]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters,
  });

  const dataInPage = dataFiltered.slice(
    table.page * table.rowsPerPage,
    table.page * table.rowsPerPage + table.rowsPerPage
  );

  const denseHeight = 80;

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = (!dataFiltered.length && canReset) || list.length;

  const handleFilters = useCallback(
    (name: string, value: IProductTableFilterValue) => {
      table.onResetPage();
      setFilters((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [table]
  );

  const handleDeleteRow = useCallback(
    (id: string) => {
      const deleteRow = tableData.filter((row) => row.id !== id);
      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRows: tableData.length,
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.products.details(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id: string) => {
      router.push(paths.dashboard.products.details(id));
    },
    [router]
  );

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  return (
    <>
      <Container maxWidth={false}>
        {/* ========== TITLE & ADD BUTTON ========== */}
        <Grid
          container
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
        >
          {/* ===== TITLE ===== */}
          <Grid item>
            <CustomCrumbs
              heading={t('products.products')}
              crums={false}
              // links={[
              //   { name: 'Dashboard', href: paths.dashboard.root },
              //   {
              //     name: 'Product',
              //     href: paths.dashboard.products.root,
              //   },
              //   { name: 'List' },
              // ]}
              // action={
              //   <Button
              //     component={RouterLink}
              //     href={paths.dashboard.products.new}
              //     fullWidth
              //     variant="contained"
              //     color={'primary'}
              //     sx={{ py: 1, px: 5, fontWeight: 700, borderRadius: '30px' }}
              //     startIcon={<Iconify icon="mingcute:add-line" />}
              //   >
              //     {t('products.add_product')}
              //   </Button>
              // }
              sx={{ textTransform: 'capitalize' }}
            />
          </Grid>
          {/* ===== ADD BUTTON ===== */}
          <Grid item>
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
                  component={RouterLink}
                  href={paths.dashboard.products.new}
                  variant="contained"
                  color="primary"
                >
                  {t('products.add_product')}
                </Button>
              </Stack>
            </BottomActions>
          </Grid>
        </Grid>

        {/* ========== SEARCH & SORT & FILTER ========== */}
        <ProductsTableToolbar query="" setQuery={() => {}} />

        {/* ========== PRODUCTS TABLE ========== */}
        <Card>
          {/* <ProductTableToolbar
            filters={filters}
            onFilters={handleFilters}
            //
            stockOptions={PRODUCT_STOCK_OPTIONS}
            publishOptions={PUBLISH_OPTIONS}
          /> */}

          {/* ========== RESET FILTERS?? ========== */}
          {/* {canReset && (
            <ProductTableFiltersResult
              filters={filters}
              onFilters={handleFilters}
              //
              onResetFilters={handleResetFilters}
              //
              results={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )} */}

          {/* ========== TABLE CONTAINER ========== */}
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            {/* ========== MULTIBLE SELECTION???? ========== */}
            {/* <TableSelectedAction
              dense={false}
              numSelected={table.selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            /> */}
            {/* ========== TABLE START ========== */}
            <Scrollbar>
              <Table stickyHeader size={'medium'} sx={{ minWidth: 960 }}>
                {/* ========== TABLE HEADER ========== */}
                <TableHeadCustom
                  sx={{ insetInlineStart: 0 }}
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  onSelectAllRows={(checked) =>
                    table.onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                {/* ========== TABLE BODY ========== */}
                <TableBody>
                  {loading ? (
                    [...Array(table.rowsPerPage)].map((i, index) => (
                      <TableSkeleton key={index} sx={{ height: denseHeight }} />
                    ))
                  ) : (
                    <>
                      {dataFiltered
                        .slice(
                          table.page * table.rowsPerPage,
                          table.page * table.rowsPerPage + table.rowsPerPage
                        )
                        // ========== TABLE ROW ==========
                        .map((row) => (
                          <ProductTableRow
                            key={row.id}
                            row={row}
                            selected={table.selected.includes(row.id)}
                            onSelectRow={() => table.onSelectRow(row.id)}
                            onDeleteRow={() => handleDeleteRow(row.id)}
                            onEditRow={() => handleEditRow(row.id)}
                            onViewRow={() => handleViewRow(row.id)}
                          />
                        ))}
                    </>
                  )}

                  {/* ========== TABLE EMPTY ========== */}
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          {/* ========== TABLE PAGINATION ========== */}
          <TablePaginationCustom
            count={dataFiltered.length}
            page={table.page}
            rowsPerPage={table.rowsPerPage}
            onPageChange={table.onChangePage}
            onRowsPerPageChange={table.onChangeRowsPerPage}
          />
        </Card>
      </Container>

      {/* ========== DELETE CONFIRM DIALOG ========== */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filters,
}: {
  inputData: IProductItem[];
  comparator: (a: any, b: any) => number;
  filters: IProductTableFilters;
}) {
  const { name, price, quantity, publish_app, publish_website } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (product) => product.title.localized.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  // if (price) {
  //   inputData = inputData.filter((product) => price.includes(product.sellPrice));
  // }

  // if (publish_app) {
  //   inputData = inputData.filter((product) => publish_app.includes(product.publish_app));
  // }
  // if (publish_website) {
  //   inputData = inputData.filter((product) => publish_website.includes(product.publish_website));
  // }

  return inputData;
}
