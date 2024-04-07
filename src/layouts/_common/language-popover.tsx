import { useCallback } from 'react';
// @mui
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
// locales
import { useLocales } from 'src/locales';
// components
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { Tooltip, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const locales = useLocales();

  const popover = usePopover();

  const handleChangeLang = useCallback(
    (newLang: string) => {
      locales.onChangeLang(newLang);
      popover.onClose();
    },
    [locales, popover]
  );

  return (
    <>
      <Tooltip title={locales.t('common.language')}>
        <IconButton
          onClick={popover.onOpen}
          sx={{
            borderRadius: '10000px',
            bgcolor: 'background.neutral',
            px: 1.4,
          }}
        >
          <Iconify icon="ic:sharp-language" sx={{ color: 'text.secondary' }} />
          <Typography
            sx={{
              color: 'text.primary',
              px: 1,
              fontWeight: '500',
              display: { xs: 'none', md: 'block' },
            }}
          >
            {locales.currentLang.label}
          </Typography>
          <Iconify icon="mingcute:down-fill" sx={{ color: 'text.secondary' }} />
        </IconButton>
      </Tooltip>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 160 }}>
        {locales.allLangs.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === locales.currentLang.value}
            onClick={() => handleChangeLang(option.value)}
          >
            <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} />

            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
