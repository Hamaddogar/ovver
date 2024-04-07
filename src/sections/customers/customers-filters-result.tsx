// @mui
// import Box from '@mui/material/Box';
// // import Chip from '@mui/material/Chip';
// import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
// types
// import { IOrderTableFilters, IOrderTableFilterValue } from 'src/types/order';
// components
import Iconify from 'src/components/iconify';
// import { shortDateLabel } from 'src/components/custom-date-range-picker';
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = StackProps & {
  // filters: IOrderTableFilters;
  // onFilters: (name: string, value: IOrderTableFilterValue) => void;
  //
  // onResetFilters: VoidFunction;

  setQuery: any;
};

export default function CustomersFiltersResult({
  // filters,
  // onFilters,

  setQuery,
  // onResetFilters,

  ...other
}: Props) {
  const { t } = useLocales();
  // const shortLabel = shortDateLabel(filters.startDate, filters.endDate);

  // const handleRemoveStatus = () => {
  //   onFilters('status', 'all');
  // };

  // const handleRemoveDate = () => {
  //   onFilters('startDate', null);
  //   onFilters('endDate', null);
  // };
  return (
    <Stack spacing={1.5} {...other}>
      <Stack
        flexGrow={1}
        spacing={1}
        direction="row"
        flexWrap="wrap"
        alignItems="center"
        textTransform="capitalize"
      >
        {/* {filters.status !== 'all' && (
          <Block label="Status:">
            <Chip size="small" label={filters.status} onDelete={handleRemoveStatus} />
          </Block>
        )} */}

        {/* {filters.startDate && filters.endDate && (
          <Block label="Date:">
            <Chip size="small" label={shortLabel} onDelete={handleRemoveDate} />
          </Block>
        )} */}

        <Button
          color="error"
          onClick={() => setQuery('')}
          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
        >
          {t('common.clear')}
        </Button>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

// type BlockProps = StackProps & {
//   label: string;
// };

// function Block({ label, children, sx, ...other }: BlockProps) {
//   return (
//     <Stack
//       component={Paper}
//       variant="outlined"
//       spacing={1}
//       direction="row"
//       sx={{
//         p: 1,
//         borderRadius: 1,
//         overflow: 'hidden',
//         borderStyle: 'dashed',
//         ...sx,
//       }}
//       {...other}
//     >
//       <Box component="span" sx={{ typography: 'subtitle2' }}>
//         {label}
//       </Box>

//       <Stack spacing={1} direction="row" flexWrap="wrap">
//         {children}
//       </Stack>
//     </Stack>
//   );
// }