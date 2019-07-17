import React from 'react';
import Model from '../../Components/UI/Modal/Modal';
import useHttpErrorHandler from '../../Hooks/httpErrorHandler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <React.Fragment>
        <Model show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Model>
        <WrappedComponent {...props} />
      </React.Fragment>
    );
  };
};

export default withErrorHandler;
