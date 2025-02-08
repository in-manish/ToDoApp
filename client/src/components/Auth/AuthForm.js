import React from 'react';
import LandingContent from './LandingContent';

const AuthForm = ({ isLogin, setIsLogin, onSubmit, formData, setFormData, error }) => {
  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="auth-container">
      <LandingContent />
      <div className="auth-form-container">
        <div className="auth-form-box">
          <h2>{isLogin ? 'Welcome Back!' : 'Create Account'}</h2>
          <p className="auth-subtitle">
            {isLogin 
              ? 'Enter your credentials to access your account' 
              : 'Start managing your tasks effectively'}
          </p>
          {error && <p className="error">{error}</p>}
          <form onSubmit={onSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={handleChange}
                  required
                />
                <i className="fas fa-user input-icon"></i>
              </div>
            )}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={email}
                onChange={handleChange}
                required
              />
              <i className="fas fa-envelope input-icon"></i>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
                required
              />
              <i className="fas fa-lock input-icon"></i>
            </div>
            <button type="submit" className="auth-button">
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>
          <button 
            className="switch-auth" 
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin 
              ? "Don't have an account? Sign Up" 
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthForm; 