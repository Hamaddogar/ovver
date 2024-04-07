// @mui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Tooltip } from '@mui/material';

//
import { ConfirmDialogProps } from './types';
import Iconify from '../iconify/iconify';
import { t } from 'i18next';

// ----------------------------------------------------------------------

export default function ConfirmDialog({
  title,
  content,
  action,
  open,
  onClose,
  maxWidth = 'xs',
  noCancel = true,
  ...other
}: ConfirmDialogProps) {
  return (
    <Dialog fullWidth maxWidth={maxWidth} open={open} onClose={onClose} {...other} sx={{
      '& .MuiPaper-root': {
        overflowY: 'visible !important'
      }
    }}>
      <Box position='relative'>
        <Box sx={{
          boxShadow: "0px 4px 20px #0F134933",
          height: '40px',
          width: '40px',
          borderRadius: '24px',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          right: '0px',
          top: '-20px',
          cursor: 'pointer',
          color:"black"
        }} onClick={onClose} ><Iconify icon="ic:baseline-clear" /></Box>
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      {...other}
      sx={{
        '& .MuiPaper-root': {
          overflowY: 'visible !important',
        },
      }}
    >
      <Box position="relative">
        <Box
          sx={{
            boxShadow: '0px 4px 20px #0F134933',
            height: '40px',
            width: '40px',
            borderRadius: '24px',
            bgcolor: 'background.paper',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: '0px',
            top: '-20px',
            cursor: 'pointer',
          }}
          onClick={onClose}
        >
          <Tooltip title={t('common.close')}>
            <Iconify icon="ic:baseline-clear" />
          </Tooltip>
        </Box>
      </Box>
      <DialogTitle sx={{ pb: 2, textTransform: 'capitalize' }}>{title}</DialogTitle>

      {content && (
        <DialogContent
          sx={{ typography: 'body2', '&::first-letter': { textTransform: 'capitalize' } }}
        >
          {content}
        </DialogContent>
      )}

      <DialogActions sx={{ textTransform: 'capitalize' }}>
        {action}

        {noCancel && (
          <Button variant="outlined" color="inherit" onClick={onClose}>
            {t('common.cancel')}
          </Button>
        )}
      </DialogActions>
    </Dialog>
    </Box>
    </Dialog>
  );
}
