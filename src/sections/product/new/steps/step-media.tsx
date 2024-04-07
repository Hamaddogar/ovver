// FILES & MEDIA

import { Box, Grid, IconButton, Stack, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import { RHFImageUpload, RHFTextField, RHFVideoUpload } from 'src/components/hook-form';
import SectionTitle from '../section-title';
import { useLocales } from 'src/locales';
import { useState } from 'react';
import Iconify from 'src/components/iconify';

type Image = File | string;
export default function StepMedia({}: any) {
  const { t } = useLocales();
  const [link, setLink] = useState('');
  const [mainImage, setMainImage] = useState<string | File | null>(null);
  const [images, setImages] = useState<Image[]>([]);
  const [video, setVideo] = useState<string | File | null>(null);
  console.log('video', video);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages([...images, ...Array.from(event.target.files)]);
    }
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const theme = useTheme();
  const borderDashed = {
    width: 130,
    height: 130,
    cursor: 'pointer',
    border: '2px dashed',
    borderColor: 'text.disabled',
    borderRadius: 1.2,
    color: 'text.disabled',
    bgcolor: alpha(theme.palette.text.disabled, 0.15),
  };
  return (
    <Grid container>
      {/* ========== section ========== */}
      <Grid item xs={12} sx={{ px: 2 }} textTransform="capitalize">
        <SectionTitle title={t('products.create_product.media')} />
      </Grid>
      <Grid item xs={12} md={6} sx={{ px: 2 }} textTransform="capitalize">
        {/* ===== MAIN IMAGE ===== */}
        <Stack
          sx={{
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.main_image')}
          </Typography>
          <RHFImageUpload
            image={mainImage}
            handleImageChange={(file: File[]) => {
              setMainImage(file[0]);
            }}
          />
        </Stack>
        {/* ===== PRODUCT IMAGES ===== */}
        <Stack
          sx={{
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.product_images')}
          </Typography>
          <Grid container direction="row" sx={{ flexWrap: 'wrap' }} gap={1}>
            {images.map((image, index) => (
              <Grid item key={index} sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={typeof image === 'string' ? image : URL.createObjectURL(image)}
                  alt="upload-preview"
                  sx={{ ...borderDashed }}
                />
                <Tooltip title={t('common.delete')}>
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bgcolor: 'text.disabled',
                      color: 'text.primary',
                      top: 5,
                      insetInlineEnd: 5,
                    }}
                    onClick={() => handleImageRemove(index)}
                  >
                    <Iconify icon="lucide:trash-2" width={25} />
                  </IconButton>
                </Tooltip>
              </Grid>
            ))}
            {/* ===== upload image ===== */}
            {images.length < 5 && (
              <Box>
                <Box component="label">
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      flexDirection: 'column',
                      ...borderDashed,
                    }}
                  >
                    <Iconify icon="octicon:image-16" width={40} />
                    <Typography
                      sx={{
                        fontWeight: 'bold',
                        textAlign: 'center',
                        textTransform: 'capitalize',
                      }}
                    >
                      {t('brand.upload_image')}
                    </Typography>
                  </Box>
                  <input type="file" hidden multiple onChange={handleImageUpload} />
                </Box>
              </Box>
            )}
          </Grid>
        </Stack>
        {/* ===== PRODUCT VIDEO ===== */}
        <Stack
          sx={{
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.product_video')}
          </Typography>
          <RHFVideoUpload
            video={video}
            handleVideoChange={(file: File[]) => {
              setVideo(file[0]);
            }}
          />
        </Stack>
      </Grid>
      {/* ========== YOUTUBE LINK ========== */}
      <Grid item xs={12} md={6} sx={{ px: 2 }} textTransform="capitalize">
        <Stack
          sx={{
            mt: 4,
          }}
        >
          <Typography
            component="p"
            noWrap
            variant="body1"
            sx={{
              opacity: 0.7,
              fontSize: '1.2rem',
              display: 'flex',
              textTransform: 'capitalize',
            }}
          >
            {t('products.create_product.yt_link')}
          </Typography>
          <RHFTextField
            variant="filled"
            name=""
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
