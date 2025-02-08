import React from 'react';

const LandingContent = () => {
  return (
    <div className="landing-content">
      <h1>Welcome to Todo AI</h1>
      <div className="features">
        <div className="feature-item">
          <i className="fas fa-check-circle"></i>
          <h3>Stay Organized</h3>
          <p>Keep track of your tasks efficiently with our intuitive todo list</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-sync"></i>
          <h3>Real-time Updates</h3>
          <p>Your todos are synchronized instantly across all your devices</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-lock"></i>
          <h3>Secure</h3>
          <p>Your data is protected with secure authentication and storage</p>
        </div>
      </div>
    </div>
  );
};

export default LandingContent; 