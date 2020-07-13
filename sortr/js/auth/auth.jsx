import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  authenticating: false,
  authenticated: false,
  username: '',
  filename: '',
});

export function useAuth() {
  return useContext(AuthContext);
}
