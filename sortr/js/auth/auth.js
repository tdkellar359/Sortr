import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  authenticated: false,
  username: '',
  filename: ''
});

export function useAuth() {
  return useContext(AuthContext);
}