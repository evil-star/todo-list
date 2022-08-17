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
import { formatGroupedTodosDates, groupTodosByDate } from '../utils/todos';
import { taskColors } from '../constants/tasks';
import { useQuery } from 'react-query';
import { getNews } from '../services/newsApi';

const Todos = () => {
  // Fetch news
  const { data: fetchedNews } = useQuery('news', getNews);

  // Todos
  const [{ list, settings }, dispatch] = useTodos();
  const groupedTodos = groupTodosByDate(list);
  const formatedTodosGroup = formatGroupedTodosDates(groupedTodos);
  const displayTodos = settings.showTodayTasks
    ? formatedTodosGroup.filter((group) => group.date === 'Today')
    : formatedTodosGroup;

  // States
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [isAddTodoActive, setIsAddTodoActive] = useState(false);

  // Add task
  const handleAddTask = (values) =>
    dispatch({ type: 'ADD_TODO', payload: values });

  // Change todo
  const handleChangeTodo = (updatedTodo) => {
    dispatch({ type: 'UPDATE_TODO', payload: updatedTodo });
  };

  // Settings change
  const handleSettingsChange = (settings) =>
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });

  return (
    <>
      <Container maxWidth='md' sx={{ pt: '13px', pb: '50px' }}>
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
              control={
                <Checkbox
                  checked={settings.showTodayTasks}
                  sx={{ mr: '10px' }}
                  onChange={(e) =>
                    handleSettingsChange({
                      showTodayTasks: e.currentTarget.checked,
                    })
                  }
                />
              }
              sx={{ m: 0, p: 0 }}
            />
          </Grid>
        </Grid>
        {/* Tasks list */}
        <Stack spacing={'32px'}>
          {!!displayTodos.length ? (
            displayTodos.map((group) => (
              <TasksGroup
                title={settings.showTodayTasks ? '' : `${group.date} Tasks`}
                key={group.date}
              >
                {group.todos.map((todo, index) => (
                  <Task
                    title={todo.title}
                    text={todo.text}
                    isCompleted={todo.isCompleted}
                    key={todo.id}
                    onCompleteChange={(isCompleted) =>
                      handleChangeTodo({ ...todo, isCompleted })
                    }
                    lineColor={taskColors[index % taskColors.length]}
                  />
                ))}
              </TasksGroup>
            ))
          ) : (
            <Typography variant='h6' sx={{ fontWeight: '600' }}>
              No todos found
            </Typography>
          )}
        </Stack>
      </Container>
      {/* Adding todo */}
      <AddTaskDialog
        onSubmit={handleAddTask}
        onClose={() => setIsAddTodoActive(false)}
        isActive={isAddTodoActive}
      />
      {/* Settings */}
      <SettingsDialog
        onSubmit={handleSettingsChange}
        onClose={() => setIsSettingsActive(false)}
        isActive={isSettingsActive}
        initialValues={settings}
      />
      {/* Running line */}
      {settings.showNewsTicker && !!fetchedNews?.articles.length && (
        <RunningLine>{fetchedNews.articles[0].description}</RunningLine>
      )}
    </>
  );
};

export default Todos;
