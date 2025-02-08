import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onToggle, onDelete }) => {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>
          No tasks yet. Add a new task to get started!
        </p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
};

export default TodoList; 