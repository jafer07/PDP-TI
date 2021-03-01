import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { configureStore } from './redux/store';


import Web3 from 'web3';
import Web3Provider from 'react-web3-provider';
import Portis from '@portis/web3';
import reportWebVitals from './reportWebVitals';
import IExecProvider from './provider/IExecProvider';

const App = React.lazy(() => import(/* webpackChunkName: "App" */'./App' ));

ReactDOM.render(
  <Provider store={configureStore()}>
      <Web3Provider
        defaultProvider={(cb) => {
             const ethProvider = new Portis("90c7b0fc-d9d2-4879-b67b-53f3fb651609", "goerli").provider;
             ethProvider.isMetaMask = true;
             return cb(new Web3(ethProvider));
        }}
        loading="Loading..."
        error={(err) => `Connection error: ${err.message}`}
    >
        <IExecProvider>
        <Suspense fallback={<div className="loading" />}>
          <App />
        </Suspense>
      </IExecProvider>
    </Web3Provider>
  </Provider>,
  document.getElementById('root')
);
/*
 * If you want your app to work offline and load faster, you can change
 * unregister() to register() below. Note this comes with some pitfalls.
 * Learn more about service workers: https://bit.ly/CRA-PWA
 */
reportWebVitals();
serviceWorker.unregister();
