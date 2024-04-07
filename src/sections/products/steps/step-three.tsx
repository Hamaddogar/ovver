import { RHFCheckbox, RHFSelect, RHFTextField } from 'src/components/hook-form';
import { Box, IconButton, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StepThree({
  variants,
  setVariants,
  selectedDomain,
  selectionTypes,
  variantsRows,
  setVariantsRow,
}: any) {
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          component="p"
          noWrap
          variant="subtitle2"
          sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
        >
          Variants
        </Typography>
        <IconButton onClick={() => setVariants((prev: any) => [...prev, prev.length])}>
          <AddIcon />
        </IconButton>
      </Box>
      {variants.map((variant: any) => (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Variant {variant + 1}
            </Typography>
            <IconButton
              onClick={() =>
                setVariants((prev: any) => prev.filter((element: any) => element !== variant))
              }
            >
              <DeleteIcon />
            </IconButton>
          </Box>
          {selectedDomain?.appLanguage?.map((el: string) => (
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
                Group Name ({el.toUpperCase()})
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`varients[${variant}].groupName.${el}`}
              />
            </>
          ))}
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Selection Type
          </Typography>
          <RHFSelect
            variant="filled"
            name={`varients[${variant}].selectionType`}
            id="demo-simple-brand"
            fullWidth
            defaultValue={selectionTypes[0]}
          >
            {selectionTypes?.map((unit: any) => (
              <MenuItem key={unit} value={unit}>
                {unit.toUpperCase()}
              </MenuItem>
            ))}
          </RHFSelect>
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Minimum
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name={`varients[${variant}].minimum`}
            type="number"
          />
          <Typography
            component="p"
            noWrap
            variant="subtitle2"
            sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
          >
            Maximum
          </Typography>
          <RHFTextField
            fullWidth
            variant="filled"
            name={`varients[${variant}].maximum`}
            type="number"
          />
          <RHFCheckbox
            name={`varients[${variant}].required`}
            label="Required" // Assuming your RHFCheckbox supports a label prop
          />
          <RHFCheckbox
            name={`varients[${variant}].allowMoreQuantity`}
            label="Allow More Quantity" // Assuming your RHFCheckbox supports a label prop
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography
              component="p"
              noWrap
              variant="subtitle2"
              sx={{ opacity: 0.7, fontSize: '.9rem', maxWidth: { xs: '120px', md: '218px' } }}
            >
              Variants Rows
            </Typography>
            <IconButton onClick={() => setVariantsRow((prev: any) => [...prev, prev.length])}>
              <AddIcon />
            </IconButton>
          </Box>
          {variantsRows.map((row: any) => (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
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
                  Row {row + 1}
                </Typography>
                <IconButton
                  onClick={() =>
                    setVariantsRow((prev: any) => prev.filter((element: any) => element !== row))
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
              {selectedDomain?.appLanguage?.map((el: string) => (
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
                    Variant Name ({el.toUpperCase()})
                  </Typography>
                  <RHFTextField
                    fullWidth
                    variant="filled"
                    name={`varients[${variant}].varientRows[${row}].name.${el}`}
                  />
                </>
              ))}
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
                Price
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`varients[${variant}].varientRows[${row}].price`}
                type="number"
              />
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
                Price After Discount
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`varients[${variant}].varientRows[${row}].priceAfterDiscount`}
                type="number"
              />
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
                Quantity
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`varients[${variant}].varientRows[${row}].quantity`}
                type="number"
              />
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
                Sku
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`varients[${variant}].varientRows[${row}].sku`}
              />
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
                Barcode
              </Typography>
              <RHFTextField
                fullWidth
                variant="filled"
                name={`varients[${variant}].varientRows[${row}].barcode`}
              />
            </>
          ))}
        </>
      ))}
    </>
  );
}
