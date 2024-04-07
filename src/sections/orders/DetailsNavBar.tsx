import { ReactNode } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Drawer, { DrawerProps } from '@mui/material/Drawer';
// components
import Scrollbar from 'src/components/scrollbar';
//

// ----------------------------------------------------------------------

type Props = DrawerProps & {
  title?: string;
  children: ReactNode;
  onClose?: (event: React.SyntheticEvent | React.KeyboardEvent) => void;
  actions?: ReactNode;
  details?: any;
};

export default function DetailsNavBar({
  details,
  open,
  onClose,
  title,
  children,
  actions,
  ...other
}: Props) {
  return (
    <Drawer
      sx={{
        zIndex: '1',
      }}
      open={open}
      onClose={onClose}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{
        sx: {
          width: { xs: '100%', md: '380px' },
          height: {
            lg: `calc(100% - 85px)`,
            md: 'calc(100% - 65px)',
            sm: 'calc(100% - 60px)',
            xs: 'calc(100% - 60px)',
          },
          borderRadius: '20px',
          marginTop: {
            lg: '80px',
            md: '65px',
            sm: '60px',
            xs: '60px',
          },
        },
      }}
      {...other}
    >
      <Scrollbar sx={{ height: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>
            {' '}
            {title}{' '}
          </Typography>
          <Box
            component="img"
            src="/raw/X-white.svg"
            sx={{ opacity: 0.7, '&:hover': { opacity: 1 }, cursor: 'pointer' }}
            onClick={onClose}
          />
        </Stack>
        <Stack sx={{ p: 2.5 }} spacing="20px" alignItems="center" justifyContent="space-between">
          {children}
        </Stack>
      </Scrollbar>
      {!!actions && <Box sx={{ p: 2.5 }}>{actions}</Box>}
    </Drawer>
  );
}
