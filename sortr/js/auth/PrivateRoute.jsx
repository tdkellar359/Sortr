import React from 'react';
import { PropTypes } from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import { useAuth } from './auth';

function PrivateRoute({ children, path }) {
  const { authenticating, authenticated } = useAuth();

  if (authenticating) {
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
        authenticated
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
