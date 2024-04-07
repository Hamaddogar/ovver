// product information

import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// @mui
import { Grid, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import SectionTitle from '../section-title';
import { useLocales } from 'src/locales';
import { useState } from 'react';

export default function StepProductInformation({ languages }: any) {
  const { t } = useLocales();
  const [selectedLang, setSelectedLang] = useState('en');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  return (
    <Grid container justifyContent="space-between">
      {/* ========== TITLE ========== */}
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }} textTransform="capitalize">
        <SectionTitle title={t('products.create_product.information')} />
      </Grid>
      {/* ========== LANGUAGE SELECTOR ========== */}
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        <RHFSelect
          fullWidth
          variant="filled"
          name="language"
          onChange={(e) => {
            setSelectedLang(e.target.value);
          }}
          value={selectedLang}
        >
          {languages?.map((lang: any) => (
            <MenuItem key={lang.value} value={lang?.value}>
              {lang?.label}
            </MenuItem>
          ))}
        </RHFSelect>
      </Grid>
      {/* ========== INPUTS ========== */}
      <Grid
        item
        xs={12}
        sx={{
          mt: 4,
          px: 2,
        }}
      >
        {/* ========== name ========== */}
        <Stack
          sx={{
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.name', {
              lang: languages.find((lang: any) => lang.value === selectedLang).label,
            })}
          </Typography>
          <RHFTextField
            variant="filled"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Stack>
        {/* ========== description ========== */}
        <Stack
          sx={{
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.description', {
              lang: languages.find((lang: any) => lang.value === selectedLang).label,
            })}
          </Typography>
          <RHFTextField
            multiline
            rows={5}
            variant="filled"
            name="name"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
