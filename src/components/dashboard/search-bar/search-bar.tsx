import { Box, InputAdornment, TextField } from '@mui/material';

type Props = {
  placeholder?: string;
  value?: string;
  onChange: Function;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <TextField
      placeholder={placeholder}
      value={value}
      fullWidth
      variant="filled"
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box component="img" src="/raw/search.svg" sx={{ width: '15px' }} />
          </InputAdornment>
        ),
      }}
      sx={{
        bgcolor: 'background.default',
        borderRadius: '16px',
        '& .MuiFilledInput-root': {
          borderRadius: '16px',
        },
        '& .MuiInputAdornment-root': {
          marginTop: '0px !important',
          paddingLeft: '10px',
        },
        '& ::placeholder': {
          color: 'text.secondary',
        },
        '& input': {
          color: 'text.main',
          paddingLeft: '10px',
          fontSize: '14px',
          padding: '15px 20px 15px 0px !important',
        },
      }}
    />
  );
}
