'use client';

// @mui
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AnalyticsWebsiteVisits from '../analytics-website-visits';
import AnalyticsCurrentVisits from '../analytics-current-visits';
// components
import { useSettingsContext } from 'src/components/settings';
//
import AnalyticsNews from '../analytics-news';
import AnalyticsTasks from '../analytics-tasks';

import AnalyticsOrderTimeline from '../analytics-order-timeline';

import AnalyticsWidgetSummary from '../analytics-widget-summary';
import AnalyticsTrafficBySite from '../analytics-traffic-by-site';
import AnalyticsCurrentSubject from '../analytics-current-subject';
import AnalyticsConversionRates from '../analytics-conversion-rates';
import CustomCrumbs from 'src/components/custom-crumbs/custom-crumbs';
import { Box, Card, ListItemText, Paper, Skeleton } from '@mui/material';
import AppAreaInstalled from '../../app/app-area-installed';
import AppHolder from '../../app/app-holder';
import {
  fetchAnalyticsGlobal,
  fetchAnalyticsOrder,
  fetchBestSellingCategories,
  fetchBestSellingItems,
  fetchChartData,
} from 'src/redux/store/thunks/analytics';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import { useSelector } from 'react-redux';
// ----------------------------------------------------------------------

export default function OverviewAnalyticsView() {
  const settings = useSettingsContext();
  const dispatch = useDispatch<AppDispatch>();
  const [analyticsGlobalData, setAnalyticsGlobalData] = useState<any>();
  const [analyticsOrderData, setAnalyticsOrderData] = useState<any>();
  const [Loading, setLoading] = useState(true);
  const loadStatus = useSelector((state: any) => state?.analytics?.status);
  // const [chartData, setChartData] = useState<any>();
  useEffect(() => {
    if (loadStatus === 'idle') {
      Promise.all([
      dispatch(fetchAnalyticsGlobal()).then((response: any) =>
        setAnalyticsGlobalData(response?.payload?.data)
        // console.log("global",response?.payload?.data)
      ),
      dispatch(fetchAnalyticsOrder()).then((response: any) =>
        setAnalyticsOrderData(response?.payload?.data)
        
      ),
      dispatch(fetchChartData()).then((response: any) =>
        // setChartData(response.payload.data.result)
        console.log("chart",response?.payload?.data)
      ),
    ]).then(() => setLoading(false));
    
    }
  }, []);
  const data = [
    { "_id": "2024-03", "totalAmount": 300 },
    { "_id": "2024-03", "totalAmount": 300 },
    { "_id": "2024-03", "totalAmount": 300 },
    { "_id": "2024-02", "totalAmount": 200 },
    { "_id": "2024-01", "totalAmount": 700 },
    { "_id": "2024-05", "totalAmount": 600 }
];

// Prepare data for the chart
const chartData = data.reduce((acc, curr) => {
  const month = curr._id.split('-')[1];
  const index = parseInt(month, 10) - 1; // Month is 0-indexed in the chart
  if (!acc[index]) {
      acc[index] = 0;
  }
  acc[index] += curr.totalAmount;
  return acc;
}, Array(12).fill(0));


// Labels for the chart
const labels = data.map(entry => entry._id);

// Map data to the format expected by the component
const mappedChartData =  [

  {
    name: 'Previous Week',
    type: 'line',
    fill: 'solid',
    data: chartData
  },
  {
    name: 'Previous Month',
    type: 'area',
    fill: 'solid',
    data: [230, 110, 220, 270, 130, 220, 370, 210, 440, 220, 300],
  }
  ,
  {
    name: 'Previous Year',
    type: 'line',
    fill: 'solid',
    data: [300, 250, 360, 300, 450, 350, 640, 520, 590, 360, 390],
  }
];

  console.log(chartData);
  return (
    <Container maxWidth={false}>
      <CustomCrumbs
        heading="Analytic"
        description="Reports and analytics on your website."
        crums={false}
      />
      {/* <Paper elevation={7} sx={{ width: '100%' }}>
        <AppAreaInstalled
          title="Total"
          subheader="4.100,500 KWD"
          chart={{
            categories: chartData?.map((item: any) => item?._id),
            series: [
              {
                year: '2024',
                data: [
                  // {
                  //   name: 'Asia',
                  //   data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                  // },
                  {
                    name: 'America',
                    data: chartData?.map((item: any) => item?.totalAmount),
                  },
                ],
              },
              {
                year: '2020',
                data: [
                  {
                    name: 'Asia',
                    data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                  },
                  {
                    name: 'America',
                    data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                  },
                ],
              },
            ],
          }}
        />
      </Paper> */}

      {/* <CustomCrumbs
        sx={{ mt: '40px' }}
        heading="Summary"
        description="Reports and numbers on your website."
        crums={false}
      />
      <AppHolder>
        {[
          {
            title: 'TOTAL SALES',
            growth: '+6%',
            count: analyticsGlobalData?.totalSales,
          },
          {
            title: 'AVERAGE ORDER VALUE',
            growth: '-32%',
            count: '16.750',
            color: '#FF008B',
          },
          {
            title: 'TOTAL ORDERS',
            growth: '+2.5%',
            count: analyticsOrderData?.totalOrders,
          },
          {
            title: 'TOTAL CUSTOMERS',
            growth: '+4.1%',
            count: analyticsGlobalData?.totalCustomers,
          },
        ].map((item, indx) => (
          <Paper key={indx} elevation={11}>
            <Grid
              container
              p="20px"
              alignItems="center"
              sx={{
                width: '256px',
                height: '100px',
                borderRadius: '16px',
              }}
            >
              <Grid
                xs={12}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ opacity: 0.7, fontSize: '.6rem' }}
                >
                  {item?.title}
                </Typography>
                <Typography
                  component="p"
                  variant="subtitle2"
                  sx={{ fontSize: '.7.5rem', color: item.color ?? '#00DF9A' }}
                >
                  {item?.growth}{' '}
                </Typography>
              </Grid>
              <Grid xs={12}>
                <Typography component="p" variant="h6" sx={{ fontSize: '.8rem' }}>
                  {item?.count} <span style={{ fontSize: '12px' }}>KWD</span>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </AppHolder> */}
           {Loading ? (
              <>
          <Grid container spacing={2}>
          {[1, 2, 3].map((_, index) => (
            <Grid  xs={4} key={index}> {/* Equal width for the three grid items */}
              <Box sx={{ mx: 1 }}>
                <Skeleton variant="rectangular" height={150} />
              </Box>
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={2}> {/* New row for the second container */}
          <Grid  xs={12}> {/* Equal width for the second container spanning all grid columns */}
            <Box sx={{ mx: 1 }}>
              <Skeleton height={500} variant="rectangular"/>
            </Box>
          </Grid>
        </Grid>
        
        </>
        ) : (
          <>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="TOTAL SALES"
            total={analyticsGlobalData?.totalSales}
            icon={<img alt="icon" src="/assets/icons/navbar/ic_invoice.svg"   width="40px" height= "50px" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="AVERAGE ORDER VALUE"
            total={analyticsGlobalData?.averageOrderValue}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="TOTAL ORDERS"
            total={analyticsGlobalData?.totalOrders}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AnalyticsWidgetSummary
            title="TOTAL CUSTOMERS"
            total={analyticsGlobalData?.totalCustomers}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>


        <Grid xs={12} md={10} lg={10}>
    <AnalyticsWebsiteVisits
        chart={{
            labels: labels,
            series: mappedChartData
        }}
    />
</Grid>
    

     

<Grid xs={12} md={6} lg={8}>
          <AnalyticsConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={4}>
          {/* <AnalyticsCurrentSubject
            title="Current Subjec"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          /> */}
        </Grid>

    
   

      </Grid>
      </>
        )}
    </Container>
  );
}
