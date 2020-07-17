import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import useAuth from '../context/useAuth';

function PrivateRoute({ children, path }) {
  const { auth } = useAuth();

  if (auth.uthenticating) {
    return (
      <div className="mt-5 text-center">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  return (
    <Route
      path={path}
      render={() => (
        auth.authenticated
          ? children
          : <Redirect to="/login" />
      )}
    />
  );
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
  path: PropTypes.string.isRequired,
};

export default PrivateRoute;
