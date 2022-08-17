import React from 'react';
import { TextField } from '@mui/material';
import styled from '@emotion/styled';

const Input = styled(TextField)({
  '& input': {
    color: '#F4F4F4',
  },
  '& label': {
    color: '#F4F4F4',
  },
  '& .MuiInputBase-root:before': {
    borderColor: '#F4F4F4',
  },
  '& .MuiInputBase-root:hover:not(.Mui-disabled):before': {
    borderColor: '#F4F4F4',
  },
  '& .MuiSvgIcon-root': {
    fill: '#fff',
  },
});

export default Input;
