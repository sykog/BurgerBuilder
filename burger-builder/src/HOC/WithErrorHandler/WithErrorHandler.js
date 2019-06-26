import React, {Component} from 'react';
import Model from '../../Components/UI/Model/Model';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,

    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null});
        return request;
      });

      this.responseInterceptor = axios.interceptors.response.use(response => response,
error => {this.setState({error: error});
      });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    confirmError = () => {
      this.setState({error: null})
    }

    render() {
      return (
        <React.Fragment>
          <Model show={this.state.error} modalClosed={this.confirmError}>
            {this.state.error ? this.state.error.message : null}
          </Model>
          <WrappedComponent {...this.props}/>
        </React.Fragment>
      );
    }
  }
}

export default withErrorHandler;