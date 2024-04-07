import { Controller, useFormContext } from 'react-hook-form';
import { MuiOtpInput, MuiOtpInputProps } from 'mui-one-time-password-input';
// @mui
import FormHelperText from '@mui/material/FormHelperText';
import { SxProps } from '@mui/system/styleFunctionSx';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type RHFCodesProps = MuiOtpInputProps & {
  name: string;
  wrapperSx?: SxProps<any>
};

export default function RHFCode({ name, wrapperSx, ...other }: RHFCodesProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Box sx={{ ...wrapperSx }}>
          <MuiOtpInput
            {...field}
            autoFocus
            gap={1.5}
            length={5}
            TextFieldsProps={{
              error: !!error,
              placeholder: '-',
            }}
            {...other}
          />

          {error && (
            <FormHelperText sx={{ px: 2 }} error>
              {error.message}
            </FormHelperText>
          )}
        </Box>
      )}
    />
  );
}
