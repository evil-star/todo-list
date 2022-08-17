import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography,
} from '@mui/material';
import Switch from '../../ui/Switch/Switch';
import { useFormik } from 'formik';

const SettingsDialog = ({
  onSubmit = () => {},
  onClose = () => {},
  isActive,
  initialValues,
}) => {
  const formik = useFormik({
    initialValues: initialValues || {
      showNewsTicker: true,
    },
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
      formik.resetForm();
    },
    enableReinitialize: true,
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  }

  return (
    <Dialog
      open={isActive}
      onClose={handleClose}
      fullWidth
      PaperProps={{
        sx: { background: '#282828', color: '#F4F4F4', maxWidth: '400px' },
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <Grid container alignItems='center' justifyContent='space-between'>
            <Grid item xs={6}>
              <Typography>Show news ticker</Typography>
            </Grid>
            <Grid item>
              <Switch
                isChecked={formik.values.showNewsTicker}
                onChange={(value) =>
                  formik.setFieldValue('showNewsTicker', value)
                }
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type='submit'>Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SettingsDialog;
