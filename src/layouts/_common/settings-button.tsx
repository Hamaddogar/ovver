import { m } from 'framer-motion';
// @mui
import { Theme, SxProps } from '@mui/material/styles';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
// components
import Iconify from 'src/components/iconify';
import { varHover } from 'src/components/animate';
import { useSettingsContext } from 'src/components/settings';
import { useLocales } from 'src/locales';
import { Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export default function SettingsButton({ sx }: Props) {
  const { t } = useLocales();

  const settings = useSettingsContext();

  return (
    <Badge
      color="error"
      variant="dot"
      invisible={!settings.canReset}
      sx={{
        [`& .${badgeClasses.badge}`]: {
          top: 8,
          right: 8,
        },
        ...sx,
      }}
    >
      <Box>
        <Tooltip title={t('common.settings')}>
          <IconButton
            // component={m.button}
            // whileTap="tap"
            // whileHover="hover"
            // variants={varHover(1.05)}
            aria-label={t('common.settings')}
            onClick={settings.onToggle}
            sx={{
              width: 40,
              height: 40,
            }}
          >
            <Iconify icon="mdi:gear" width={25} sx={{ color: 'text.disabled' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Badge>
  );
}
