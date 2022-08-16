import React from 'react';
import { Grid, Box } from '@mui/material';
import LogoImg from '../../../assets/images/logo.svg';
import GearImg from '../../../assets/images/icons/gear.svg';
import PlusImg from '../../../assets/images/icons/plus.svg';

const TodosHeader = ({ onAddClick = () => {}, onSettingsClick = () => {} }) => {
  return (
    <Grid container sx={{ pt: '13px', pb: '13px' }}>
      <Grid item>
        <Box component='img' src={LogoImg} alt='to do' display='block' />
      </Grid>
      <Grid item ml='auto'>
        <Box
          component='img'
          src={PlusImg}
          alt='add'
          display='block'
          sx={{
            mr: '16px',
            width: '29px',
            height: '29px',
            cursor: 'pointer',
          }}
          onClick={onAddClick}
        />
      </Grid>
      <Grid item>
        <Box
          component='img'
          src={GearImg}
          alt='settings'
          display='block'
          sx={{ cursor: 'pointer' }}
          onClick={onSettingsClick}
        />
      </Grid>
    </Grid>
  );
};

export default TodosHeader;
