import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ModeContext = createContext();

// Context provider component
export const ModeProvider = ({ children }) => {
  // Initialize mode from localStorage or default to 'Vendor'
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('mode') || 'Vendor';
  });

  // Update localStorage whenever the mode changes
  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
};

// Custom hook for consuming the context
export const useMode = () => useContext(ModeContext);
