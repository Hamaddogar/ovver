import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const AccountGeneralLoading = () => {
  const theme = useTheme();

  const imageSection = (
    <Box sx={{ width: { xs: '100%', md: '33%' }, padding: theme.spacing(2) }}>
      <Skeleton variant="rectangular" width="100%" height={300} sx={{ borderRadius: 1 }} />
    </Box>
  );

  const inputSection = (
    <Box sx={{ width: { xs: '100%', md: '67%' }, padding: theme.spacing(2) }}>
      {[...Array(6)].map((_, index) => (
        <Skeleton
          key={index}
          variant="text"
          width="100%"
          height={40}
          style={{ marginBottom: theme.spacing(2) }}
        />
      ))}
    </Box>
  );

  return (
    <Stack sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {imageSection}
      {inputSection}
    </Stack>
  );
};

export default AccountGeneralLoading;
