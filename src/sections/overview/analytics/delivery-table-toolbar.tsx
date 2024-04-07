import { useCallback } from 'react';
// @mui
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// types
import { IUserTableFilters, IUserTableFilterValue } from 'src/types/user';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { allLangs, useLocales } from 'src/locales';
import { Grid } from '@mui/material';
import { width } from '@mui/system';

// ----------------------------------------------------------------------

type Props = {
  filters: IUserTableFilters;
  onFilters: (name: string, value: IUserTableFilterValue) => void;
  //
  roleOptions: string[];
};

export default function UserTableToolbar({
  filters,
  onFilters,
  //
  roleOptions,
}: Props) {
  const popover = usePopover();
  const { t } = useLocales();
  const handleFilterName = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFilters('name', event.target.value);
    },
    [onFilters]
  );

  const handleFilterRole = useCallback(
    (event: SelectChangeEvent<string[]>) => {
      onFilters(
        'role',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

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
          pr: { xs: 2.5, md: 1 },
        }}
      >
        
         <Grid
            container
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
              <Grid item xs={12} sm={10} textAlign={{ xs: 'center', sm: 'right' }}>
          <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
            <TextField
             sx={{width:"50%"}}
              value={filters.name}
              onChange={handleFilterName}
              placeholder="Search..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* <IconButton onClick={popover.onOpen}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton> */}
          </Stack>
        </Grid>
        <Grid item xs={12} sm={2} textAlign={{ xs: 'end', sm: 'right' }}>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems="center"
            justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}
            spacing="10px"
            sx={{ width: 'fit-content' }}
          >
            <Button
              startIcon={ <Iconify icon="solar:export-bold" />}
              fullWidth
              sx={{ borderRadius: '30px', textTransform: 'capitalize', py: 1 }}
              component="button"
              variant="contained"
              color="primary"

            >
              {t('delvery.export_to_excel')}
            </Button>
          </Stack>

        </Grid>
      
        </Grid>
      </Stack>

      <CustomPopover
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
      </CustomPopover>
    </>
  );
}
