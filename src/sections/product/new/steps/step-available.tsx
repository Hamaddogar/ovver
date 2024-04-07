// AVAILABLE

import { Box, Grid, Stack, Switch, Typography } from '@mui/material';
import { useLocales } from 'src/locales';
import SectionTitle from '../section-title';

export default function StepAvailable() {
  const { t } = useLocales();

  return (
    <Grid container>
      <Grid item xs={12} md={6} xl={4} sx={{ px: 2 }} textTransform="capitalize">
        <SectionTitle title={t('products.create_product.available_title')} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 4,
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
              {t('products.create_product.on_mobile')}
            </Typography>
          </Stack>
          <Switch />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mt: 4,
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
              {t('products.create_product.on_website')}
            </Typography>
          </Stack>
          <Switch />
        </Box>
      </Grid>
    </Grid>
  );
}
