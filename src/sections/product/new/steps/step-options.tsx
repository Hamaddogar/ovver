// options & variants

import { Grid } from '@mui/material';
import { RHFCheckbox } from 'src/components/hook-form';

export default function StepOptions() {
  return (
    <Grid container>
      {/* ========== section ========== */}
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }} textTransform="capitalize">
        <RHFCheckbox name={`avalibleForMobile`} label="Avalible for Mobile" />
        <RHFCheckbox name={`avalibleForWebsite`} label="Avalible for Website" />
      </Grid>
    </Grid>
  );
}
