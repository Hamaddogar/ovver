import { Box, Grid, Typography, alpha, useTheme } from '@mui/material';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify/iconify';
import { useLocales } from 'src/locales';
import { fNumber } from 'src/utils/format-number';

type Props = {
  openAnalytics: boolean;
  handleDrawerCloseCommon: Function;
  analyticsData: any;
  publishDate: string;
};

export default function AnalyticsDialog({
  openAnalytics,
  handleDrawerCloseCommon,
  analyticsData,
  publishDate,
}: Props) {
  const { t } = useLocales();
  const theme = useTheme();

  const data = analyticsData?.data;
  const sections = [
    {
      icon: 'noto:smiling-face-with-sunglasses',
      count: data?.Super?.count,
      percentage: data?.Super?.percentage,
      title: t('customers.Super'),
      description: t('customers.super_desc'),
      bgColor: alpha(theme.palette.warning.main, 0.08),
    },
    {
      icon: 'noto:star-struck',
      count: data?.Loyal?.count,
      percentage: data?.Loyal?.percentage,
      title: t('customers.Loyal'),
      description: t('customers.loyal_desc'),
      bgColor: 'background.neutral',
    },
    {
      icon: 'noto:sleeping-face',
      count: data?.NotActive?.count,
      percentage: data?.NotActive?.percentage,
      title: t('customers.Not Active'),
      description: t('customers.not_active_desc'),
      bgColor: alpha(theme.palette.error.main, 0.08),
    },
    {
      icon: 'noto:crown',
      count: data?.Champions?.count,
      percentage: data?.Champions?.percentage,
      title: t('customers.Champions'),
      description: t('customers.champions_desc'),
      bgColor: alpha(theme.palette.primary.main, 0.08),
    },
    {
      icon: 'noto:wilted-flower',
      count: data?.Need_Attention?.count,
      percentage: data?.Need_Attention?.percentage,
      title: t('customers.Need_Attention'),
      description: t('customers.need_attention_desc'),
      bgColor: alpha(theme.palette.warning.main, 0.08),
    },
    {
      icon: 'noto:nerd-face',
      count: data?.Promising?.count,
      percentage: data?.Promising?.percentage,
      title: t('customers.Promising'),
      description: t('customers.promising_desc'),
      bgColor: alpha(theme.palette.primary.main, 0.08),
    },
    // Add more sections here...
  ];

  return (
    <ConfirmDialog
      open={openAnalytics}
      onClose={handleDrawerCloseCommon('analytics')}
      noCancel={false}
      maxWidth="md"
      content={
        <Grid container spacing={2} textTransform="capitalize">
          <Grid item xs={12} md={12}>
            <CustomCrumbs
              heading={t('customers.analytics_heading')}
              description={t('customers.analytics_description')}
              crums={false}
            />
          </Grid>

          {/* ===== TOTAL CUSTOMERS ===== */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: 'background.neutral',
                minHeight: '160px',
                borderRadius: '16px',
                padding: '32px',
                backgroundImage: 'url(/raw/added.svg)',
                backgroundPosition: 'right bottom',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Typography
                component="h6"
                variant="subtitle2"
                sx={{ fontSize: '.9rem', fontWeight: 700 }}
              >
                {t('customers.total_customers')}
              </Typography>
              <Typography component="h4" variant="h2">
                {fNumber(analyticsData?.data?.totalUserCount)}
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.6, fontSize: '.7rem', color: 'text.secondary' }}
              >
                {t('customers.since_published', {
                  date: publishDate?.split('T')[0].replaceAll('-', '/'),
                })}
              </Typography>
            </Box>
          </Grid>

          {/* ===== NEW ===== */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                bgcolor: 'background.neutral',
                minHeight: '160px',
                borderRadius: '16px',
                padding: '32px',
                backgroundImage: 'url(/raw/addedd.svg)',
                backgroundPosition: 'right bottom',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <Typography
                component="h6"
                variant="subtitle2"
                sx={{ fontSize: '.9rem', fontWeight: 700 }}
              >
                {t('customers.New')} ({analyticsData?.data?.New?.percentage}%)
              </Typography>
              <Typography component="h4" variant="h2">
                {fNumber(analyticsData?.data?.New?.count)}
              </Typography>
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ opacity: 0.6, fontSize: '.7rem', color: 'text.secondary' }}
              >
                {t('customers.new_desc')}
              </Typography>
            </Box>
          </Grid>
          {/* ========== STATS ========== */}
          <Grid item>
            <Grid container spacing={2} justifyContent="stretch" alignItems="stretch">
              {sections.map((section, index) => (
                <Grid key={index} item xs={6} md={4}>
                  <Box
                    sx={{
                      bgcolor: section.bgColor,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      minHeight: '160px',
                      height: '100%',
                      borderRadius: '16px',
                      padding: '32px',
                      textAlign: 'center',
                    }}
                  >
                    <Box>
                      <Box>
                        <Iconify icon={section.icon} />
                      </Box>
                      <Typography
                        component="h6"
                        variant="subtitle2"
                        sx={{ fontSize: '1.5rem', fontWeight: 800 }}
                      >
                        {fNumber(section.count)}
                      </Typography>
                      <Typography
                        component="p"
                        variant="subtitle2"
                        sx={{ fontSize: '.7rem', fontWeight: 900 }}
                      >
                        {section.title} ({section.percentage}%)
                      </Typography>
                    </Box>

                    <Typography
                      component="p"
                      variant="subtitle2"
                      sx={{ opacity: 0.6, fontSize: '.7rem' }}
                    >
                      {section.description}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      }
    />
  );
}
