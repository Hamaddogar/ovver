'use client';

import { useEffect, useState } from 'react';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
import { useAuthContext } from 'src/auth/hooks';
// components
import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';
import { usePathname } from 'src/routes/hooks';
import { NavSectionVertical } from 'src/components/nav-section';
//
import { HEADER, NAV } from '../config-layout';
import { useNavData } from './config-navigation';
import {
  NavToggleButton,
  // NavUpgrade
} from '../_common';

// ----------------------------------------------------------------------

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const [currentPermission, setCurrentPermission] = useState<any>([]);
  const [currentRole, setCurrentRole] = useState<any>([]);
  // const { user } = useMockedUser();
  const { user } = useAuthContext();

  useEffect(() => {
    if (user) {
      setCurrentRole(user?.roles);
      setCurrentPermission(user?.permissions);
    }
  }, [user]);

  const pathname = usePathname();

  const lgUp = useResponsive('up', 'lg');

  const { navData, navLinks } = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        bgcolor: 'background.paper',
        pt: 1.5,
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* <Logo sx={{ mt: 3, ml: 4, mb: 1 }} /> */}

      <NavSectionVertical
        // data={navData}
        data={navLinks}
        config={{
          // currentRole: user?.role || 'admin',
          // currentRoles: user?.roles || [],
          // currentPermissions: user?.permissions || [],
          currentRoles: currentRole,
          currentPermissions: currentPermission,
        }}
      />

      <Box sx={{ flexGrow: 1, pb: 10 }} />

      {/* <NavUpgrade /> */}
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_VERTICAL },
        bgcolor: 'background.paper',
      }}
    >
      {/* <NavToggleButton /> */}

      {lgUp ? (
        <Stack
          sx={{
            height: 1,
            position: 'fixed',
            paddingTop: `${HEADER.H_DESKTOP_OFFSET}px`,
            width: NAV.W_VERTICAL,
            // borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
            boxShadow: '0px -6px 40px #00000014',
          }}
        >
          {renderContent}
        </Stack>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.W_VERTICAL,
              bgcolor: 'Background.paper',
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
