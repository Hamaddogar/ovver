import React from 'react';
import { Box, FormHelperText, Tooltip, Typography, alpha, useTheme } from '@mui/material';
import Iconify from 'src/components/iconify/iconify';
import { useTranslation } from 'react-i18next';
import { UploadBox, UploadProps } from 'src/components/upload';
import { Controller, useFormContext } from 'react-hook-form';

interface ImageUploadProps extends Omit<UploadProps, 'file'> {
  image: string | File | null; // value: image url from db, file, or null.
  handleImageChange: Function; // change handler
  placeholderText?: string; // ex: 'upload an image', 'choose an icon', ...
  acceptedTypes?: string[]; // Array of accepted file types. default ex: ['JPG', 'PNG']
  name?: string; // optional name for input, default is set to: 'image'
  multiple?: boolean;
}

export default function RHFImageUpload({
  image,
  handleImageChange,
  placeholderText,
  acceptedTypes = ['JPG', 'PNG'],
  name = 'image',
}: ImageUploadProps) {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const accept: {
    [key: string]: string[];
  } = {};
  acceptedTypes?.forEach((type) => (accept[`image/${type}`] = []));
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

  const renderContent = image ? (
    <Box display={'flex'}>
      <Box
        display={'flex'}
        m={1}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ ...borderDashed }}
      >
        <Box
          component="img"
          src={typeof image === 'string' ? image : URL.createObjectURL(image as any)}
          alt=""
          borderRadius={'5px'}
          borderColor={'text.disabled'}
          sx={{ maxHeight: '95px' }}
        />
      </Box>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Box>
            <UploadBox
              name={name}
              onDrop={(file) => {
                handleImageChange(file);
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
        sx={{
          py: 2.5,
          mb: 3,
          ...borderDashed,
        }}
        onDrop={(file) => {
          handleImageChange(file);
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
            <Iconify icon="eva:cloud-upload-fill" width={40} />
            <Typography
              sx={{
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'capitalize',
              }}
            >
              {placeholderText || t('brand.upload_image')}
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
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return (
          <Box>
            {renderContent}
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
