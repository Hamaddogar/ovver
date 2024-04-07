import Button from '@mui/material/Button';
import Stack, { StackProps } from '@mui/material/Stack';
// components
import Iconify from 'src/components/iconify';
// utils
import { useLocales } from 'src/locales';

// ----------------------------------------------------------------------

type Props = StackProps & {
  setQuery: any;
};

export default function BrandsFiltersResult({ setQuery, ...other }: Props) {
  const { t } = useLocales();

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
