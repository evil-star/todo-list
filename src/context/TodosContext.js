import { createContext, useContext, useReducer } from 'react';

const TodosContext = createContext();

const initialState = {
  list: [],
};

// Reducer
const todosReducer = (state, { type, payload }) => {
  switch (type) {
    case 'ADD': {
      return { ...state, list: [...state.list, payload] };
    }
    case 'REMOVE': {
      return {
        ...state,
        list: state.list.filter((item) => item.id !== payload.id),
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
