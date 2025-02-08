import React, { useState } from 'react';
import Modal from '../common/Modal';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    onDelete(todo._id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo._id)}
        />
        <span>{todo.text}</span>
        <button onClick={handleDeleteClick}>
          <i className="fas fa-trash-alt"></i> Delete
        </button>
      </div>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
      />
    </>
  );
};

export default TodoItem; 