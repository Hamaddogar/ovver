import React from 'react';
import Box from '@mui/material/Box';
import Image from 'next/image';
import RotateRightImage from '../../../public/assets/auth/rotate-right-solid.png';
import FaceImage from '../../../public/assets/auth/Face.png';
import MuteImage from '../../../public/assets/auth/mute.png';
import VoiceImage from '../../../public/assets/auth/Voice.png';
import Avatar from '@mui/material/Avatar';

const ImagesSection = () => {
  return (
    <Box sx={{
      marginTop: '46px',
      marginBottom: '42px',
      gap: '28px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Avatar sx={{ bgcolor: '#F5F5F8' }}>
          <Image draggable={false} src={RotateRightImage} alt={''} />
        </Avatar>
        <Image draggable={false} src={FaceImage} alt={''} />
        <Avatar sx={{ bgcolor: '#F5F5F8' }}>
          <Image draggable={false} src={MuteImage} alt={''} />
        </Avatar>

      </Box>
      <Image draggable={false} src={VoiceImage} alt={''} />
    </Box>
  );
};

export default ImagesSection;
