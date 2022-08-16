import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
} from '@mui/material';
import Input from '../../ui/Input/Input';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddTaskDialog = ({
  onSubmit = () => {},
  onClose = () => {},
  initialValues,
  isActive,
}) => {
  const formik = useFormik({
    initialValues: initialValues || {
      title: '',
      text: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Required'),
      text: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      onSubmit(values);
      onClose();
      formik.resetForm();
    },
  });

  return (
    <Dialog
      open={isActive}
      onClose={onClose}
      fullWidth
      PaperProps={{ sx: { background: '#282828', color: '#F4F4F4' } }}
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>Add to do</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <Input
              autoFocus
              margin='dense'
              variant='standard'
              label='Title'
              fullWidth
              name='title'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              error={formik.touched.title && !!formik.errors.title}
              helperText={formik.touched.title && formik.errors.title}
            />
            <Input
              margin='dense'
              variant='standard'
              label='To do text'
              fullWidth
              name='text'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              error={formik.touched.text && !!formik.errors.text}
              helperText={formik.touched.text && formik.errors.text}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type='submit'>Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTaskDialog;
