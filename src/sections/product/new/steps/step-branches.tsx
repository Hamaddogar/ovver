// BRANCHES

import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from '@mui/material';
import { useLocales } from 'src/locales';
import SectionTitle from '../section-title';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';

export default function StepBranches() {
  const { t } = useLocales();
  const [allBranches, setAllBranches] = useState(true);

  return (
    <Grid container>
      <Grid item xs={12} md={6} xl={4} sx={{ px: 2 }} textTransform="capitalize">
        {/* ========== TITLE ========== */}
        <SectionTitle title={t('products.create_product.branches')} />
        {/* ========== ALL BRANCHES SWITCH ========== */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            my: 4,
          }}
        >
          <Stack>
            <Typography
              component="p"
              noWrap
              variant="body1"
              sx={{
                opacity: 0.7,
                fontSize: '1.2rem',
                display: 'flex',
              }}
            >
              {t('products.create_product.available')}
            </Typography>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{
                fontSize: '1.2rem',
                display: 'flex',
              }}
            >
              {t('products.create_product.all_branches')}
            </Typography>
          </Stack>
          <Switch value={allBranches} onChange={() => setAllBranches((prev) => !prev)} />
        </Box>
        {/* ========== BRANCHES ========== */}
        {allBranches && (
          <>
            <Typography
              component="p"
              noWrap
              variant="body1"
              sx={{
                opacity: 0.7,
                fontSize: '1.2rem',
                display: 'flex',
              }}
            >
              {t('products.create_product.branches')}
            </Typography>
            {/* ===== BRANCHES LIST ===== */}
            <Branches />
          </>
        )}
      </Grid>
    </Grid>
  );
}

function Branches() {
  const { t } = useLocales();
  const [branches, setBranches] = useState(['']);

  const handleInputChange = (index: number, event: any) => {
    const values = [...branches];
    values[index] = event.target.value;
    setBranches(values);
  };

  const handleRemoveClick = (index: number) => {
    const values = [...branches];
    values.splice(index, 1);
    setBranches(values);
  };

  const handleAddClick = () => {
    setBranches([...branches, '']);
  };

  return (
    <Stack gap={2}>
      {branches.map((branch, index) => (
        <Box key={index}>
          <RHFTextField
            name=""
            variant="filled"
            value={branch}
            onChange={(event) => handleInputChange(index, event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Tooltip title={t('products.create_product.remove_branch')}>
                    <IconButton onClick={() => handleRemoveClick(index)}>
                      <Iconify icon="material-symbols:close-small" color="error.main" />
                    </IconButton>
                  </Tooltip>
                </InputAdornment>
              ),
            }}
          />
        </Box>
      ))}
      {/* ===== ADD BRANCH BUTTON ===== */}
      <Tooltip title={t('products.create_product.add_branch')}>
        <Button
          onClick={handleAddClick}
          variant="soft"
          sx={{ width: 'fit-content', p: 2, borderRadius: 2 }}
        >
          <Iconify icon="pajamas:plus" />
        </Button>
      </Tooltip>
    </Stack>
  );
}
