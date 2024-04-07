// product details

import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import SectionTitle from '../section-title';
import { useLocales } from 'src/locales';
import {
  RHFCheckbox,
  RHFDatePicker,
  RHFRadioGroup,
  RHFSelect,
  RHFTextField,
} from 'src/components/hook-form';
import { useState } from 'react';
import Iconify from 'src/components/iconify';
import { DatePicker } from '@mui/lab';

export default function StepProductDetails({}: any) {
  const { t } = useLocales();

  return (
    <Box textTransform="capitalize">
      <Grid container>
        {/* ===== title ===== */}
        <Grid item xs={12} sx={{ px: 2 }}>
          <SectionTitle title={t('products.create_product.details_title')} />
        </Grid>
        {/* ========== first section ========== */}
        <FirstSection t={t} />
      </Grid>
      {/* ========== CustomSection ========== */}
      <CustomSection t={t} />
      {/* ========== RestaurantSection ========== */}
      <RestaurantSection t={t} />
      {/* ========== LibrarySection ========== */}
      <LibrarySection t={t} />
      {/* ========== ToysSection ========== */}
      <ToysSection t={t} />
    </Box>
  );
}

function FirstSection({ t }: any) {
  const [tags, setTags] = useState<string[]>(['']);

  const handleInputChange = (index: number, event: any) => {
    const values = [...tags];
    values[index] = event.target.value;
    setTags(values);
  };

  const handleRemoveClick = (index: number) => {
    const values = [...tags];
    values.splice(index, 1);
    setTags(values);
  };

  const handleAddClick = () => {
    setTags([...tags, '']);
  };

  return (
    <>
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        {/* ===== category ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.category')}
          </Typography>
          <RHFSelect
            fullWidth
            variant="filled"
            name="category"
            // onChange={(e) => {
            //   const selectedCategoryId = e.target.value;
            //   // Log the selected value
            //   seticonData((prev: any) => ({
            //     ...prev,
            //     category: {
            //       ...prev?.category,
            //       id: selectedCategoryId,
            //     },
            //   }));
            // }}
            // value={iconData?.category?.id || ''}
          >
            {[
              { name: 'mobile', id: 1 },
              { name: 'desktop', id: 2 },
            ]?.map((type: any) => (
              <MenuItem key={type.id} value={type.id} sx={{ textTransform: 'capitalize' }}>
                {type.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
        {/* ===== subcategory ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.subcategory') + ` (${t('common.optional')})`}
          </Typography>
          <RHFSelect
            fullWidth
            variant="filled"
            name="subcategory"
            // onChange={(e) => {
            //   const selectedCategoryId = e.target.value;
            //   // Log the selected value
            //   seticonData((prev: any) => ({
            //     ...prev,
            //     category: {
            //       ...prev?.category,
            //       id: selectedCategoryId,
            //     },
            //   }));
            // }}
            // value={iconData?.category?.id || ''}
          >
            {[
              { name: 'mobile', id: 1 },
              { name: 'desktop', id: 2 },
            ]?.map((type: any) => (
              <MenuItem key={type.id} value={type.id} sx={{ textTransform: 'capitalize' }}>
                {type.name}
              </MenuItem>
            ))}
          </RHFSelect>
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        {/* ===== sort ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.sort') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField variant="filled" name="sort" />
        </Box>
        {/* ===== sku ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.sku') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField variant="filled" name="sku" />
        </Box>
      </Grid>
      {/* ========== TAGS ========== */}
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        <Stack sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.tags')}
          </Typography>
          <Grid container gap={1}>
            {tags.map((tag, index) => (
              <Grid item xs={12} sm={5} key={index}>
                <RHFTextField
                  name=""
                  variant="filled"
                  value={tag}
                  onChange={(event) => handleInputChange(index, event)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('products.create_product.remove_tag')}>
                          <IconButton onClick={() => handleRemoveClick(index)}>
                            <Iconify icon="material-symbols:close-small" color="error.main" />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            ))}
          </Grid>
          {/* ===== ADD BRANCH BUTTON ===== */}
          <Tooltip title={t('products.create_product.add_tag')}>
            <Button
              onClick={handleAddClick}
              variant="soft"
              sx={{ width: 'fit-content', p: 2, mt: 1.2, borderRadius: 2 }}
            >
              <Iconify icon="pajamas:plus" />
            </Button>
          </Tooltip>
        </Stack>
      </Grid>
    </>
  );
}
function CustomSection({ t }: any) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SectionTitle title={t('products.create_product.custom')} />
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        {/* ===== brand ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.brand') + ` (${t('common.optional')})`}
          </Typography>
          <RHFSelect
            fullWidth
            variant="filled"
            name="brand"
            // onChange={(e) => {
            //   const selectedCategoryId = e.target.value;
            //   // Log the selected value
            //   seticonData((prev: any) => ({
            //     ...prev,
            //     category: {
            //       ...prev?.category,
            //       id: selectedCategoryId,
            //     },
            //   }));
            // }}
            // value={iconData?.category?.id || ''}
          >
            {[
              { name: 'brand 1', id: 1 },
              { name: 'brand 1', id: 2 },
            ]?.map((type: any) => (
              <MenuItem key={type.id} value={type.id} sx={{ textTransform: 'capitalize' }}>
                {type.name}
              </MenuItem>
            ))}
          </RHFSelect>
          {/* <RHFTextField variant="filled" name="brand" /> */}
        </Box>
        {/* ===== barcode ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.barcode') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField variant="filled" name="barcode" />
          {/* <RHFBarcodeInput variant="filled" name="barcode" /> */}
        </Box>
        {/* ===== unit ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.unit') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField variant="filled" name="unit" />
        </Box>
        {/* ===== material ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.material') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField variant="filled" name="material" />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        {/* ===== weight ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.weight') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField
            variant="filled"
            name="weight"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" aria-label="minutes" sx={{ textTransform: 'none' }}>
                  KG
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* ===== length ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.length') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField
            variant="filled"
            name="length"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" aria-label="minutes" sx={{ textTransform: 'none' }}>
                  CM
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* ===== width ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.width') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField
            variant="filled"
            name="width"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" aria-label="minutes" sx={{ textTransform: 'none' }}>
                  CM
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* ===== height ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.height') + ` (${t('common.optional')})`}
          </Typography>
          <RHFTextField
            variant="filled"
            name="height"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" aria-label="minutes" sx={{ textTransform: 'none' }}>
                  CM
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
function RestaurantSection({ t }: any) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SectionTitle title={t('products.create_product.restaurant')} />
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        {/* ===== preparation time ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.prep_time')}
          </Typography>
          <RHFTextField
            variant="filled"
            name="prep_time"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" aria-label="minutes" sx={{ textTransform: 'none' }}>
                  {/* {t('products.create_product.min')} TODO: */}
                  min
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* ===== calories ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.calories')}
          </Typography>
          <RHFTextField variant="filled" name="calories" />
        </Box>
        {/* ===== season ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.season')}
          </Typography>
          <RHFTextField variant="filled" name="season" />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        {/* ===== type ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.type')}
          </Typography>
          <RHFRadioGroup
            row
            name="type"
            // label="type"
            spacing={4}
            options={[
              { value: 'veg', label: t('products.create_product.veg') },
              { value: 'non_veg', label: t('products.create_product.non_veg') },
              { value: 'na', label: t('products.create_product.na') },
            ]}
          />
        </Box>
      </Grid>
    </Grid>
  );
}
function LibrarySection({ t }: any) {
  return (
    <Grid container>
      <Grid item xs={12}>
        <SectionTitle title={t('products.create_product.library')} />
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        {/* ===== format ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.format')}
          </Typography>
          <RHFTextField variant="filled" name="" />
        </Box>
        {/* ===== size ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.size')}
          </Typography>
          <RHFTextField
            variant="filled"
            name="size"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" aria-label="minutes" sx={{ textTransform: 'none' }}>
                  MB
                </InputAdornment>
              ),
            }}
          />
        </Box>
        {/* ===== duration ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.duration')}
          </Typography>
          <RHFTextField
            variant="filled"
            name="duration"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" aria-label="minutes" sx={{ textTransform: 'none' }}>
                  H
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={6} lg={4} sx={{ px: 2 }}>
        {/* ===== author ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.author')}
          </Typography>
          <RHFTextField variant="filled" name="author" />
        </Box>
        {/* ===== genre ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.genre')}
          </Typography>
          <RHFTextField variant="filled" name="genre" />
        </Box>
        {/* ===== release date ===== */}
        <Box sx={{ mt: 2 }}>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem' }}
          >
            {t('products.create_product.release_date')}
          </Typography>
          <RHFDatePicker name="release_date" variant="filled" sx={{ width: '100%' }} />
        </Box>
      </Grid>
    </Grid>
  );
}
function ToysSection({ t }: any) {
  return (
    <>
      <SectionTitle title={t('products.create_product.toys')} />
      {/* ===== gender ===== */}
      <Box sx={{ mt: 2 }}>
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem' }}
        >
          {t('products.create_product.gender')}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap' }} columnGap={2}>
          <RHFCheckbox name="boys" label={t('products.create_product.boys')} />
          <RHFCheckbox name="girls" label={t('products.create_product.girls')} />
          <RHFCheckbox name="babies" label={t('products.create_product.babies')} />
          <RHFCheckbox name="donations" label={t('products.create_product.donations')} />
        </Stack>
      </Box>
      {/* ===== age ===== */}
      <Box sx={{ mt: 2 }}>
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem' }}
        >
          {t('products.create_product.age')}
        </Typography>
        <Stack direction="row" sx={{ flexWrap: 'wrap' }} columnGap={2}>
          <RHFCheckbox name="3" label="3+" />
          <RHFCheckbox name="2" label="0-2" />
          <RHFCheckbox name="5" label="5+" />
          <RHFCheckbox name="10" label="10+" />
          <RHFCheckbox name="13" label="13+" />
        </Stack>
      </Box>
    </>
  );
}
