import * as Yup from 'yup';
import { ISharedAuthPagesDataProps } from '../interfaces';

export const forgotPasswordData: ISharedAuthPagesDataProps = {
  title: 'Forgot Password?',
  description: 'Please enter your email address to send you a verification code.',
  buttonLabel: 'Submit',
};

export enum ForgotPasswordFormNames {
  Email = 'email'
}

export enum ForgotPasswordLabels {
  Email = 'Email Address'
}

export const forgotPasswordSchema = Yup.object().shape({
  [ForgotPasswordFormNames.Email]: Yup.string().required('Email is required').email('Email must be a valid email address'),
});


export const forgotPasswordDefaultValues = {
  [ForgotPasswordFormNames.Email]: '',
};
