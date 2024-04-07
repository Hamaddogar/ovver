'use client';

// components
import DetailsNavBar from 'src/sections/orders/DetailsNavBar';
import { CUSTOM_DRAWER, HEADER } from 'src/layouts/config-layout';
import { ReactNode } from 'react';
import { Backdrop } from '@mui/material';

type Props = {
  children: ReactNode;
  actions?: ReactNode;
  title: string;
  open: boolean;
  onClose: Function;
  other?: any;
  drawerWidth?: string;
};

export default function CustomDrawer({
  children,
  actions,
  title,
  open,
  onClose,
  drawerWidth,
  ...other
}: Props) {
  const styles = {
    drawer: {
      width: open
        ? { xs: '100%', md: `calc(${drawerWidth || CUSTOM_DRAWER.W_DESKTOP}px - 15px)` }
        : '0px',
      top: {
        xs: HEADER.H_MOBILE,
        lg: HEADER.H_DESKTOP_OFFSET,
      },
      zIndex: '10',
      position: { xs: 'fixed', md: 'static' },
      flexShrink: 0,
    },
    drawerPaper: {
      boxShadow: '0px -6px 40px #00000014',
      height: {
        xs: `calc(100dvh - ${HEADER.H_MOBILE}px)`,
        lg: `calc(100dvh - ${HEADER.H_DESKTOP_OFFSET}px)`,
      },
      top: {
        xs: HEADER.H_MOBILE,
        lg: HEADER.H_DESKTOP_OFFSET,
        // md: HEADER.H_DESKTOP,
      },
      width: { xs: '100%', md: `${drawerWidth || CUSTOM_DRAWER.W_DESKTOP}px` },
    },
  };
  return (
    <>
      <DetailsNavBar
        {...other}
        sx={styles.drawer}
        variant="persistent"
        // PaperProps={{ sx: styles.drawerPaper }}
        open={open}
        onClose={onClose()}
        title={title}
        actions={actions}
      >
        {children}
      </DetailsNavBar>
      {open && <Backdrop sx={{ bgcolor: 'transparent' }} open onClick={onClose()} />}
    </>
  );
}
