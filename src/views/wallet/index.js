import { withIexec } from '../../provider/IExecProvider';
import AppLayout from '../../layout/AppLayout';
import React, { Suspense, useEffect, useState } from 'react';
import { utils } from "iexec";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';


const ViewDashboard = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './dashboard')
);
const ViewAccount = React.lazy(() =>
    import(/* webpackChunkName: "views" */ './account')
    );
const ViewOrder = React.lazy(() =>
    import(/* webpackChunkName: "views" */ './order')
);
const ViewDataSet = React.lazy(() =>
    import(/* webpackChunkName: "views" */ './dataset')
);

const ViewRequest = React.lazy(() =>
    import(/* webpackChunkName: "views" */ './request')
);

const ViewApps = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './apps')
);

const ViewDetails = React.lazy(() =>
  import(/* webpackChunkName: "views" */ './details')
);

function App(props) {
    const { web3, web3State, iexec, match } = props;
    const [ address, setAddress ] = useState("");
    const [ wallet, setWallet ] = useState("");
    const [ rlcWallet, setRLCWallet ] = useState("");
    const [ balance, setBalance ] = useState("");

    const [ loading, setLoading ] = useState(true);
    let [ amount, setAmount ] = useState("");

    const networkOutput = document.getElementById("network");
    const addressOutput = document.getElementById("address");
    const rlcWalletOutput = document.getElementById("rlc-wallet");
    const nativeWalletOutput = document.getElementById("native-wallet");
    const accountOutput = document.getElementById("account");

    const accountDepositInput = document.getElementById("account-deposit-input");
    const accountDepositButton = document.getElementById("account-deposit-button");
    const accountDepositError = document.getElementById("account-deposit-error");

    const accountWithdrawInput = document.getElementById("account-withdraw-input");
    const accountWithdrawButton = document.getElementById("account-withdraw-button");
    const accountWithdrawError = document.getElementById("account-withdraw-error");

    const datasetsShowInput = document.getElementById("datasets-address-input");
    const datasetsShowButton = document.getElementById("datasets-show-button");
    const datasetsShowError = document.getElementById("datasets-show-error");
    const datasetShowOutput = document.getElementById("datasets-details-output");
    const datasetsCountButton = document.getElementById("datasets-count-button");
    const datasetsCountError = document.getElementById("datasets-count-error");
    const datasetsCountOutput = document.getElementById("datasets-count-output");
    const datasetsIndexInput = document.getElementById("datasets-index-input");
    const datasetsShowIndexButton = document.getElementById("datasets-showindex-button");
    const datasetsShowIndexError = document.getElementById("datasets-showindex-error");
    const datasetsShowIndexOutput = document.getElementById("datasets-showindex-output");

    const datasetDeployedAddressInput = document.getElementById("dataset-deployed-address-input");
    const datasetDeployedKeystoreInput = document.getElementById("dataset-deployed-keystore-input");
    const datasetPushSecretButton = document.getElementById("dataset-push-secret-button");
    const datasetPushSecretError = document.getElementById("dataset-push-secret-error");
    const datasetPushSecretOutput = document.getElementById("dataset-push-secret-output");

    const datasetsDeployNameInput = document.getElementById("dataset-deploy-address-input");
    const datasetsDeployMultiaddrInput = document.getElementById("datasets-deploymultiaddr-input");
    const datasetsDeployButton = document.getElementById("datasets-deploy-button");
    const datasetsDeployError = document.getElementById("datasets-deploy-error");
    const datasetsDeployOutput = document.getElementById("datasets-deploy-output");

    const sellDatasetAddressInput = document.getElementById("sell-datasetaddress-input");
    const sellDatasetPriceInput = document.getElementById("sell-datasetprice-input");
    const sellDatasetVolumeInput = document.getElementById("sell-volume-input");
    const sellDatasetApprestrictInput = document.getElementById("sell-apprestrict-input");
    const sellPublishButton = document.getElementById("sell-publish-button");
    const sellPublishError = document.getElementById("sell-publish-error");
    const sellPublishOutput = document.getElementById("sell-publish-output");
    const sellUnpublishOrderhashInput = document.getElementById("sell-unpublishhash-input");
    const sellUnpublishButton = document.getElementById("sell-unpublish-button");
    const sellUnpublishError = document.getElementById("sell-unpublish-error");
    const sellUnpublishOutput = document.getElementById("sell-unpublish-output");
    const sellCancelOrderhashInput = document.getElementById("sell-cancelhash-input");
    const sellCancelButton = document.getElementById("sell-cancel-button");
    const sellCancelError = document.getElementById("sell-cancel-error");
    const sellCancelOutput = document.getElementById("sell-cancel-output");

    const orderbookDatasetAddressInput = document.getElementById("orderbook-datasetaddress-input");
    const orderbookShowButton = document.getElementById("orderbook-show-button");
    const orderbookShowError = document.getElementById("orderbook-show-error");
    const orderbookShowOutput = document.getElementById("orderbook-show-output");

//  Researcers
    const appsShowInput = document.getElementById("apps-address-input");
    const appsShowButton = document.getElementById("apps-show-button");
    const appsShowError = document.getElementById("apps-show-error");
    const appShowOutput = document.getElementById("apps-details-output");
    const appsCountButton = document.getElementById("apps-count-button");
    const appsCountError = document.getElementById("apps-count-error");
    const appsCountOutput = document.getElementById("apps-count-output");
    const appsIndexInput = document.getElementById("apps-index-input");
    const appsShowIndexButton = document.getElementById("apps-showindex-button");
    const appsShowIndexError = document.getElementById("apps-showindex-error");
    const appsShowIndexOutput = document.getElementById("apps-showindex-output");

    const appsDeployNameInput = document.getElementById("apps-deployname-input");
    const appsDeployMultiaddrInput = document.getElementById("apps-deploymultiaddr-input");
    const appsDeployChecksumInput = document.getElementById("apps-deploychecksum-input");
    const appsDeployButton = document.getElementById("apps-deploy-button");
    const appsDeployError = document.getElementById("apps-deploy-error");
    const appsDeployOutput = document.getElementById("apps-deploy-output");

    const appRunDatasetMultiaddrInput = document.getElementById("app-run-dataset-address-input");
    const appRunPriceInput = document.getElementById("app-run-price-input");
    const appRunButton = document.getElementById("app-run-button");
    const appRunError = document.getElementById("app-run-error");
    const appRunOutput = document.getElementById("app-run-output");

    useEffect(() => {
      async function fetchData() {
        setLoading(true);
        const addr = await iexec.wallet.getAddress();
        const wallet = await iexec.wallet.checkBalances(addr);
        const balance = await iexec.account.checkBalance(addr); //account

        const nativeWalletText = wallet.wei.isZero()
          ? '<a href="https://goerli-faucet.slock.it/" target="_blank">Need some goerli ether to continue?</a>'
          : `${utils.formatEth(wallet.wei)} ether`;

        const rlcWalletText = wallet.nRLC.isZero()
           ? `<a href="https://faucet.iex.ec/goerli/${addr}" target="_blank">Need some goerli RLC to continue?</a>`
           : `${utils.formatRLC(wallet.nRLC)} RLC`;

        const accountOutputText =  `${utils.formatRLC(balance.stake)} RLC (+ ${utils.formatRLC(balance.locked)} RLC locked)`;
        setAddress(addr);
        setWallet(nativeWalletText);
        setRLCWallet(rlcWalletText);
        console.log("rlc wallet: " + rlcWalletText);
        setLoading(false);

        setBalance(accountOutputText);
      }
      fetchData();
      // refreshUser(iexec);
    }, [ iexec.wallet ]);

    async function handleDeposit() {
      try {

      accountDepositButton.disabled = true;
      accountDepositError.innerText = "";
      const amount = accountDepositInput.value;
      await iexec.account.deposit(amount);
      accountDepositError.innerText = "Success";
      // fetchData();
      refreshUser(iexec)();
      } catch (error) {
        accountDepositError.innerText = error;
      } finally {
        accountDepositButton.disabled = false;
      }
    }

    async function handleWithdraw() {
      try {
        accountWithdrawButton.disabled = true;
        accountWithdrawError.innerText = "";
        const amount = accountWithdrawInput.value;
        await iexec.account.withdraw(amount);
        accountWithdrawError.innerText = "Success";
        refreshUser(iexec);
      } catch (error) {
        accountWithdrawError.innerText = error;
      } finally {
        accountWithdrawButton.disabled = false;
      }
    }

    async function refreshUser(iexec) {
      setLoading(true);
      const addr = await iexec.wallet.getAddress();
      const wallet = await iexec.wallet.checkBalances(addr);
      const balance = await iexec.account.checkBalance(addr); //account

      const nativeWalletText = wallet.wei.isZero()
        ? '<a href="https://goerli-faucet.slock.it/" target="_blank">Need some goerli ether to continue?</a>'
        : `${utils.formatEth(wallet.wei)} ether`;

      const rlcWalletText = wallet.nRLC.isZero()
         ? `<a href="https://faucet.iex.ec/goerli/${addr}" target="_blank">Need some goerli RLC to continue?</a>`
         : `${utils.formatRLC(wallet.nRLC)} RLC`;

      const accountOutputText =  `${utils.formatRLC(balance.stake)} RLC (+ ${utils.formatRLC(balance.locked)} RLC locked)`;
      setAddress(addr);
      setWallet(nativeWalletText);
      setRLCWallet(rlcWalletText);
      setLoading(false);
      setBalance(accountOutputText);
    }

    // async function handleWithdraw() {
    //   var amount = document.getElementById('amount-value').value;
    //   await iexec.account.deposit(amount);
    //
    //   var balanceTemp = await iexec.account.checkBalance(address);
    //   setBalance(balanceTemp.stake.toString());
    // }

    async function handleCountUserDatasets() {

      try {
        datasetsCountButton.disabled = true;
        datasetsCountError.innerText = "";
        datasetsCountOutput.innerText = "";
        const count = await iexec.dataset.countUserDatasets(
          await iexec.wallet.getAddress()
        );
        datasetsCountOutput.innerText = `total deployed datasets ${count}`;
      } catch (error) {
        datasetsCountError.innerText = error;
      } finally {
        datasetsCountButton.disabled = false;
      }
    }

    async function handleShowUserDatasets() {
      try {
          datasetsShowIndexButton.disabled = true;
          datasetsShowIndexError.innerText = "";
          datasetsShowIndexOutput.innerText = "";
          const datasetIndex = datasetsIndexInput.value;
          const res = await iexec.dataset.showUserDataset(
            datasetIndex,
            await iexec.wallet.getAddress()
          );
          datasetsShowIndexOutput.innerText = JSON.stringify(res, null, 2);
        } catch (error) {
          datasetsShowIndexError.innerText = error;
        } finally {
          datasetsShowIndexButton.disabled = false;
        }
    }

    async function handleShowUserDatasetsByAddress() {
      try {
          datasetsShowButton.disabled = true;
          datasetsShowError.innerText = "";
          datasetShowOutput.innerText = "";
          const datasetAddress = datasetsShowInput.value;
          const res = await iexec.dataset.showDataset(datasetAddress);
          datasetShowOutput.innerText = JSON.stringify(res, null, 2);
        } catch (error) {
          datasetsShowError.innerText = error;
        } finally {
          datasetsShowButton.disabled = false;
        }
    }

    async function handleDeployDataset() {
      try {
         datasetsDeployButton.disabled = true;
         datasetsDeployError.innerText = "";
         datasetsDeployOutput.innerText = "";
         const owner = await iexec.wallet.getAddress();
         const name = datasetsDeployNameInput.value;
         const multiaddr = datasetsDeployMultiaddrInput.value;
         const checksum =
           "0x0000000000000000000000000000000000000000000000000000000000000000"; // not used today
         const { address } = await iexec.dataset.deployDataset({
           owner,
           name,
           multiaddr,
           checksum
         });
         datasetsDeployOutput.innerText = `Dataset deployed at address ${address}`;
         datasetsShowInput.value = address;
         sellDatasetAddressInput.value = address;
         orderbookDatasetAddressInput.value = address;
         refreshUser(iexec)();
       } catch (error) {
         datasetsDeployError.innerText = error;
       } finally {
         datasetsDeployButton.disabled = false;
       }
    }

    async function handlePublishDataset() {
      try {
          sellPublishButton.disabled = true;
          sellPublishError.innerText = "";
          sellPublishOutput.innerText = "";
          const dataset = sellDatasetAddressInput.value;
          const datasetprice = sellDatasetPriceInput.value;
          const volume = sellDatasetVolumeInput.value;
          const apprestrict = sellDatasetApprestrictInput.value;
          const signedOrder = await iexec.order.signDatasetorder(
            await iexec.order.createDatasetorder({
              dataset,
              datasetprice,
              volume,
              apprestrict
            })
          );
          const orderHash = await iexec.order.publishDatasetorder(signedOrder);
          sellPublishOutput.innerText = `Order published with hash ${orderHash}`;
          sellUnpublishOrderhashInput.value = orderHash;
          sellCancelOrderhashInput.value = orderHash;
        } catch (error) {
          sellPublishError.innerText = error;
        } finally {
          sellPublishButton.disabled = false;
        }
    }

    async function handleUnpublishDataset() {
      try {
          sellUnpublishButton.disabled = true;
          sellUnpublishError.innerText = "";
          sellUnpublishOutput.innerText = "";
          const orderHash = sellUnpublishOrderhashInput.value;
          const unpublishedOrderHash = await iexec.order.unpublishDatasetorder(
            orderHash
          );
          sellUnpublishOutput.innerText = `Order with hash ${unpublishedOrderHash} is unpublished`;
        } catch (error) {
          sellUnpublishError.innerText = error;
        } finally {
          sellUnpublishButton.disabled = false;
        }
    }

    async function handleCancelOrder() {
      try {
          sellCancelButton.disabled = true;
          sellCancelError.innerText = "";
          sellCancelOutput.innerText = "";
          const orderHash = sellCancelOrderhashInput.value;
          const { order } = await iexec.orderbook.fetchDatasetorder(orderHash);
          const { txHash } = await iexec.order.cancelDatasetorder(order);
          sellCancelOutput.innerText = `Order canceled (tx:${txHash})`;
          refreshUser(iexec)();
        } catch (error) {
          sellCancelError.innerText = error;
        } finally {
          sellCancelButton.disabled = false;
        }
    }

    async function handleShowOrderBook() {
      try {
          orderbookShowButton.disabled = true;
          orderbookShowError.innerText = "";
          orderbookShowOutput.innerText = "";
          const datasetAddress = orderbookDatasetAddressInput.value;
          const res = await iexec.orderbook.fetchDatasetOrderbook(datasetAddress);
          orderbookShowOutput.innerText = JSON.stringify(res, null, 2);
        } catch (error) {
          orderbookShowError.innerText = error;
        } finally {
          orderbookShowButton.disabled = false;
        }
    }

    async function isSecretExist() {
      const isSecretSet = await iexec.dataset.checkDatasetSecretExists(
        '',
      );
      console.log('secret exists:', isSecretSet);
    }

    async function handlePushSecret() {
          try {
              datasetPushSecretButton.disabled = true;
              datasetPushSecretError.innerText = "";
              datasetPushSecretOutput.innerText = "";
              // const val = datasetDeployedKeystore.click();
              // console.log(val);
              const datasetAddress = datasetDeployedAddressInput.value;
              const secret = datasetDeployedKeystoreInput.value;

              const pushed = await iexec.dataset.pushDatasetSecret(
                datasetAddress,
                secret,
              );
              datasetPushSecretOutput.innerText = JSON.stringify(pushed, null, 2);
              datasetPushSecretOutput.innerText = pushed;
            } catch (error) {
              datasetPushSecretError.innerText = error;
            } finally {
              datasetPushSecretButton.disabled = false;
            }
        }

        async function handleShowAppsByAddress() {
          try {
              appsShowButton.disabled = true;
              appsShowError.innerText = "";
              appShowOutput.innerText = "";

              const appAddress = appsShowInput.value;
              const res = await iexec.app.showApp(appAddress);

              appShowOutput.innerText = JSON.stringify(res, null, 2);

            } catch (error) {
              appsShowError.innerText = error;
            } finally {
              appsShowButton.disabled = false;
            }
        }

        async function handleShowAppsByIndex() {
          try {
              appsShowIndexButton.disabled = true;
              appsShowIndexError.innerText = "";
              appsShowIndexOutput.innerText = "";
              const appIndex = appsIndexInput.value;
              const res = await iexec.app.showUserApp(
                appIndex,
                await iexec.wallet.getAddress()
              );
              appsShowIndexOutput.innerText = JSON.stringify(res, null, 2);

            } catch (error) {
              appsShowIndexError.innerText = error;
            } finally {
              appsShowIndexButton.disabled = false;
            }
        }

        async function handleCountApps() {
          try {
              appsCountButton.disabled = true;
              appsCountError.innerText = "";
              appsCountOutput.innerText = "";
              const count = await iexec.app.countUserApps(
                await iexec.wallet.getAddress()
              );
              appsCountOutput.innerText = `total deployed apps ${count}`;

            } catch (error) {
              appsCountError.innerText = error;
            } finally {
              appsCountButton.disabled = false;
            }
        }

        async function handleAppDeploy() {
          try {
              appsDeployButton.disabled = true;
              appsDeployError.innerText = "";
              appsDeployOutput.innerText = "";
              const owner = await iexec.wallet.getAddress();
              const name = appsDeployNameInput.value;
              const type = "DOCKER"; // only "DOCKER" is supported for now
              const multiaddr = appsDeployMultiaddrInput.value;
              const checksum = appsDeployChecksumInput.value;
              const mrenclave = ""; // used for Scone apps
              const { address } = await iexec.app.deployApp({
                owner,
                name,
                type,
                multiaddr,
                checksum,
                mrenclave
              });
              appsDeployOutput.innerText = `App deployed at address ${address}`;
              appsShowInput.value = address;
              refreshUser(iexec)();

            } catch (error) {
              appsDeployError.innerText = error;
            } finally {
              appsDeployButton.disabled = false;
            }
        }

        async function handleAppRun() {
          try {
            appRunButton.disabled = true;
            appRunError.innerText = "";
            appRunOutput.innerText = "";

            const owner = await iexec.wallet.getAddress();
            const appDatasetAddress = appRunDatasetMultiaddrInput.value;
            const appPrice = appRunPriceInput.value;

            // const resp = await iexec.app.runApp({
            //   owner,
            //   name,
            //   type,
            //   multiaddr,
            //   checksum,
            //   mrenclave
            // });

            // appRunOutput.innerText = `App Run: ${resp} .`;

            } catch (error) {
              appRunError.innerText = error;
            } finally {
              appRunButton.disabled = false;
            }
        }




    return (
        <AppLayout>
        <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Router>
            <Switch>
              <Route
                path={`${match.url}/dashboard`}
                render={props => <ViewDashboard web3State={web3State} web3={web3} loading={loading} address = {address} nativeWallet = {wallet} rlcWallet = {rlcWallet} balance = {balance} />}
              />
              <Route
                path={`${match.url}/account`}
                render={props => <ViewAccount web3State={web3State} web3={web3} loading={loading} handleDeposit = {handleDeposit} handleWithdraw = {handleWithdraw} />}
              />
              <Route
                path={`${match.url}/order`}
                render={props => <ViewOrder web3State={web3State} web3={web3} loading={loading} />}
              />
              <Route
                path={`${match.url}/dataset`}
                render={props => <ViewDataSet handleCountUserDatasets={handleCountUserDatasets} handleShowUserDatasets={handleShowUserDatasets} handleShowUserDatasetsByAddress={handleShowUserDatasetsByAddress} web3State={web3State} web3={web3} loading={loading} />}
              />
              <Route
                path={`${match.url}/request`}
                render={props => <ViewRequest web3State={web3State} web3={web3} loading={loading} />}
              />
              <Route
                path={`${match.url}/apps`}
                render={props => <ViewApps handleCountApps={handleCountApps} handleShowAppsByIndex={handleShowAppsByIndex} handleShowAppsByAddress={handleShowAppsByAddress} handleAppDeploy={handleAppDeploy} handleAppRun={handleAppRun} web3State={web3State} web3={web3} loading={loading} />}
              />
              <Route
                path="/details"
                render={props => <ViewDetails {...props} />}
              />
              <Redirect to={`${match.url}/dashboard`} />
            </Switch>
          </Router>
        </Suspense>
        </div>
      </AppLayout>
    );
  }

  export default withIexec(App);
