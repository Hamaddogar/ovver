// Next
import Link from 'next/link';
// My-Hooks
import { useLocales } from 'src/locales';
// My-Components
import AppHolder from './app-holder';
// Third-Party
import { Box, Typography } from '@mui/material';
// Data
import { paths } from 'src/routes/paths';
import { dashboardTools } from './data';

type Props = {};

const AppTools = (props: Props) => {
  // ################### CUSTOM HOOKS ###################
  const { t } = useLocales();

  return (
    <AppHolder
      title={t('home.tools')}
      subtitle={t('home.all_tools')}
      path={paths.dashboard.general.apptools}
    >
      {dashboardTools.map((item) => (
        <Link href={item.path} key={item.id} style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              width: '100%',
              maxnWidth: '100px',
              minWidth: '100px',
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
            <Typography variant="subtitle2" color="text.primary">
              {t(`dashboardTools.${item.title}`)}
            </Typography>
          </Box>
        </Link>
      ))}
    </AppHolder>
  );
};

export default AppTools;
