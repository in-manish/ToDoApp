import React from 'react';

const Header = ({ onLogout }) => {
  return (
    <div className="header">
      <h1>Todo AI</h1>
      <button onClick={onLogout}>Sign Out</button>
    </div>
  );
};

export default Header; 