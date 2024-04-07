import { Skeleton, Stack, Typography, alpha, useTheme } from '@mui/material';

export default function FieldLoading() {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        width: '100%',
        p: 1,
        marginTop: '12px',
        borderRadius: '6px',
        bgcolor: alpha(theme.palette.divider, 0.05),
      }}
    >
      <Stack sx={{ width: '100%' }}>
        <Typography variant="body1">
          <Skeleton variant="text" width="100%" animation="wave" />
        </Typography>
        <Typography variant="body2">
          <Skeleton variant="rectangular" width="100%" height="50px" animation="wave" />
        </Typography>
      </Stack>
    </Stack>
  );
}
