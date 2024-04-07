'use client';
import React, { useEffect, useState } from 'react';
import AppOrders from '../../app/app-orders';
import AppHolder from '../../app/app-holder';
import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/redux/store/store';
import {
  fetchBestSellingCategories,
  fetchBestSellingItems,
  fetchBestSellingBranches,
} from 'src/redux/store/thunks/analytics';
import Skeleton from '@mui/material/Skeleton';
import { AvatarShape } from 'src/assets/illustrations';
import { alpha, useTheme } from '@mui/material/styles';
import Image from 'src/components/image';
import ListItemText from '@mui/material/ListItemText';

const BestSellingView = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [bestSellingCategories, setBestSellingCategories] = useState([{}]);
  const [bestSellingItems, setBestSellingItems] = useState([{}]);
  const [Loading, setLoading] = useState(true);
  const theme = useTheme();
  const sellingItems = [
    {
      id: '123',
      productImage: '/raws/banner1.png',
      productName: { en: 'Demo Product' },
      totalOrders: 400,
      totalSales: 200,
      quantitySold: 300,
    },
    {
      id: '323',
      productImage: '/raws/banner1.png',
      productName: { en: 'Demo Product 2' },
      totalOrders: 400,
      totalSales: 200,
      quantitySold: 300,
    },
  ];
  const sellingCategories = [
    {
      id: '123',
      categoryImage: '/raws/banner1.png',
      categoryName: { en: 'Demo Product' },
      totalOrders: 400,
      totalSales: 200,
      quantitySold: 300,
    },
    {
      id: '323',
      categoryImage: '/raws/banner1.png',
      categoryName: { en: 'Demo Product 2' },
      totalOrders: 400,
      totalSales: 200,
      quantitySold: 300,
    },
  ];

  useEffect(() => {
    Promise.all([
      dispatch(fetchBestSellingItems()).then((resp) => setBestSellingItems(resp?.payload?.data)),
      dispatch(fetchBestSellingCategories()).then((resp) => setBestSellingCategories(resp?.payload?.data)),
      dispatch(fetchBestSellingBranches()).then((resp) => console.log('Branch', resp))
    ]).then(() => setLoading(false));
  }, []);


  return (
    <Grid xs={12}>
      <AppHolder title="Best Selling Items">
        {Loading ? (
            <Grid container spacing={2}>
            {[1, 2, 3].map((_, index) => ( 
              <Box sx={{ width: 350,mx:1 }} key={index}>
                <Skeleton variant="rectangular" height={150} />
                <Skeleton sx={{ mt: 1, mb: 1 }} />
                <Skeleton width="60%" />
              </Box>
            ))}
          </Grid>
      
        ) : (
          <>
            {bestSellingItems.length > 0
              ? bestSellingItems?.map((item: any) => (
                <Card sx={{ textAlign: 'center', width: '400px' }} key={item.id}>
                  <Box sx={{ position: 'relative' }}>




                    <Image
                      src={item?.productImage?.length > 0 ? item?.productImage : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
                      alt={item?.productName}
                      ratio="16/9"
                      overlay={alpha(theme.palette.grey[900], 0.48)}
                    />

                    <Typography sx={{ mt: 2, mb: 2 }} component="h3">{item?.productName?.en || 'Product Name'} </Typography>
                  </Box>
                  <ListItemText
                    sx={{ mb: 1 }}

                    primaryTypographyProps={{ typography: 'subtitle1' }}
                    secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
                  />
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    sx={{ py: 3, typography: 'subtitle1' }}
                  >
                    <div>
                      <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        Total Sales
                      </Typography>
                      <Typography component="h3"> {item?.totalSales}</Typography>
                    </div>

                    <div>
                      <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        Total Orders
                      </Typography>

                      <Typography component="h3">{item?.totalOrders}</Typography>
                    </div>

                    <div>
                      <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        Quantity Sold
                      </Typography>
                      <Typography component="h3">{item?.quantitySold}</Typography>
                    </div>
                  </Box>
                </Card>
              ))
              : sellingItems.map((item: any) => (
                <Card sx={{ textAlign: 'center', width: '300px' }} key={item.id}>
                  <Box sx={{ position: 'relative' }}>




                    <Image

                      src={item?.productImage?.length > 0 ? item?.productImage : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
                      alt={item?.productName}
                      ratio="16/9"
                      overlay={alpha(theme.palette.grey[900], 0.48)}
                    />
                    <Typography sx={{ mt: 2, mb: 2 }} component="h3">{item?.productName?.en}</Typography>
                  </Box>

                  <ListItemText
                    sx={{ mb: 1 }}

                    primaryTypographyProps={{ typography: 'subtitle1' }}
                    secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
                  />



                  <Divider sx={{ borderStyle: 'dashed' }} />

                  <Box
                    display="grid"
                    gridTemplateColumns="repeat(3, 1fr)"
                    sx={{ py: 3, typography: 'subtitle1' }}
                  >
                    <div>
                      <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        Total Sales
                      </Typography>
                      <Typography component="h3"> {item?.totalSales}</Typography>
                    </div>

                    <div>
                      <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        Total Orders
                      </Typography>

                      <Typography component="h3">{item?.totalOrders}</Typography>
                    </div>

                    <div>
                      <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                        Quantity Sold
                      </Typography>
                      <Typography component="h3">{item?.quantitySold}</Typography>
                    </div>
                  </Box>
                </Card>
              ))}
          </>
        )}
      </AppHolder>
      {/* Best Selling Categories */}
      <AppHolder title="Best Selling Categories">
      {Loading ? (
             <Grid container spacing={2}>
             {[1, 2, 3].map((_, index) => ( 
               <Box sx={{ width: 350,mx:1 }} key={index}>
                 <Skeleton variant="rectangular" height={150} />
                 <Skeleton sx={{ mt: 1, mb: 1 }} />
                 <Skeleton width="60%" />
               </Box>
             ))}
           </Grid>
       
        ) : (
          <>
        {bestSellingCategories?.length > 0
          ? bestSellingCategories.map((item: any, i) => (
            <Card sx={{ textAlign: 'center', width: '400px' }} key={item.id}>
              <Box sx={{ position: 'relative' }}>




                <Image

                  src={item?.categoryName?.length > 0 ? item?.categoryName : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
                  alt={item?.categoryImage}
                  ratio="16/9"
                  overlay={alpha(theme.palette.grey[900], 0.48)}
                />
                <Typography sx={{ mt: 2, mb: 2 }} component="h3">{item?.categoryName?.en}</Typography>
              </Box>

              <ListItemText
                sx={{ mb: 1 }}

                primaryTypographyProps={{ typography: 'subtitle1' }}
                secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
              />



              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                sx={{ py: 3, typography: 'subtitle1' }}
              >
                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                    Total Sales
                  </Typography>
                  <Typography component="h3"> {item?.totalSales}</Typography>
                </div>

                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                    Total Orders
                  </Typography>

                  <Typography component="h3">{item?.totalOrders}</Typography>
                </div>

                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                    Quantity Sold
                  </Typography>
                  <Typography component="h3">{item?.quantitySold}</Typography>
                </div>
              </Box>
            </Card>
          ))
          : sellingCategories.map((item) => (
            <Card sx={{ textAlign: 'center', width: '400px' }} key={item.id}>
              <Box sx={{ position: 'relative' }}>



                {/* 
                <Image
                  src={item?.categoryName.length > 0 ? item?.categoryName : 'https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg'}
                  alt={item?.categoryImage}
                  ratio="16/9"
                  overlay={alpha(theme.palette.grey[900], 0.48)}
                /> */}
                <Typography sx={{ mt: 2, mb: 2 }} component="h3">{item?.categoryName?.en}</Typography>
              </Box>

              <ListItemText
                sx={{ mb: 1 }}

                primaryTypographyProps={{ typography: 'subtitle1' }}
                secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
              />



              <Divider sx={{ borderStyle: 'dashed' }} />

              <Box
                display="grid"
                gridTemplateColumns="repeat(3, 1fr)"
                sx={{ py: 3, typography: 'subtitle1' }}
              >
                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                    Total Sales
                  </Typography>
                  <Typography component="h3"> {item?.totalSales}</Typography>
                </div>

                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                    Total Orders
                  </Typography>

                  <Typography component="h3">{item?.totalOrders}</Typography>
                </div>

                <div>
                  <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
                    Quantity Sold
                  </Typography>
                  <Typography component="h3">{item?.quantitySold}</Typography>
                </div>
              </Box>
            </Card>
            
          ))}
            </>
        )}
      </AppHolder>
    </Grid>
  );
};

export default BestSellingView;
