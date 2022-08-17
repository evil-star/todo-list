import { format } from 'date-fns';

export const groupTodosByDate = (todos) => {
  if (!todos) return null;

  const groupedTodos = todos.reduce((groupedTodos, todo) => {
    if (!groupedTodos[todo.date]) {
      groupedTodos[todo.date] = [];
    }
    groupedTodos[todo.date].push(todo);
    return groupedTodos;
  }, {});

  const groupArrays = Object.keys(groupedTodos).map((date) => {
    return {
      date,
      todos: groupedTodos[date],
    };
  });

  const sortedGroup = groupArrays.sort((a, b) => {
    return a.date - b.date;
  });

  return sortedGroup;
};

export const formatGroupedTodosDates = (groupedTodos) => {
  if (!groupedTodos) return [];

  const formatedTodos = groupedTodos.map((group) => {
    const groupDate = new Date();
    groupDate.setTime(group.date);
    const currentDate = new Date();
    let displayDate = format(groupDate, 'dd/MM');

    if (
      groupDate.getMonth() === currentDate.getMonth() &&
      groupDate.getFullYear() === currentDate.getFullYear()
    ) {
      if (groupDate.getDate() === currentDate.getDate()) displayDate = 'Today';
      if (groupDate.getDate() === currentDate.getDate() + 1)
        displayDate = 'Tomorrow';
    }

    return { ...group, date: displayDate };
  });

  return formatedTodos;
};
