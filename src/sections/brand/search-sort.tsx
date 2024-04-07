import { Stack } from '@mui/material';
import { BrandSorts } from './view/brand-view';
import { useLocales } from 'src/locales';
import { SearchBar } from 'src/components/dashboard/search-bar';
import { SortDropdown } from 'src/components/dashboard/sort-dropdown';

type Props = {
  query: string;
  sort: BrandSorts;
  onChange: Function;
  setQuery: Function;
};
export default function SearchSort({ query, sort, onChange, setQuery }: Props) {
  const { t } = useLocales();
  const canSortBy = [
    { title: t('brand.custom_sort'), value: 'custom' },
    { title: t('brand.-createdAt'), value: '-createdAt' },
    { title: t('brand.createdAt'), value: 'createdAt' },
  ];

  return (
    <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1, p: 2.5 }}>
      {/* ===== SEARCH ===== */}
      <SearchBar placeholder={t('brand.search_placeholder')} value={query} onChange={setQuery} />

      {/* ===== SORT ===== */}
      {/* <SortDropdown selectedOption={sort} options={canSortBy} onChange={onChange} /> */}
    </Stack>
  );
}
