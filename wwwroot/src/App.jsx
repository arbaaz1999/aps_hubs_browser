import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Viewer from './components/Viewer';
import { authService } from './services/authService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [viewer, setViewer] = useState(null);
  const [selectedModelUrn, setSelectedModelUrn] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      setIsLoading(true);
      const userProfile = await authService.getProfile();
      setUser(userProfile?.data);
    } catch (error) {
      console.log('User not authenticated');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    window.location.replace('/api/auth/login');
  };

  const handleLogout = () => {
    const iframe = document.createElement('iframe');
    iframe.style.visibility = 'hidden';
    iframe.src = 'https://accounts.autodesk.com/Authentication/LogOut';
    document.body.appendChild(iframe);
    iframe.onload = () => {
      window.location.replace('/api/auth/logout');
      document.body.removeChild(iframe);
    };
  };

  const handleVersionSelect = (versionId) => {
    const urn = window.btoa(versionId).replace(/=/g, '');
    setSelectedModelUrn(urn);
  };

  const handleViewerInit = (viewerInstance) => {
    setViewer(viewerInstance);
  };

  if (isLoading) {
    return <div className="loading">Initializing application...</div>;
  }

  return (
    <div className="app">
      <Header
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      {user ? (
        <>
          <Sidebar onVersionSelect={handleVersionSelect} />
          <Viewer
            modelUrn={selectedModelUrn}
            onViewerInit={handleViewerInit}
          />
        </>
      ) : (
        <div className="login-prompt">
          <p>Please login to access the Hubs Browser</p>
        </div>
      )}
    </div>
  );
}

export default App;