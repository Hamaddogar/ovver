// import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
// import MenuItem from '@mui/material/MenuItem';
// types
// import { IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';
// components
// import Iconify from 'src/components/iconify';
// import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { SearchBar } from 'src/components/dashboard/search-bar';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = {
  // filters: IOrderTableFilters;
  // onFilters: (name: string, value: IOrderTableFilterValue) => void;
  query: string;
  setQuery: any;
  // sort: string;
  // onSortChange: Function;
  // canReset: boolean;
  // onResetFilters: VoidFunction;
};

export default function CustomersTableToolbar({
  // filters,
  // onFilters,
  setQuery,
  query,
  // sort,
  // onSortChange,
  // canReset,
  // onResetFilters,
}: Props) {
  // const popover = usePopover();
  const { t } = useLocales();

  // const canSortBy = [
  //   { title: t('customers.custom_sort'), value: 'custom' },
  //   { title: t('customers.-createdAt'), value: '-createdAt' },
  //   { title: t('customers.createdAt'), value: 'createdAt' },
  // ];

  // const handleFilterName = useCallback(
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     onFilters('name', event.target.value);
  //   },
  //   [onFilters]
  // );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
        sx={{
          p: 2.5,
          // pr: { xs: 2.5, md: 1 },
          // pl: { xs: 2.5, md: 1 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          {/* ========== SEARCH ========== */}
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder={t('customers.search_placeholder')}
          />

          {/* ========== SORT ========== */}
          {/* <SortDropdown selectedOption={sort} options={canSortBy} onChange={onSortChange} /> */}

          {/* ========== FILTER ========== */}
          {/* <Tooltip title={t('common.filter')}>
            <Button
              variant="soft"
              style={{
                backgroundColor: 'background.default',
              }}
              sx={{
                borderRadius: '16px',
                padding: '15px 15px',
              }}
            >
              <Box component="img" src="/raw/filter.svg" />
            </Button>
          </Tooltip> */}

          {/* ========== OPTIONS BUTTON ========== */}
          {/* <Tooltip title={t('common.options')}>
            <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
          </Tooltip> */}
        </Stack>

        {/* ========== RESET ========== */}
        {/* {canReset && (
          <Button
            color="error"
            sx={{ flexShrink: 0 }}
            onClick={onResetFilters}
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
          >
            Clear
          </Button>
        )} */}
      </Stack>

      {/* ========== OPTIONS MENU ========== */}
      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover> */}
    </>
  );
}

// {/* ========== SEARCH ========== */}
//  <TextField
//             placeholder="Search by order ID, phone or customer..."
//             fullWidth
//             variant="filled"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Box component="img" src="/raw/search.svg" sx={{ width: '15px' }} />
//                 </InputAdornment>
//               ),
//             }}
//             sx={{
//               borderRadius: '16px',
//               '& .MuiFilledInput-root': {
//                 borderRadius: '16px',
//               },
//               '& .MuiInputAdornment-root': {
//                 marginTop: '0px !important',
//                 paddingLeft: '10px',
//               },
//               '& input': {
//                 color: '#8898AA',
//                 paddingLeft: '10px',
//                 fontSize: '14px',
//                 padding: '15px 20px 15px 0px !important',
//               },
//             }}
//           />

// {/* ========== SORT ========== */}
// <Button
// variant="contained"
// sx={{
//   backgroundColor: 'rgb(15, 19, 73,.04)',
//   borderRadius: '16px',
//   padding: '15px 15px',
// }}
// >
// <Box component="img" src="/raw/sort.svg" />
// </Button>
