import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import RemoveIcon from '@mui/icons-material/Remove';

// @mui
import { Box, IconButton, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

import { UploadBox } from 'src/components/upload';
import Iconify from 'src/components/iconify/iconify';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StepOne({
  openProductName,
  setOpenProductName,
  languages,
  productData,
  deleteImage,
  handleAddImage,
  openProductDescription,
  setOpenProductDescription,
  categoryState,
  brandState,
  preparationTimeUnits,
  ingrediants,
  setIngrediants,
  seasons,
  setSeason,
  styles,
  setStyles,
  occasion,
  setOccasion,
}: any) {
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
          mb: openProductName ? 2.5 : 0,
        }}
      >
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{
            opacity: 0.7,
            fontSize: '1.2rem',
            display: 'flex',
            maxWidth: { xs: '120px', md: '218px' },
          }}
        >
          Product Name
        </Typography>
        <IconButton onClick={() => setOpenProductName((val: any) => !val)}>
          {openProductName ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          height: openProductName ? '425px' : 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: '0.3s ease',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            transform: `translateY(${openProductName ? 0 : '-100%'})`,
            transition: '0.3s ease',
          }}
        >
          {languages?.map((el: string) => (
            <>
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{
                  opacity: 0.7,
                  fontSize: '.9rem',
                  maxWidth: { xs: '120px', md: '218px' },
                }}
              >
                Product Name ({el.toUpperCase()})
              </Typography>
              <RHFTextField fullWidth variant="filled" name={`name.${el}`} />
            </>
          ))}
        </Box>
      </Box>
      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Upload Product Images
      </Typography>

      <Box mt="10px" sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {productData?.images.map((file: any, ind: any) => {
          return (
            <Box key={ind}>
              <Box
                sx={{
                  width: '100px',
                  height: '100px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  flexDirection: 'column',
                  border: '1px dashed rgb(134, 136, 163,.5)',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  component="img"
                  src={typeof file === 'string' ? file : URL.createObjectURL(file as any)}
                  alt=""
                  sx={{ maxHeight: '95px' }}
                />
                <Box
                  onClick={() => deleteImage(ind)}
                  sx={{
                    backgroundColor: 'rgb(134, 136, 163,.09)',
                    padding: '10px 11px 7px 11px',
                    borderRadius: '36px',
                    cursor: 'pointer',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  <Iconify icon="ic:round-delete" style={{ color: '#8688A3' }} />
                </Box>
              </Box>
            </Box>
          );
        })}
        <UploadBox
          sx={{
            width: '100px!important',
            height: '100px!important',
            textAlign: 'center',
            padding: '20px',
          }}
          onDrop={handleAddImage}
          maxFiles={5 - productData?.images?.length}
          maxSize={5242880}
          accept={{
            'image/jpeg': [],
            'image/png': [],
          }}
          disabled={productData?.images?.length === 5}
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
              <Iconify icon="system-uicons:picture" style={{ color: '#8688A3' }} />
              <span style={{ color: '#8688A3', fontSize: '.6rem' }}>Upload Image</span>
            </Box>
          }
        />
      </Box>

      {/* { */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 4,
          mb: openProductDescription ? 2.5 : 0,
        }}
      >
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{
            opacity: 0.7,
            fontSize: '1.2rem',
            display: 'flex',
            maxWidth: { xs: '120px', md: '218px' },
          }}
        >
          Product Description
        </Typography>
        <IconButton onClick={() => setOpenProductDescription((val: any) => !val)}>
          {openProductDescription ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
      </Box>
      <Box
        sx={{
          height: openProductDescription ? '1000px' : 0,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          transition: '0.7s ease',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            transform: `translateY(${openProductDescription ? 0 : '-100%'})`,
            transition: '0.7s ease',
          }}
        >
          {languages?.map((el: string) => (
            <>
              <Typography
                component="p"
                noWrap
                variant="subtitle2"
                sx={{
                  opacity: 0.7,
                  fontSize: '.9rem',
                  maxWidth: { xs: '120px', md: '218px' },
                }}
              >
                Product Description ({el.toUpperCase()})
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`description.${el}`}
                multiline
                rows={5}
              />
            </>
          ))}
          {/* } */}
        </Box>
      </Box>
      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Category
      </Typography>
      <RHFSelect
        fullWidth
        variant="filled"
        name="categoryId"
        id="demo-simple-select2"
        defaultValue={categoryState.list[0] && categoryState.list[0]._id}
      >
        {categoryState &&
          categoryState.list.map((cat: any, index: any) => (
            <MenuItem key={index} value={cat._id}>
              {cat?.name?.en || cat?.name || ''}
            </MenuItem>
          ))}
      </RHFSelect>

      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Sub-Category
      </Typography>
      <RHFSelect
        fullWidth
        variant="filled"
        id="demo-simple-select"
        name="subcategoryId"
        defaultValue={categoryState && categoryState?.subCatList[0]?._id}
      >
        {categoryState &&
          categoryState.subCatList.map((item: any, ind: any) => (
            <MenuItem key={ind} value={item._id}>
              {item?.name?.en || item?.name || ''}
            </MenuItem>
          ))}
      </RHFSelect>

      <Typography
        mt="20px"
        mb="5px"
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Brand
      </Typography>
      <RHFSelect
        fullWidth
        variant="filled"
        name="brandId"
        id="demo-simple-brand"
        defaultValue={brandState?.list[0]?._id}
      >
        {brandState?.list &&
          brandState.list?.map((brandObj: any) => (
            <MenuItem key={brandObj._id} value={brandObj._id}>
              {brandObj.name.localized}
            </MenuItem>
          ))}
      </RHFSelect>
      <Typography
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Sort
      </Typography>
      <RHFTextField fullWidth variant="filled" name="sort" type="number" />
      <Typography
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Preperation Time
      </Typography>
      <Box sx={{ display: 'flex', gap: '3px' }}>
        <RHFTextField variant="filled" name="preparationTime" type="number" fullWidth />
        <RHFSelect
          variant="filled"
          name="preparationTimeUnit"
          id="demo-simple-brand"
          sx={{ width: '30%' }}
          defaultValue={preparationTimeUnits[0].value}
        >
          {preparationTimeUnits.map((unit: any) => (
            <MenuItem key={unit.value} value={unit.value}>
              {unit.name}
            </MenuItem>
          ))}
        </RHFSelect>
      </Box>
      {/* Ingredients */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
        >
          Ingredients
        </Typography>
        <IconButton onClick={() => setIngrediants((prev: any) => [...prev, prev.length])}>
          <AddIcon />
        </IconButton>
      </Box>
      {ingrediants.map((el: any) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <RHFTextField variant="filled" name={`ingredients[${el}]`} fullWidth />
          <IconButton
            onClick={() =>
              setIngrediants((prev: any) => prev.filter((ingrediant: any) => ingrediant !== el))
            }
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {/* Seasons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
        >
          Seasons
        </Typography>
        <IconButton onClick={() => setSeason((prev: any) => [...prev, prev.length])}>
          <AddIcon />
        </IconButton>
      </Box>
      {seasons.map((el: any) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <RHFTextField variant="filled" name={`seasons[${el}]`} fullWidth />
          <IconButton
            onClick={() => setSeason((prev: any) => prev.filter((season: any) => season !== el))}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {/* styles */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
        >
          Styles
        </Typography>
        <IconButton onClick={() => setStyles((prev: any) => [...prev, prev.length])}>
          <AddIcon />
        </IconButton>
      </Box>
      {styles.map((el: any) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <RHFTextField variant="filled" name={`styles[${el}]`} fullWidth />
          <IconButton
            onClick={() => setStyles((prev: any) => prev.filter((style: any) => style !== el))}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      {/* occasion */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
        >
          Occasions
        </Typography>
        <IconButton onClick={() => setOccasion((prev: any) => [...prev, prev.length])}>
          <AddIcon />
        </IconButton>
      </Box>
      {occasion.map((el: any) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <RHFTextField variant="filled" name={`occasions[${el}]`} fullWidth />
          <IconButton
            onClick={() =>
              setOccasion((prev: any) => prev.filter((occasion: any) => occasion !== el))
            }
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Typography
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Fit
      </Typography>
      <RHFTextField fullWidth variant="filled" name={`fit`} />
      <Typography
        component="p"
        noWrap
        variant="subtitle2"
        sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
      >
        Calories
      </Typography>
      <RHFTextField fullWidth variant="filled" name={`calories`} />
    </>
  );
}
