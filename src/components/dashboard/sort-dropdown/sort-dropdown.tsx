'uses client';

import { useCallback, useState } from 'react';
import { Box, Button, Menu, MenuItem, Tooltip } from '@mui/material';
import { useLocales } from 'src/locales';

type Option = { title: string; value: string };
type Props = {
  selectedOption: string;
  options: Option[];
  onChange: Function;
};

export default function SortDropdown({ selectedOption, options, onChange }: Props) {
  const { t } = useLocales();
  const [isOpen, setIsOpen] = useState<null | HTMLElement>(null);
  const handleOpen = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setIsOpen(event.currentTarget);
  }, []);

  const handleSelect = (value?: string) => (e: any) => {
    onChange(value);
    setIsOpen(null);
  };

  return (
    <Box>
      <Tooltip title={t('common.sort')}>
        <Button
          id="sort-button"
          aria-controls="sort-menu"
          aria-haspopup="true"
          aria-expanded={isOpen ? 'true' : undefined}
          variant="soft"
          onClick={handleOpen}
          style={{
            backgroundColor: 'background.default',
          }}
          sx={{
            borderRadius: '16px',
            padding: '15px 15px',
          }}
        >
          <Box component="img" src="/raw/sort.svg" />
        </Button>
      </Tooltip>
      <Menu
        id="sort-menu"
        aria-labelledby="sort-button"
        anchorEl={isOpen}
        onClose={() => setIsOpen(null)}
        open={Boolean(isOpen)}
      >
        {Object.keys(options).map((option: any) => (
          <MenuItem
            key={options[option].value}
            sx={{
              px: 3,
              textTransform: 'capitalize',
              textAlign: 'center',
              width: 'auto',
              display: 'block',
            }}
            selected={options[option].value === selectedOption}
            onClick={handleSelect(options[option].value)}
          >
            {options[option].title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
