'use client';

// @mui
import { Box, Stack, Typography, Tooltip, IconButton } from '@mui/material';
import { DraggablePaper } from 'src/components/dashboard';
// components
import Iconify from 'src/components/iconify/iconify';
import { useLocales } from 'src/locales';

type Props = {
  index: number;
  brand: any;
  allowAction: any;
  setRemoveData: Function;
  confirm: any;
  toggleDrawerCommon: any;
};

export default function BrandPaper({
  index,
  brand,
  allowAction,
  setRemoveData,
  confirm,
  toggleDrawerCommon,
}: Props) {
  const { t } = useLocales();

  return (
    <>
      <DraggablePaper
        index={index}
        id={brand._id}
        actions={
          <>
            {allowAction.remove && (
              <Tooltip title={t('brand.delete_btn')}>
                <IconButton
                  onClick={() => {
                    setRemoveData(brand?._id);
                    confirm.onTrue();
                  }}
                >
                  <Iconify color="text.secondary" icon="lucide:trash-2" width={25} />
                </IconButton>
              </Tooltip>
            )}
            {allowAction.edit && (
              <Tooltip title={t('brand.edit')}>
                <IconButton onClick={toggleDrawerCommon(brand._id)}>
                  <Iconify color="text.secondary" icon="lucide:edit" width={25} />
                </IconButton>
              </Tooltip>
            )}
          </>
        }
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: '100%' }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '15px',
            }}
          >
            {brand?.image ? (
              <Box component="img" src={brand.image} alt=" " width="60px" height={'60px'} />
            ) : (
              <Box
                component="div"
                width="60px"
                height="60px"
                display={'flex'}
                alignItems={'center'}
                justifyContent={'center'}
              >
                <Iconify icon="uil:images" width="40px" height="40px" />
              </Box>
            )}

            <Box display="flex" gap="0px" flexDirection="column">
              <Typography
                component="p"
                variant="subtitle2"
                sx={{ fontSize: '.9rem', fontWeight: 800 }}
              >
                {brand.name.localized}
              </Typography>
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{
                  opacity: 0.7,
                  fontSize: '.9rem',
                  maxWidth: { xs: '120px', md: '218px' },
                  textTransform: 'capitalize',
                }}
              >
                {t('brand.productsNumber', { var: brand.productsNumber })}
              </Typography>
            </Box>
          </Box>
        </Stack>
      </DraggablePaper>
    </>
  );
}
