import { useContext } from 'react';
import { AuthContext } from './AuthContext';

const useAuth = () => {
  const [auth, setAuth] = useContext(AuthContext);

  const authenticationSuccess = (username, filename) => {
    setAuth({
      authenticating: false,
      finished: true,
      authenticated: true,
      username,
      filename,
    });
  };

  /**
   * TODO
   * Something is sketchy here...
   * The AuthContext is getting set to authenticated,
   * but authenticationEnd is overwritting that value for
   * some reason
   */
  const authenticationEnd = () => {
    console.log(auth);
    setAuth({
      ...auth,
      authenticating: false,
      finished: true,
    });
  };

  const signOut = () => {
    setAuth({
      authenticated: false,
      authenticating: false,
      finished: false,
      username: '',
      filename: '',
    });
  };

  return {
    auth,
    authenticationSuccess,
    authenticationEnd,
    signOut,
  };
};

export default useAuth;
