import * as Yup from 'yup';
import { ISharedAuthPagesDataProps } from '../interfaces';

export const verifyAccountData: ISharedAuthPagesDataProps = {
  title: 'Verify Account',
  description: 'Please enter the OTP code sent via your email address to verify your account.',
  buttonLabel: 'Verify',
};

export enum VerifyAccountFormNames {
  Code = 'code'
}

export const verifyAccountSchema = Yup.object().shape({
  [VerifyAccountFormNames.Code]: Yup.string().matches(/^[0-9]{5}$/, 'Must be exactly 5 number digits'),
});


export const verifyAccountDefaultValues = {
  [VerifyAccountFormNames.Code]: '',
};
