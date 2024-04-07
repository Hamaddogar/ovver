import { InputAdornment, TextField } from '@mui/material';
import { ChangeEventHandler } from 'react';

type Props = {
  name?: string;
  variant?: 'filled' | 'outlined' | 'standard';
  value?: string;
  onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> | undefined;
};
export default function RHFColorSelector({ name, value, variant = 'filled', onChange }: Props) {
  return (
    <TextField
      variant={variant || 'filled'}
      sx={{
        width: '100%',
      }}
      name={name}
      value={value}
      onChange={onChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <TextField
              type="color"
              value={value}
              onChange={onChange}
              sx={{
                cursor: 'pointer',
                padding: 0,
                marginTop: variant === 'filled' ? '-15px' : '0',
                '& input': { px: 0.2, py: 0, width: '50px', height: '30px' },
              }}
            />
          </InputAdornment>
        ),
      }}
    />
  );
}
