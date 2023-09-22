// App.jsx

import React from 'react';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          {/* All other components that you want to render */}
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
