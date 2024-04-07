'use client';
import React from 'react';
import AuthSection from '../../../sections/auth-sections/authSection';

const LoginSection = () => {
  return (
    <AuthSection
      title={'Login'}
      description={'Welcome back! Please enter your info to login to your account.'}
      buttonLabel={'Login'}
      children={<></>}
    />
  );
};

export default LoginSection;
