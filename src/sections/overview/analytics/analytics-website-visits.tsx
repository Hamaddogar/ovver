import { ApexOptions } from 'apexcharts';
import Box from '@mui/material/Box';
import CardHeader from '@mui/material/CardHeader';
import Card, { CardProps } from '@mui/material/Card';
import Chart, { useChart } from 'src/components/chart';

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    labels: string[]; // Updated to include labels prop
    colors?: string[];
    series: {
      name: string;
      type: string;
      fill?: string;
      data: number[];
    }[];
    options?: ApexOptions;
  };
}

export default function AnalyticsWebsiteVisits({ title, subheader, chart, ...other }: Props) {
  const { labels, colors, series, options } = chart;

  const chartOptions = useChart({
    colors,
    plotOptions: {
      bar: {
        columnWidth: '16%',
      },
    },
    fill: {
      type: series.map((i) => i.fill) as string[],
    },
    labels, // Pass labels directly
    xaxis: {
      type: 'category', // Use category type for x-axis
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (value: number) => {
          if (typeof value !== 'undefined') {
            return `${value.toFixed(0)} visits`;
          }
          return value;
        },
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 3, pb: 1 }}>
        <Chart dir="ltr" type="line" series={series} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}