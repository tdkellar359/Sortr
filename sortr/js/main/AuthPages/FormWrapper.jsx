import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import useAuth from '../../context/useAuth';

const FormWrapper = ({ children }) => {
  const formStyle = {
    width: '50vw',
    margin: '8vh auto 0 auto',
    border: 'solid lightgrey 1px',
    borderRadius: '5px',
    padding: '30px',
  };

  const { getAuthorized } = useAuth();

  if (getAuthorized()) {
    return (
      <Redirect to="/browse" />
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <div style={formStyle}>
        { children }
      </div>
    </div>
  );
};

FormWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FormWrapper;
