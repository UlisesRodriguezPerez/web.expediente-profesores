// App.jsx

import React from 'react';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext/NotificationContext';
import { DataProvider } from './contexts/DataContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
      <DataProvider>
        <Router>
          {/* All other components that you want to render */}
        </Router>
      </DataProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
