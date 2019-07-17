import React, {useState, useEffect} from 'react';
import Model from '../../Components/UI/Model/Model';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    const requestInterceptor = axios.interceptors.request.use(request => {
      setError(null);
      return request;
    });

    const responseInterceptor = axios.interceptors.response.use(
      response => response,
      error => setError(this.error)
    );

    useEffect(() => {
      axios.interceptors.request.eject(requestInterceptor);
      axios.interceptors.response.eject(responseInterceptor);
    }, [requestInterceptor, responseInterceptor]);

    const confirmError = () => {
      setError(null);
    }

    return (
      <React.Fragment>
        <Model show={error} modalClosed={confirmError}>
          {error ? error.message : null}
        </Model>
        <WrappedComponent {...props}/>
      </React.Fragment>
    );
  }
}

export default withErrorHandler;