import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAuth = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const setAuthorized = (username, filename) => {
    setAuth({
      status: 'authorized',
      initial: false,
      username,
      filename,
    });
  };

  const setFetching = () => {
    setAuth({
      status: 'fetching',
      initial: false,
      username: '',
      filename: '',
    });
  };

  const setUnauthorized = () => {
    setAuth({
      status: 'unauthorized',
      initial: false,
      username: '',
      filename: '',
    });
  };

  const signOut = () => {
    setAuth({
      status: 'unauthorized',
      initial: false,
      username: '',
      filename: '',
    });
  };

  return {
    auth,
    setFetching,
    setAuthorized,
    setUnauthorized,
    getAuthorized: () => (auth.status === 'authorized'),
    getFetching: () => (auth.status === 'fetching'),
    getUnauthorized: () => (auth.status === 'unauthorized'),
    signOut,
  };
};

export default useAuth;
