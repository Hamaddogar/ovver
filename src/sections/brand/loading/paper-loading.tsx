import { Skeleton, Stack, Typography, alpha, useTheme } from '@mui/material';

export default function PaperLoading() {
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
      <Skeleton
        sx={{ bgcolor: alpha(theme.palette.divider, 0.15) }}
        variant="rounded"
        width={60}
        height={60}
        animation="wave"
      />
      <Stack sx={{ width: '100%' }}>
        <Typography variant="body1">
          <Skeleton
            sx={{ bgcolor: alpha(theme.palette.divider, 0.15) }}
            variant="text"
            animation="wave"
            width="100%"
            height={30}
          />
        </Typography>
        <Typography variant="body2">
          <Skeleton
            sx={{ bgcolor: alpha(theme.palette.divider, 0.15) }}
            variant="text"
            animation="wave"
            width="100%"
            height={30}
          />
        </Typography>
      </Stack>
    </Stack>
  );
}
