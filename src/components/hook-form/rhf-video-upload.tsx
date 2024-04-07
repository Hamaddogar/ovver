import React, { useEffect, useRef, useState } from 'react';
import { Box, FormHelperText, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useTranslation } from 'react-i18next';
import { UploadBox, UploadProps } from 'src/components/upload';
import { Controller, useFormContext } from 'react-hook-form';

interface VideoUploadProps extends Omit<UploadProps, 'file'> {
  video: string | Blob | null; // value: video url from db, file, or null.
  handleVideoChange: Function; // change handler
  placeholderText?: string; // ex: 'upload an video', 'choose an icon', ...
  acceptedTypes?: string[]; // Array of accepted file types. default ex: ['JPG', 'PNG']
  name?: string; // optional name for input, default is set to: 'video'
  multiple?: boolean;
}

export default function RHFVideoUpload({
  video,
  handleVideoChange,
  placeholderText,
  acceptedTypes = ['mp4'],
  name = 'video',
}: VideoUploadProps) {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const accept: {
    [key: string]: string[];
  } = {};
  acceptedTypes?.forEach((type) => (accept[`video/${type}`] = []));
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

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', captureThumbnail);
    }
    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', captureThumbnail);
      }
    };
  }, [video]);

  const captureThumbnail = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const url = canvas.toDataURL('image/png');
      setThumbnailUrl(url);
    }
  };

  // const renderContent = ;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box>
            {/* {renderContent} */}
            {video ? (
              <Box display={'flex'}>
                <Box
                  display={'flex'}
                  m={1}
                  justifyContent={'center'}
                  alignItems={'center'}
                  sx={{ ...borderDashed }}
                >
                  <Box
                    component="video"
                    ref={videoRef}
                    src={URL.createObjectURL(video as any)}
                    sx={{
                      ...borderDashed,
                    }}
                  >
                    <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    {thumbnailUrl && <img src={thumbnailUrl} alt="Video thumbnail" />}
                    Your browser does not support the video tag.
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Box>
                      <UploadBox
                        name={name}
                        onDrop={(file) => {
                          handleVideoChange(file);
                        }}
                        maxFiles={1}
                        maxSize={5242880}
                        accept={accept}
                        placeholder={
                          <Tooltip title={t('brand.edit')}>
                            <Iconify color="text.secondary" icon="lucide:edit" width={25} />
                          </Tooltip>
                        }
                        sx={{
                          border: 'unset',
                          borderRadius: '50px',
                          width: '40px',
                          height: '40px',
                        }}
                      />
                    </Box>
                  </Box>
                  <Typography
                    mt="0px"
                    component="p"
                    variant="subtitle2"
                    sx={{
                      opacity: 0.7,
                      pt: 1,
                      fontSize: '.9rem',
                      '&::first-letter': {
                        textTransform: 'capitalize',
                      },
                    }}
                  >
                    {t('brand.max_size')}
                  </Typography>

                  <Typography
                    mt="0px"
                    component="p"
                    variant="subtitle2"
                    sx={{
                      opacity: 0.7,
                      fontSize: '.8rem',
                      '&::first-letter': {
                        textTransform: 'capitalize',
                      },
                    }}
                  >
                    {t('brand.extensions', { var: acceptedTypes?.join(', ') })}
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box display={'flex'}>
                <UploadBox
                  name={name}
                  sx={{ py: 2.5, mb: 3, ...borderDashed }}
                  onDrop={(file) => {
                    handleVideoChange(file);
                  }}
                  maxFiles={1}
                  maxSize={5242880}
                  accept={accept}
                  placeholder={
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        flexDirection: 'column',
                      }}
                    >
                      <Iconify icon="octicon:video-16" width={40} />
                      <Typography
                        sx={{
                          fontWeight: 'bold',
                          textAlign: 'center',
                          textTransform: 'capitalize',
                        }}
                      >
                        {placeholderText || t('products.create_product.upload_video')}
                      </Typography>
                    </Box>
                  }
                />
                <Box>
                  <Typography
                    mt="0px"
                    component="p"
                    variant="subtitle2"
                    sx={{
                      opacity: 0.7,
                      pt: 1,
                      fontSize: '.9rem',
                      '&::first-letter': {
                        textTransform: 'capitalize',
                      },
                    }}
                  >
                    {t('brand.max_size')}
                  </Typography>

                  <Typography
                    mt="0px"
                    component="p"
                    variant="subtitle2"
                    sx={{
                      opacity: 0.7,
                      fontSize: '.8rem',
                      '&::first-letter': {
                        textTransform: 'capitalize',
                      },
                    }}
                  >
                    {t('brand.extensions', { var: acceptedTypes?.join(', ') })}
                  </Typography>
                </Box>
              </Box>
            )}
            {!!error && (
              <FormHelperText error sx={{ px: 2 }}>
                {error.message}
              </FormHelperText>
            )}
          </Box>
        );
      }}
    />
  );
}
