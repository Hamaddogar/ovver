import { MuiTelInput } from 'mui-tel-input';
import { Controller, useFormContext } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { CountryCode } from 'src/types/phone';

type Props = TextFieldProps & {
  name: string;
  label?: string;
  settingStateValue?: any;
  countries?: { iso2c: string; code: string }[];
  dir?: 'ltr' | 'rtl';
  variant?: 'outlined' | 'filled' | 'standard';
  sx?: any;
};

export default function RHFPhoneNumberField({
  name,
  label,
  helperText,
  settingStateValue,
  countries,
  variant,
  dir,
  sx,
}: Props) {
  const { control } = useFormContext();

  const onlyCountries = countries?.map((c) => c.iso2c as CountryCode) || [];

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MuiTelInput
          variant={variant || 'outlined'}
          dir={dir || 'ltr'}
          {...field}
          label={label}
          fullWidth
          value={field.value}
          name={name}
          sx={{ width: '100%', ...sx }}
          onlyCountries={onlyCountries.length > 0 ? onlyCountries : undefined}
          onChange={(event) => {
            const phoneNumber = parsePhoneNumberFromString(event);
            if (
              phoneNumber?.country &&
              countries?.some((country) => country.code === phoneNumber.country)
            ) {
              field.onChange(phoneNumber.formatInternational());
            } else {
              field.onChange(event);
            }
            if (settingStateValue) {
              settingStateValue(event);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
        />
      )}
    />
  );
}
