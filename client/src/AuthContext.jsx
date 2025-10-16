import React, { createContext, useContext } from "react";

// Create a context object
export const AuthContext = createContext();

// Provider component
export function AuthProvider({ value, children }) {
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
