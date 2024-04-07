'use client';

// Redux
import { useSelector } from 'react-redux';
import { selectCurrentBuilder } from 'src/redux/store/thunks/builder';
// mui
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Box, Paper, PaperProps } from '@mui/material';
import GaugeComponent from './GaugeComponent';
import { gaugeClasses } from '@mui/x-charts/Gauge';
// Data
import { paths } from 'src/routes/paths';

import Linker from '../subscription-plan/link';

interface Props extends PaperProps {
  elevation?: number;
}

export default function AppPlan({ elevation = 7 }: Props) {
  // ################### REDUX HOOKS ###################
  const { planSubscription } = useSelector(selectCurrentBuilder) ?? {};

  // ################### MUI ###################
  const theme = useTheme();

  // ################### HANDLER ###################
  const handleGaueText = ({
    value,
    valueMax,
  }: {
    value: number | null;
    valueMax: number | null;
  }): string => {
    if (value === null || valueMax === null) {
      return '0';
    }
    return `${value} 

      days left`;
  };

  // ################### DATA ###################
  const remainingDays = planSubscription?.remainingDays ?? 0;
  const allDays = planSubscription?.allDays ?? 0;

  return (
    <Paper
      elevation={elevation}
      sx={{
        backgroundColor: 'secondary.lighter',
        minHeight: { xs: '100%' },
        boxShadow: '0px 0px 20px #00000014',
      }}
    >
      <Stack
        flexDirection={{ xs: 'column', md: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        sx={{
          backgroundColor: 'secondary.lighter',
          p: {
            xs: theme.spacing(5, 3, 5, 3),
            md: theme.spacing(5, 0, 5, 3),
          },
          color: 'primary.darker',
          borderRadius: 2,
          position: 'relative',
        }}
        spacing={4}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
          <GaugeComponent
            width={190}
            height={100}
            value={remainingDays}
            valueMax={allDays}
            startAngle={-90}
            endAngle={90}
            sx={(theme: any) => ({
              [`& .${gaugeClasses.valueText}`]: {
                transform: 'translate(0px, -10px)',
                fontSize: '1.3rem',
                fontWeight: 'bold',
              },
              // Add this line to because the last rule does not change text color
              [`& .${gaugeClasses.valueText} text tspan`]: {
                fill: theme.palette.primary.contrastText,
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: theme.palette.primary.contrastText,
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: '#19cea1',
              },
            })}
            text={handleGaueText}
          />
        </Stack>

        <Stack
          flexGrow={1}
          justifyContent="center"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
          spacing="7px"
        >
          <Typography variant="h4" color="primary.contrastText" sx={{ whiteSpace: 'pre-line' }}>
            Pro Plan
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              maxWidth: 360,
              mb: { xs: 1 },
              color: ' #282B5C',
            }}
          >
            You can renew your subscription.
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '5px',
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Linker path={paths.dashboard.general.subscriptionplan}>
              <Button
                variant="contained"
                sx={{
                  padding: '6px 23px',
                  fontSize: '13px',
                  backgroundColor: 'primary.contrastText',
                  '&:hover': { backgroundColor: 'primary.contrastText' },
                  color: '#FFFFFF',
                  borderRadius: '20px',
                  fontWeight: 300,
                }}
              >
                Upgrade Plan
              </Button>
            </Linker>

            <Button
              variant="contained"
              sx={{
                padding: '6px 23px',
                fontSize: '13px',
                backgroundColor: '#1AE0AA',
                '&:hover': { backgroundColor: '#1AE0AA' },
                color: 'primary.contrastText',
                borderRadius: '20px',
                fontWeight: 300,
              }}
            >
              Renew Plan
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
}
