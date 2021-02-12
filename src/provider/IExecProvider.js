import React from 'react';
import { IExec } from "iexec";
import hoistNonReactStatics from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import { withWeb3 } from 'react-web3-provider';

const IExecContext = React.createContext(null);

class IExecProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iexec: null,
    };
  }

  componentDidMount() {
    this.setState({
      iexec: new IExec({
        ethProvider: this.props.web3.currentProvider,
        chainId: 5
      })
    })
  }

  render() {
    if (this.state.iexec === null) {
      return "Initializing...";
    }

    return (
      <IExecContext.Provider
        value={{
          iexec: this.state.iexec,
          web3: this.props.web3,
          web3State: this.props.web3State,
        }}
      >
        {this.props.children}
      </IExecContext.Provider>
    )
  }
}

IExecProvider.propTypes = {
  children: PropTypes.node.isRequired,
  web3: PropTypes.any.isRequired,
};

export default withWeb3(IExecProvider);

export const withIexec = (WrappedComponent) => {
  class IExecConsumer extends React.Component { // eslint-disable-line
    render() {
      return (
        <IExecContext.Consumer>
          {(context) => (
            <WrappedComponent
              {...this.props}
              iexec={context.iexec}
              web3={context.web3}
              web3State={context.web3State}
            />
          )}
        </IExecContext.Consumer>
      );
    }
  }

  if (WrappedComponent.defaultProps) {
    IExecConsumer.defaultProps = { ...WrappedComponent.defaultProps };
  }

  return hoistNonReactStatics(IExecConsumer, WrappedComponent);
};
