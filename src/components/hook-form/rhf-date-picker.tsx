import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { TextFieldProps } from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  variant?: 'filled' | 'outlined' | 'standard';
  settingStateValue?: any;
};

export default function RHFDatePicker({
  name,
  variant = 'outlined',
  helperText,
  settingStateValue,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <DatePicker
          slotProps={{ textField: { variant: variant } }}
          {...field}
          fullWidth
          format="yyyy-MM-dd"
          value={field.value ? new Date(field.value) : null}
          // @ts-ignore
          onChange={(date) => {
            if (date instanceof Date) {
              const formattedDate = date.toISOString();
              field.onChange(formattedDate);
              if (settingStateValue) {
                settingStateValue(date);
              }
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
          inputProps={{
            style: {
              fontWeight: 'bold',
              borderRadius: '18px',
            },
          }}
          {...other}
        />
      )}
    />
  );
}
