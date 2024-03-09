import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const initialTodoLists = JSON.parse(localStorage.getItem('lists')) || [
    {
      title: 'Task 1',
      description: 'Description 1',
      dueDate: '2024-03-31',
      priority: 'P1',
    },
    {
      title: 'Task 2',
      description: 'Description 2',
      dueDate: '2024-04-15',
      priority: 'P3',
    },
    {
      title: 'Task 3',
      description: 'Description 3',
      dueDate: '2024-04-15',
      priority: 'P2',
    },
  ];

  const [lists, setLists] = useState(initialTodoLists);

  useEffect(() => {
    // set the todo list items in localstorage
    localStorage.setItem('lists', JSON.stringify(lists));
  }, [lists]);

  return (
    <TodoContext.Provider value={{ lists, setLists }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
