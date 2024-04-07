'use client'
import React, { useEffect, useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { paths } from 'src/routes/paths';
import { usePathname } from 'next/navigation';

interface PathsType {
  auth: {
    jwt: {
      register: string;
      login: string;
    };
  };
}

const ToggleBtn: React.FC = () => {
  const pathName = usePathname();
  const [alignment, setAlignment] = useState<'login' | 'signup'>('login');

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'login' | 'signup' | null
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };

  useEffect(() => {
    if (pathName.includes('/register')) {
      setAlignment('signup');
    } else if (pathName.includes('/login')) {
      setAlignment('login');
    }
  }, [pathName]);

  return (
    <div style={{ alignSelf: 'center' }}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="text alignment"
        sx={{
          backgroundColor: '#0F1546',
          borderRadius: '20px',
          overflow: 'hidden',
          marginBottom: '9% !important',
        }}
      >
        <ToggleButton
          value="signup"
          aria-label="left aligned"
          href={(paths as PathsType).auth.jwt.register}
          sx={{
            textTransform: 'none',
            color: '#ffffff82',
            margin: '0px !important ',
            backgroundColor: '',
            '&.Mui-selected, &.Mui-selected:hover': {
              color: '#0F1546',
              backgroundColor: '#37F9BD',
            },
            padding: 1,
            paddingInline: '20px !important',
            borderRadius: '20px !important',
          }}
        >
          Sign Up
        </ToggleButton>
        <ToggleButton
          value="login"
          aria-label="centered"
          href={(paths as PathsType).auth.jwt.login}
          sx={{
            textTransform: 'none',
            color: '#ffffff82',
            backgroundColor: '',
            margin: '0px !important ',
            '&.Mui-selected, &.Mui-selected:hover': {
              color: '#0F1546',
              backgroundColor: '#37F9BD',
            },
            padding: 1,
            paddingInline: '30px !important',
            borderRadius: '20px !important',
          }}
        >
          Login
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default ToggleBtn;
