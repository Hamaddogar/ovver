// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Button from '@mui/material/Button';
// routes
import { RouterLink } from 'src/routes/components';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function LoginButton({ sx }: Props) {
  return (
    <Button component={RouterLink} href={paths.auth.jwt.checkUser} variant="outlined" sx={{ mr: 1, ...sx }}>
      Login
    </Button>
  );
}
