import { format } from 'date-fns';
// @mui
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import LinearProgress from '@mui/material/LinearProgress';
// utils
import { fCurrency, fNumber } from 'src/utils/format-number';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
// types
import { IProductItem } from 'src/types/product';
import { Chip, Stack, Switch, Tooltip } from '@mui/material';
import { useLocales } from 'src/locales';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

type Props = {
  row: IProductItem;
  selected: boolean;
  onEditRow: VoidFunction;
  onViewRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function ProductTableRow({
  row,
  selected,
  onSelectRow,
  onDeleteRow,
  onEditRow,
  onViewRow,
}: Props) {
  const { t } = useLocales();
  const {
    id,
    title: { localized: localizedName },
    genre,
    images,
    sort,
    sellPrice,
    quantity,
    lowQuantity,
    publish_app,
    publish_website,
  } = row;

  const confirm = useBoolean();

  // console.log('row: ', row);

  return (
    <>
      <TableRow hover selected={selected}>
        {/* TODO: 
            onViewRow();
         */}
        {/* <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell> */}

        {/* ========== IMAGE & NAME ========== */}
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            alt={localizedName}
            src={images[0]}
            variant="rounded"
            sx={{ width: 64, height: 64, mr: 2 }}
          />

          <ListItemText
            disableTypography
            primary={
              <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                {localizedName}
              </Link>
            }
            secondary={
              <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                {genre}
              </Box>
            }
          />
        </TableCell>

        {/* ========== PRICE ========== */}
        {/* TODO: currency */}
        <TableCell>{fNumber(sellPrice)} KWD</TableCell>

        {/* ========== QUANTITY ========== */}
        <TableCell>
          {fNumber(quantity)}{' '}
          {quantity <= lowQuantity ||
            (true && (
              <Chip
                label={t('products.low')} //TODO:
                size="small"
                sx={{ py: 0 }}
                color={'error'}
              />
            ))}
        </TableCell>

        {/* ========== SORTING ========== */}
        <TableCell>{sort}</TableCell>

        {/* ========== PUBLISH (WEB) ========== */}
        <TableCell>
          <Switch size="medium" value={publish_website} />
        </TableCell>

        {/* ========== PUBLISH (MOBILE) ========== */}
        <TableCell>
          <Switch size="medium" value={publish_app} />
        </TableCell>

        {/* ========== ACTIONS ========== */}
        <TableCell>
          <Stack direction="row">
            {/* {allowAction.remove && ( */}
            <Tooltip title={t('brand.delete_btn')}>
              <IconButton
                onClick={() => {
                  confirm.onTrue();
                  // setRemoveData(brand?._id);
                  // confirm.onTrue();
                }}
              >
                <Iconify color="text.secondary" icon="lucide:trash-2" width={25} />
              </IconButton>
            </Tooltip>
            {/* )} */}
            {/* {allowAction.edit && ( */}
            <Tooltip title={t('brand.edit')}>
              <IconButton
                onClick={() => {
                  onEditRow();
                }}
              >
                <Iconify color="text.secondary" icon="lucide:edit" width={25} />
              </IconButton>
            </Tooltip>
            {/* )} */}
          </Stack>
        </TableCell>
      </TableRow>

      {/* <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            onViewRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover> */}

      {/* ========== DELETE DIALOG ========== */}
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
}
