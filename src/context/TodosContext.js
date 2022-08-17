import { createContext, useContext, useEffect, useReducer } from 'react';

const TodosContext = createContext();

const initialState = JSON.parse(localStorage.getItem('todos')) || {
  list: [],
  settings: {
    showTodayTasks: false,
    showNewsTicker: false,
  },
};

// Reducer
const todosReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD_TODO': {
      return { ...state, list: [...state.list, payload] };
    }
    case 'REMOVE_TODO': {
      return {
        ...state,
        list: state.list.filter((item) => item.id !== payload.id),
      };
    }
    case 'UPDATE_TODO': {
      return {
        ...state,
        list: state.list.map((item) =>
          item.id === payload.id ? payload : item
        ),
      };
    }
    case 'UPDATE_SETTINGS': {
      return {
        ...state,
        settings: {
          ...state.settings,
          ...payload,
        },
      };
    }
    default: {
      return state;
    }
  }
};

// Provider
export const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todosReducer, initialState);

  useEffect(
    () => localStorage.setItem('todos', JSON.stringify(state)),
    [state]
  );

  const value = [state, dispatch];
  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

// useTodos
export const useTodos = () => {
  const context = useContext(TodosContext);

  return context;
};
