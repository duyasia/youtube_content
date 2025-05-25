import React from 'react';
import Dashboard from './Dashboard';
import PasswordProtection from './components/PasswordProtection';

function App() {
  return (
    <PasswordProtection>
      <Dashboard />
    </PasswordProtection>
  );
}

export default App;