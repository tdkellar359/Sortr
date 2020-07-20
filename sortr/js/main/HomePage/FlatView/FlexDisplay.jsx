import React from 'react';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/spinner';

const FlexDisplay = ({
  children,
  numChildren,
  fetching,
  error,
}) => {
  const flexBox = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginBottom: '16px',
  };

  let elt;
  if (fetching && !error) {
    elt = <LoadingAnimation />;
  } else if (!fetching && !error) {
    elt = (
      <div style={flexBox}>
        { numChildren > 0
          ? children
          : <p className="text-muted">Nothing to see here!</p> }
      </div>
    );
  } else {
    elt = (
      <>
        <p className="text-muted">Uh oh! Something went wrong...</p>
      </>
    );
  }

  return (
    <div style={flexBox}>
      { elt }
    </div>
  );
};

FlexDisplay.propTypes = {
  children: PropTypes.node.isRequired,
  numChildren: PropTypes.number.isRequired,
  fetching: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
};

const LoadingAnimation = () => (
  <div className="mt-0">
    <Spinner animation="border" variant="primary" />
  </div>
);

export default FlexDisplay;
