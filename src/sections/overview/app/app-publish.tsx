// Redx
import { useSelector } from 'react-redux';
import { selectCurrentBuilder } from 'src/redux/store/thunks/builder';
// @mui
import Typography from '@mui/material/Typography';
import Stack, { StackProps } from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
// theme
import { Paper, useTheme } from '@mui/material';
import Link from 'next/link';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import generateQR from 'src/utils/generateQR';
import Image from 'next/image';
import { paths } from 'src/routes/paths';
import Iconify from 'src/components/iconify/iconify';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  title?: string;
  description?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
  elevation: number;
}

export default function AppPublish({
  title,
  description,
  action,
  img,
  elevation = 7,
  ...other
}: Props) {
  // ################### REDUX HOOKS ###################
  const { logo, previewDomain } = useSelector(selectCurrentBuilder) ?? {};

  // ################### REACT HOOKS ###################
  const [open, setOpen] = useState(false);
  const [imgSrc, setImgSrc] = useState('');

  // ################### HANDLER ###################
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // ################### STYLING ###################
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: '1rem',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '&:focus': {
      outline: 'none',
    },
  };

  // ################### SIDE EFFECT ###################
  useEffect(() => {
    generateQR(`https://www.${previewDomain ?? ''}`).then((src: string) => setImgSrc(src));
  }, [previewDomain]);

  return (
    <>
      <Paper
        sx={{
          boxShadow: '0px 0px 20px #00000014',
        }}
      >
        <Box sx={{ p: '30px' }}>
          <Stack
            justifyContent="space-between"
            alignItems="center"
            flexDirection={{ xs: 'column', md: 'row' }}
            spacing={{ xs: '30px', md: '10px' }}
            sx={{
              height: { md: 1 },
              borderRadius: 2,
              position: 'relative',
            }}
            {...other}
          >
            <Stack
              direction="row"
              component="span"
              justifyContent="center"
              alignItems="center"
              spacing="24px"
              sx={{
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <Avatar
                variant="rounded"
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'background.neutral',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={logo ? logo : '/raw/WebsitesC.svg'}
                  sx={{ width: '100%', height: '100%' }}
                />
              </Avatar>
              <Stack
                flexGrow={1}
                justifyContent="center"
                alignItems={{ xs: 'center', md: 'flex-start' }}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Typography variant="h4" sx={{ whiteSpace: 'pre-line' }}>
                  {title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    maxWidth: 360,
                  }}
                >
                  {description}
                </Typography>

                {action && action}
              </Stack>
            </Stack>
            <Stack
              direction="row"
              spacing="20px"
              justifyContent="center"
              sx={{ cursor: 'pointer' }}
              onClick={handleOpen}
            >
              <Stack component="span" justifyContent="center">
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 50,
                    height: 50,
                    bgcolor: 'background.neutral',
                    borderRadius: 50,
                    color: 'main',
                  }}
                >
                  <Iconify
                    icon="majesticons:qr-code-line"
                    width="30px"
                    height="30px"
                    borderRadius="50%"
                  />
                </Avatar>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.8,
                    textTransform: 'capitalize',
                  }}
                >
                  QR Code
                </Typography>
              </Stack>

              {[
                {
                  id: 1,
                  title: 'Settings',
                  img: 'ic:baseline-settings',
                  path: paths.dashboard.accountsettings.root,
                },
                {
                  id: 2,
                  title: 'Preview',
                  img: 'ph:eye-bold',
                  path: `https://www.${previewDomain ?? ''}`,
                },
              ].map((item, indx) => (
                <Link
                  href={item.path}
                  key={item.id}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <Stack key={indx} component="span" justifyContent="center">
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 50,
                        height: 50,
                        bgcolor: 'background.neutral',
                        borderRadius: 50,
                        color: 'main',
                      }}
                    >
                      <Iconify icon={item.img} width="30px" height="30px" borderRadius="50%" />
                    </Avatar>
                    <Typography
                      variant="body2"
                      sx={{
                        opacity: 0.8,
                        textTransform: 'capitalize',
                      }}
                    >
                      {item.title}
                    </Typography>
                  </Stack>
                </Link>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Paper>

      {/* ========================== QR Modal ========================== */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Box component="img" src={imgSrc} /> */}
          <Image
            width={200}
            height={200}
            src={imgSrc}
            alt="QR-Website-URL"
            // className="w-20 h-20 rounded-full object-cover"
          />
        </Box>
      </Modal>
    </>
  );
}
