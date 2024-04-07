import { m } from 'framer-motion';
// @mui
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// routes
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
// hooks
import { useMockedUser } from 'src/hooks/use-mocked-user';
// auth
import { useAuthContext } from 'src/auth/hooks';
// components
import { varHover } from 'src/components/animate';
import { useSnackbar } from 'src/components/snackbar';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import Iconify from 'src/components/iconify';
import { useLocales } from 'src/locales';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchMyUser } from 'src/redux/store/thunks/user';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { t } = useLocales();

  const OPTIONS = [
    {
      label: t('common.account.home'),
      linkTo: paths.dashboard.root,
    },
    {
      label: t('common.account.profile'),
      linkTo: paths.dashboard.user.root,
    },
    {
      label: t('common.account.settings'),
      linkTo: paths.dashboard.user.account,
    },
  ];
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { user: mockUser } = useMockedUser();

  const { logout, user } = useAuthContext();
  const { user: realUser } = useSelector((state: any) => state.user);
  useEffect(() => {
    dispatch(fetchMyUser());
  }, []);

  // TODO: remove mock data
  const userData = {
    name: realUser?.fullName || mockUser?.displayName,
    email: realUser?.email || mockUser?.email,
    img: realUser?.image || mockUser?.photoURL,
  };

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.replace('/');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        // whileTap="tap"
        // whileHover="hover"
        // variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          color: 'text.primary',
          borderRadius: '10000px',
        }}
      >
        <Avatar
          src={userData.img}
          alt={userData.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        />
        <Typography
          sx={{
            px: 0.5,
            fontWeight: '500',
            textTransform: 'capitalize',
            display: { xs: 'none', md: 'block' },
          }}
        >
          {userData.name}
        </Typography>
        <Iconify icon="mingcute:down-fill" sx={{ color: 'text.secondary' }} />
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0, textTransform: 'capitalize' }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {userData.name}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: 'text.secondary', textTransform: 'none' }}
            noWrap
          >
            {userData.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={() => handleClickItem(option.linkTo)}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: 'fontWeightBold', color: 'error.main' }}
        >
          {t('common.account.logout')}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
