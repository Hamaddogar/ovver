'use client';

// Next
import Link from 'next/link';
// Third-Party
import { Box, Grid, Typography } from '@mui/material';
import Container from '@mui/material/Container';
// My-Hooks
import { useLocales } from 'src/locales';
// Data
import { dashboardTools } from '../../app/data';
import { useSettingsContext } from 'src/components/settings';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';

export default function Tools() {
  const settings = useSettingsContext();
  // ################### CUSTOM HOOKS ###################
  const { t } = useLocales();

  return (
    <Container maxWidth={false}>
      <CustomCrumbs heading={t('tools.website_tools')} description={t('tools.description')} />
      <Grid container spacing={2} mt={2}>
        {dashboardTools.map((item) => (
          <Grid item key={item.id} xs={6} sm={4} md={3}>
            <Link href={item.path} key={item.id} style={{ textDecoration: 'none' }}>
              <Box
                sx={{
                  width: '100%',
                  height: '120px',
                  backgroundColor: item.color,
                  borderRadius: '16px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '15px',
                  flexDirection: 'column',
                }}
              >
                <Box component="img" src={item.icon} sx={{ width: '29px' }} />
                <Typography
                  variant="subtitle2"
                  color="text.primary"
                  sx={{ whiteSpace: 'pre-line', fontSize: '14px', fontWeight: 700 }}
                >
                  {t(`dashboardTools.${item.title}`)}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
