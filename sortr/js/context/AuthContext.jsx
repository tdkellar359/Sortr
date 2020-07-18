import React, { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

const AuthContext = createContext([{}, () => {}]);

const AuthContextProvider = ({ children }) => {
  const [state, setState] = useState({
    status: 'fetching',
    initial: true,
    username: '',
    filename: '',
  });

  console.log('[AuthContext.jsx]: Render with state:', state);
  return (
    <AuthContext.Provider value={[state, setState]}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider, AuthContext };
