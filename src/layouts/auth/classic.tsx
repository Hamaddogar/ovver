// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
// auth
import { useAuthContext } from 'src/auth/hooks';
// routes
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
// hooks
import { useResponsive } from 'src/hooks/use-responsive';
// theme
import { bgGradient } from 'src/theme/css';
// components
import Logo from 'src/components/logo';
import Slider from 'react-slick';
import ToggleBtn from 'src/app/components/mui/toggleBtn/page';
// images and styles
import zakiLogo from '../../../public/logo.png'
import sliderImg1 from '../../../public/sliderImg1.png'
import sliderImg2 from '../../../public/sliderImg2.png'
import sliderImg3 from '../../../public/sliderImg3.png'
import sliderImg4 from '../../../public/sliderImg4.png'
import Image, { StaticImageData } from 'next/image';
import styles from './auth.module.css'
import './auth.module.css'
// next 
import Link from 'next/link';
import { useSettingsContext } from 'src/components/settings';
import { usePathname } from 'next/navigation';

// ----------------------------------------------------------------------

const METHODS = [
  {
    id: 'jwt',
    label: 'Jwt',
    path: paths.auth.jwt.login,
    icon: '/assets/icons/auth/ic_jwt.svg',
  },
  {
    id: 'firebase',
    label: 'Firebase',
    path: paths.auth.firebase.login,
    icon: '/assets/icons/auth/ic_firebase.svg',
  },
  {
    id: 'amplify',
    label: 'Amplify',
    path: paths.auth.amplify.login,
    icon: '/assets/icons/auth/ic_amplify.svg',
  },
  {
    id: 'auth0',
    label: 'Auth0',
    path: paths.auth.auth0.login,
    icon: '/assets/icons/auth/ic_auth0.svg',
  },
];

type Props = {
  title?: string;
  image?: string;
  children: React.ReactNode;
};

const LoginSlider = () => {
  const slides = [
    { title: 'Websites', imageSrc: sliderImg1 },
    { title: 'Marketing', imageSrc: sliderImg2 },
    { title: 'Mobile App', imageSrc: sliderImg3 },
    { title: 'Invoices', imageSrc: sliderImg4 },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    slide: 'div',
    autoplaySpeed: 3000,
    appendDots: (dots: React.ReactNode) => (
      <div
        style={{
          left: '-200px',
          bottom: '-80px',
        }}
      >
        <ul style={{ margin: "0px" }} className={styles.dotsButton}> {dots} </ul>
      </div>
    ),

  };
  return (
    <div className="slidecontainer" style={{
      width: '100%',
    }}>
      <Slider {...settings} >
        {
          slides.map((slide: { title: string, imageSrc: StaticImageData }) => (
            <div className={styles.slide}>
              <div className={styles.slideItem}>
                <h4 className={styles.slogan}>Get access <br />
                  for managing your<br /><span className={styles.title}>{slide.title}</span></h4>
                <Image src={zakiLogo} alt='zaki logo' width={60} height={60} className={styles.logo} />
              </div>
              <Image src={slide.imageSrc} alt='slider logo' className={styles.slideImg} width={300} height={200} />
            </div>
          ))
        }
      </Slider>
    </div >
  );
}
export default function AuthClassicLayout({ children, image, title }: Props) {

  const pathName = usePathname()
  console.log(pathName, '===')
  const upLg = useResponsive('up', 'lg');

  const upMd = useResponsive('up', 'md');

  // const renderLogo = (
  //   <Logo
  //     sx={{
  //       zIndex: 9,
  //       position: 'absolute',
  //       m: { xs: 2, md: 5 },
  //     }}
  //   />
  // );

  const renderContent = (
    <Stack
      flexGrow={1}
      sx={{
        width: 1,
        background: 'url(/login-ellipse.png)',
        backgroundPosition: 'left',
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat-x',
        backgroundColor: 'white',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '100%',
        px: { xs: 2, md: 8 },
        py: { xs: 15, md: 30 },
      }}
    >
      <>
        {/* <ToggleBtn /> */}
        {children}
        <div style={{ display: 'flex', alignItems: 'center', marginTop: '10%' }}>
          <IconButton
            aria-label="go back"
            href='/'
            size="medium"
            sx={{
              color: 'secondary.lighter',
              backgroundColor: '#0F1546',
              '&:hover': {
                backgroundColor: 'secondary.lighter',
                color: '#0F1546'
              },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Link href={pathName === '/auth/jwt/check-user' ? paths.dashboard.root : paths.auth.jwt.checkUser} passHref style={{
            textDecoration: 'none'
          }}>
            <Typography
              variant="body1"
              component="a"
              color='#0F1546'

              sx={{
                cursor: 'pointer',
                ml: 1,

              }}
            >
              Go back to home
            </Typography>
          </Link>
        </div>
      </>
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      alignItems="center"
      flexDirection={'row'}
      className={styles.section}
      sx={{
        display: upMd ? 'flex' : 'none',
        width: upLg ? '70%' : '50%',
        height: '100%'
      }}
    >
      <LoginSlider />
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction={upMd ? 'row-reverse' : 'column-reverse'}
      sx={{
        height: '100vh',
        overflow: 'hidden'
      }}
    >

      {/* {renderLogo} */}

      {renderSection}

      {renderContent}
    </Stack>
  );
}
