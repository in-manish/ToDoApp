import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import AuthForm from './components/Auth/AuthForm';
import TodoList from './components/Todo/TodoList';
import TodoForm from './components/Todo/TodoForm';
import { todoApi, authApi, setAuthToken } from './services/api';
import './App.css';
import './components/Auth/Auth.css';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [todos, setTodos] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [error, setError] = useState('');

  useEffect(() => {
    if (token) {
      setAuthToken(token);
      fetchTodos();
    }
  }, [token]);

  const fetchTodos = async () => {
    try {
      const response = await todoApi.getAll();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await authApi.login({ email: formData.email, password: formData.password })
        : await authApi.signup(formData);
      
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      setError('');
      setFormData({ name: '', email: '', password: '' });
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setTodos([]);
    setAuthToken(null);
  };

  const handleAddTodo = async (text) => {
    try {
      await todoApi.create(text);
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleToggleTodo = async (id) => {
    try {
      const todo = todos.find((t) => t._id === id);
      await todoApi.update(id, { completed: !todo.completed });
      fetchTodos();
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await todoApi.delete(id);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  if (!token) {
    return (
      <AuthForm
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        onSubmit={handleAuth}
        formData={formData}
        setFormData={setFormData}
        error={error}
      />
    );
  }

  return (
    <div className="App">
      <Header onLogout={handleLogout} />
      <TodoForm onAdd={handleAddTodo} />
      <TodoList
        todos={todos}
        onToggle={handleToggleTodo}
        onDelete={handleDeleteTodo}
      />
    </div>
  );
}

export default App; 