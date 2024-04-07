import { Controller, useFormContext } from 'react-hook-form';
// @mui
import TextField, { TextFieldProps } from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  settingStateValue?: any;
  setIsError?: (value: boolean) => void;
};

export default function RHFTextField({
  name,
  helperText,
  type,
  settingStateValue,
  setIsError,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        if (setIsError && error) {
          setIsError(true);
        }
        return (
          <TextField
            {...field}
            fullWidth
            type={type}
            value={type === 'number' && field.value === 0 ? '' : field.value}
            onChange={(event) => {
              if (type === 'number') {
                field.onChange(Number(event.target.value));
              } else {
                field.onChange(event.target.value);
              }
              if (settingStateValue) {
                settingStateValue(event);
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
        );
      }}
    />
  );
}
