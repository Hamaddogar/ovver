import { Divider, Typography } from '@mui/material';
import React from 'react';

type Props = {
  title: string;
};
export default function SectionTitle({ title }: Props) {
  return (
    <>
      <Typography
        component="h2"
        noWrap
        variant="h4"
        sx={{
          fontSize: '1.2rem',
          display: 'flex',
          textTransform: 'capitalize',
          py: 1,
          mt: { xs: 4, md: 0 },
        }}
      >
        {title}
      </Typography>
      <Divider sx={{ width: 'auto' }} />
    </>
  );
}
