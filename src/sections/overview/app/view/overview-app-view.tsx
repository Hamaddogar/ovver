'use client';

// React / Redux
import { Key } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentBuilder } from 'src/redux/store/thunks/builder';
// MUI
import Container from '@mui/material/Container';
import { FormControlLabel, Switch, Box, Paper, Grid, Skeleton } from '@mui/material';
// My-Components
import AppPlan from '../app-plan';
import AppEdit from '../app-edit';
import AppTools from '../app-tools';
import AppSummary from '../app-summary';
import AppHolder from '../app-holder';
import AppPublish from '../app-publish';
import AppAreaInstalled from '../app-area-installed';
import AppOrders from '../app-orders';
import AppProducts from '../app-products';
// My-Hooks
import { useLocales } from 'src/locales';
// assets
import { SeoIllustration } from 'src/assets/illustrations';
// API
import {
  useGetGlobalAnalyticsQuery,
  useGetMostSellingProductsQuery,
} from 'src/redux/store/services/api';
// Data
import { paths } from 'src/routes/paths';
import { quickSummary } from '../data';

export default function OverviewAppView() {
  // ################### REDUX HOOKS ###################
  const { appName, domain } = useSelector(selectCurrentBuilder) ?? {};

  // ################### CUSTOM HOOKS ###################
  const { t } = useLocales();

  // ################### RTK QUERY ###################
  // ===== GET =====
  const { data: globalAnalytics, isLoading: isGlobalAnalyticsLoading } = useGetGlobalAnalyticsQuery(
    { filterValue: 'all' }
  );
  const { data: mostSellingProducts, isLoading: isMostSellingLoading } =
    useGetMostSellingProductsQuery({});

  // ################### SETTINGS ###################
  const isPageLoading = isGlobalAnalyticsLoading || isMostSellingLoading;

  return (
    <Container maxWidth={false}>
      {isPageLoading ? (
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={6}>
            <Skeleton sx={{ width: '100%', height: 200 }} />
          </Grid>
          <Grid item xs={6}>
            <Skeleton sx={{ width: '100%', height: 200 }} />
          </Grid>

          {/* Second Row */}
          <Grid item xs={12}>
            <Skeleton sx={{ width: '100%', height: 400, mt: 5 }} />
          </Grid>
          {/* Second Row */}
          <Grid item xs={12}>
            <Skeleton sx={{ width: '100%', height: 400, mt: 5 }} />
          </Grid>

          {/* Third Row */}
          <Grid item xs={4}>
            <Skeleton sx={{ width: '100%', height: 200, mt: 5 }} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton sx={{ width: '100%', height: 200, mt: 5 }} />
          </Grid>
          <Grid item xs={4}>
            <Skeleton sx={{ width: '100%', height: 200, mt: 5 }} />
          </Grid>
        </Grid>
      ) : (
        <Grid container mt="0" mx="auto" width="100%" spacing={2}>
          <Grid item xs={12} style={{ paddingLeft: 0 }}>
            <AppPublish
              elevation={7}
              title={appName?.localized ?? ''}
              description={domain}
              img={<SeoIllustration />}
              action={
                <FormControlLabel
                  control={<Switch color="primary" defaultChecked />}
                  label="Published now"
                />
              }
            />
          </Grid>

          {/* ========================== PLAN & EDIT APP ========================== */}
          <Grid item xs={12} md={6} style={{ paddingLeft: 0 }}>
            <AppPlan elevation={8} />
          </Grid>
          <Grid item xs={12} md={6}>
            <AppEdit />
          </Grid>

          {/* ========================== TOOLS ========================== */}
          <Grid item xs={12} style={{ paddingLeft: 0 }}>
            <AppTools />
          </Grid>

          {/* ========================== QUICK SUMMARY ========================== */}
          <Grid item xs={12} style={{ paddingLeft: 0 }}>
            <AppHolder title="Quick Summary">
              {quickSummary.map((item) => (
                <AppSummary
                  elevation={7}
                  key={item.id}
                  title={item.title}
                  count={globalAnalytics?.data?.[item.count] ?? 0}
                  icon={<Box component="img" src={item.icon} />}
                />
              ))}
            </AppHolder>
          </Grid>

          {/* ========================== LATEST ORDERS ========================== */}
          <Grid item xs={12} style={{ paddingLeft: 0 }}>
            <AppHolder
              title="Latest Orders"
              subtitle="All Orders"
              path={paths.dashboard.general.order}
            >
              {[].map(
                (
                  item: {
                    id: string;
                    createdAt: string;
                    items: string;
                    status: string;
                    totalPrice: number;
                    totalCount: number;
                  },
                  indx: Key | null | undefined
                ) => (
                  <AppOrders
                    elevation={7}
                    key={indx}
                    idNo={item.id}
                    datetime={item.createdAt}
                    name={item.items}
                    status={item.status}
                    amount={item.totalPrice}
                    itemCount={item.totalCount}
                    country="test"
                  />
                )
              )}
            </AppHolder>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: 0 }}>
            <AppHolder
              title="Revenue Chart"
              subtitle="View Reports"
              path={paths.dashboard.general.analytics}
            >
              <Paper elevation={7} sx={{ width: '100%' }}>
                <AppAreaInstalled
                  title="Total"
                  subheader="4.100,500 KWD"
                  chart={{
                    categories: [
                      'Jan',
                      'Feb',
                      'Mar',
                      'Apr',
                      'May',
                      'Jun',
                      'Jul',
                      'Aug',
                      'Sep',
                      'Oct',
                      'Nov',
                      'Dec',
                    ],
                    series: [
                      {
                        year: '2019',
                        data: [
                          {
                            name: 'Asia',
                            data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                          },
                          {
                            name: 'America',
                            data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
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
              </Paper>
            </AppHolder>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: 0 }}>
            <AppHolder
              path={paths.dashboard.general.trending}
              icon="/raw/hot.svg"
              title="Trending"
              subtitle="View All"
              description="Most trending items and products"
            >
              {[
                {
                  idNo: '#1',
                  name: 'iPhone 13 Pro Max',
                  description: 'Mobiles - 142 KWD',
                  sales: 254,
                  img: '/raw/ti1.png',
                },
                {
                  idNo: '#2',
                  name: 'Smart Watch GXT',
                  description: 'Watches - 48 KWD',
                  sales: 832,
                  img: '/raw/ti2.png',
                },
                {
                  idNo: '#3',
                  name: 'Apple AirPods Pro White',
                  description: 'Mobiles - 142 KWD',
                  sales: 254,
                  img: '/raw/ti3.png',
                },
                {
                  idNo: '#1',
                  name: 'iPhone 13 Pro Max',
                  description: 'Mobiles - 142 KWD',
                  sales: 254,
                  img: '/raw/ti1.png',
                },
                {
                  idNo: '#2',
                  name: 'Smart Watch GXT',
                  description: 'Watches - 48 KWD',
                  sales: 832,
                  img: '/raw/ti2.png',
                },
              ].map((item, indx) => (
                <AppProducts
                  elevation={7}
                  key={indx}
                  idNo={item.idNo}
                  name={item.name}
                  description={item.description}
                  sales={item.sales}
                  img={item.img}
                />
              ))}
            </AppHolder>
          </Grid>
          <Grid item xs={12} style={{ paddingLeft: 0 }}>
            <AppHolder
              path={paths.dashboard.general.mostselling}
              title="Most Selling"
              subtitle="View All"
              description="Most selling items and products"
            >
              {[
                {
                  idNo: '#1',
                  name: 'ASUS Laptop - Core i7',
                  description: 'Laptops - 489 KWD',
                  sales: 832,
                  img: '/raw/si1.png',
                },
                {
                  idNo: '#2',
                  name: 'iPhone 8 Gold',
                  description: 'Mobiles - 142 KWD',
                  sales: 254,
                  img: '/raw/si2.png',
                },
                {
                  idNo: '#3',
                  name: 'Sony Wireless Headphones',
                  description: 'Mobiles - 142 KWD',
                  sales: 254,
                  img: '/raw/si3.png',
                },
                {
                  idNo: '#1',
                  name: 'ASUS Laptop - Core i7',
                  description: 'Laptops - 489 KWD',
                  sales: 832,
                  img: '/raw/si1.png',
                },
                {
                  idNo: '#2',
                  name: 'iPhone 8 Gold',
                  description: 'Mobiles - 142 KWD',
                  sales: 254,
                  img: '/raw/si2.png',
                },
              ].map((item, indx) => (
                <AppProducts
                  elevation={7}
                  key={indx}
                  idNo={item.idNo}
                  name={item.name}
                  description={item.description}
                  sales={item.sales}
                  img={item.img}
                />
              ))}
            </AppHolder>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
