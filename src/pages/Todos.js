import {
  Grid,
  Container,
  FormControlLabel,
  Typography,
  Stack,
} from '@mui/material';
import React, { useState } from 'react';

import Checkbox from '../common/ui/Checkbox/Checkbox';
import TasksGroup from '../common/components/TasksGroup/TasksGroup';
import Task from '../common/components/Task/Task';
import { useTodos } from '../context/TodosContext';
import TodosHeader from '../common/components/TodosHeader/TodosHeader';
import AddTaskDialog from '../common/components/AddTaskDialog/AddTaskDialog';
import SettingsDialog from '../common/components/SettingsDialog/SettingsDialog';
import RunningLine from '../common/components/RunningLine/RunningLine';

const Todos = () => {
  // Todos
  const [{ list }, dispatch] = useTodos();

  // States
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isAddTodoActive, setIsAddTodoActive] = useState(false);

  return (
    <>
      <Container maxWidth='md'>
        <TodosHeader
          onAddClick={() => setIsAddTodoActive(true)}
          onSettingsClick={() => setIsSettingsActive(true)}
        />
        {/* Checkbox todays tasks */}
        <Grid container>
          <Grid item xs={12} sx={{ mb: '15px' }}>
            <FormControlLabel
              label={
                <Typography sx={{ fontWeight: '600' }}>Today Tasks:</Typography>
              }
              control={<Checkbox sx={{ mr: '10px' }} />}
              sx={{ m: 0, p: 0 }}
            />
          </Grid>
        </Grid>
        {/* Tasks list */}
        <Stack spacing={'32px'}>
          <TasksGroup title='123'>
            <Task title='123' text='123' isCompleted={true} />
          </TasksGroup>
        </Stack>
      </Container>
      {/* Adding todo */}
      <AddTaskDialog
        onSubmit={(values) => console.log(values)}
        onClose={() => setIsAddTodoActive(false)}
        isActive={isAddTodoActive}
      />
      {/* Settings */}
      <SettingsDialog
        onSubmit={(values) => console.log(values)}
        onClose={() => setIsSettingsActive(false)}
        isActive={isSettingsActive}
      />
      {/* Running line */}
      <RunningLine>text text texttext text texttext text texttext text texttext text texttext text text</RunningLine>
    </>
  );
};

export default Todos;
