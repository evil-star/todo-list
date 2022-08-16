import { styled, Checkbox as MuiCheckbox } from '@mui/material';

const Checkbox = styled(MuiCheckbox)(({ theme }) => ({
  color: '#cecece',
  borderRadius: '5px',
  padding: 0,
  '&.Mui-checked': {
    color: '#fff',
  },
}));

export default Checkbox;
