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
import uuidv4 from '../../../utils/uuidv4';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { sub } from 'date-fns';

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
      date: null,
      isCompleted: false,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Required'),
      text: Yup.string().required('Required'),
      date: Yup.date()
        .min(sub(new Date(), { days: 1 }), `Can't choose time in the past`)
        .required('Required')
        .typeError('Invalid date'),
    }),
    onSubmit: (values) => {
      values.date = values.date.getTime();
      values.id = uuidv4();
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
            <DesktopDatePicker
              label='Date'
              name='date'
              inputFormat='dd/MM/yyyy'
              value={formik.values.date}
              onChange={(value) => formik.setFieldValue('date', value)}
              renderInput={(params) => (
                <Input
                  {...params}
                  margin='dense'
                  variant='standard'
                  onBlur={formik.handleBlur}
                  name='date'
                  error={formik.touched.date && !!formik.errors.date}
                  helperText={formik.touched.date && formik.errors.date}
                />
              )}
              minDate={new Date()}
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
