import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../auth/auth';

const FormWrapper = (props) => {
  const formStyle = {
    width: '50vw',
    margin: '8vh auto 0 auto',
    border: 'solid lightgrey 1px',
    borderRadius: '5px',
    padding: '30px'
  };

  const isAuthenticated = useAuth().authenticated;

  if (isAuthenticated) {
    return (
      <Route
        render={({ location }) =>
          (
            <Redirect
              to={{
                pathname: "/home",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={formStyle}>
        {props.children}
      </div>
    </div>
  );
}

export default FormWrapper;