import { m } from 'framer-motion';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
// components
import Image from 'src/components/image';
import { MotionContainer, varFade } from 'src/components/animate';
import Carousel, { CarouselDots, CarouselArrows, useCarousel } from 'src/components/carousel';

// ----------------------------------------------------------------------
type ItemNameProps = {
  en: string;
  ar: string;
  localized: string;

};

type ItemProps = {
  id: string;
  name: ItemNameProps;
  image: string;
  productsNumber: number;
};

interface Props extends CardProps {
  list: ItemProps[];
}

export default function AppFeatured({ list, ...other }: Props) {

  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
    
    ...CarouselDots({
      sx: {
        top: 16,
        left: 16,
        position: 'absolute',
        color: 'primary.light',
      },
    }),
  });

  return (
    <Card {...other}>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {list.map((app, index) => (
          <CarouselItem key={app.id} item={app} active={index === carousel.currentIndex} />
        ))}
      </Carousel>

      <CarouselArrows
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
        sx={{ top: 8, right: 8, position: 'absolute', color: 'common.white' }}
      />
    </Card>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  item: ItemProps;
  active?: boolean;
};

function CarouselItem({ item, active }: CarouselItemProps) {
  const theme = useTheme();

  const { image, name,productsNumber } = item;

  const renderImg = (
    <Image
      alt='test'
      src={image}
      overlay={`linear-gradient(to bottom, ${alpha(theme.palette.grey[200], 0)} 0%, ${
        theme.palette.grey[900]
      } 85%)`}
      sx={{
        width: 1,
        height: {
          xs: 200, // Adjust the height for extra-small screens
          sm: 250, // Adjust the height for small screens
          md: 300, // Adjust the height for medium screens
          lg: 350, // Adjust the height for large screens
          xl: 400, // Adjust the height for extra-large screens
        },
      }}
    />
  );

  return (
    <MotionContainer action animate={active} sx={{ position: 'relative' }}>
      <Stack
        spacing={1}
        sx={{
          p: 3,
          width: 1,
          bottom: 0,
          zIndex: 9,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={varFade().inRight}>
          <Typography variant="overline" sx={{ color: 'primary.light' }}>
          {name?.en}
 
          </Typography>
        </m.div>

      

        <m.div variants={varFade().inRight}>
          <Typography variant="body2" noWrap>
        {productsNumber} productsNumber
          </Typography>
        </m.div>
      </Stack>

      {renderImg}
    </MotionContainer>
  );
}
