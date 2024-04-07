/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-shadow */

'use client';

import { useResponsive } from 'src/hooks/use-responsive';
import {
  fetchAnalyticsOrderModules,
  fetchAnalyticsOrder,

} from 'src/redux/store/thunks/analytics';
import { Box, Paper, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme, } from '@mui/material/styles';
import { paths } from 'src/routes/paths';
import Linker from '../subscription-plan/link';

import AppWelcome from './app-welcome';
import { SeoIllustration } from 'src/assets/illustrations';
import AppFeatured from './app-featured';
import { useCreateProductMutation, useGetAllProductsQuery } from 'src/redux/store/services/api';
import { _appAuthors, _appRelated, _appFeatured, _appInvoices, _appInstalled } from 'src/_mock';
import { RootState } from 'src/redux/store/store';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from 'src/redux/store/store';
import {
 
  fetchAllBrands,
 
} from 'src/redux/store/thunks/brand';
import { useEffect, useState } from 'react';
import AppCurrentDownload from './app-current-download';
import AnalyticsConversionRates from '../analytics/analytics-conversion-rates';
import AnalyticsWebsiteVisits from '../analytics/analytics-website-visits';
// ----------------------------------------------------------------------
import {  useLocales } from 'src/locales';
interface FetchProductsData {
  pageNumber: number;
  pageSize: number;
  query: string;
  sort?: "-createdAt" | "createdAt" | undefined;
}

export default function AppPlanandEdit() {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useLocales();
  // const [getAllProductsRes, setGetAllProductsRes] = useState(null);
  const mdDown = useResponsive('down', 'md');
  const selectedDomain = useSelector((state: RootState) => state?.selectedDomain?.data);
  const [brandsData, setBrandsData] = useState<any>([]);
  
  const [AllData, setAllData] = useState<any>([]);
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
const mappedChartData = [
  {
    name: t('previous_week'),
    type: 'line',
    fill: 'solid',
    data: chartData
  },
  {
    name: t('previous_month'),
    type: 'area',
    fill: 'solid',
    data: [230, 110, 220, 270, 130, 220, 370, 210, 440, 220, 300],
  },
  {
    name: t('previous_year'),
    type: 'line',
    fill: 'solid',
    data: [300, 250, 360, 300, 450, 350, 640, 520, 590, 360, 390],
  }
];

// Labels for the chart
const labels = data.map(entry => entry._id);

  const fetchProducts= async() => {
    const data: FetchProductsData = {
      pageNumber: 1,
      pageSize: 10,
      query: '',
      sort: "-createdAt"
  };
     dispatch(fetchAllBrands(data)).then((res) => {
       setBrandsData(res?.payload?.data?.data)
      console.log('setBrandsData', res?.payload?.data?.data)
    });
    dispatch(fetchAnalyticsOrder()).then((res) => {
      // setBrandsData(res?.payload?.data?.data)
     console.log('fetchAnalytic', res?.payload)
   });
   dispatch(fetchAnalyticsOrderModules()).then((res) => {
    if (res?.payload?.data) {
   
        setAllData([
            { label: t('home.brand'), value: res.payload.data.brands },
            { label: t('home.categories'), value: res.payload.data.categories },
            { label: t('home.customers'), value: res.payload.data.customers},
            { label: t('home.products'), value:res.payload.data.products},
        ]);
    } else {
        setAllData([]); // Set an empty array or default value if data is undefined
    }
});
;
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <Paper sx={{
      // boxShadow: { xs: '0px 0px 20px #00000014' },
      // background: { xs: 'rgb(255, 255, 255)', md: 'transparent' },
      borderRadius: 2,
    }}>



      <Grid sx={{ borderRadius: 2 }} container  columnSpacing={{ xs: 0, md: 3 }} rowSpacing={{ xs: 0, md: 3 }} >

      




        <Grid item xs={12} md={4}>
    
        <AppCurrentDownload
    title={t('home.our_module')}
    chart={{
        series: AllData,
    }}
/>

      
        </Grid>
        <Grid item xs={12} md={8}>
        <AnalyticsWebsiteVisits
        chart={{
            labels: labels,
            series: mappedChartData
        }}
    />
          </Grid>





      </Grid>
    </Paper>
  );
}
