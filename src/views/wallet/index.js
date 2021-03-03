import { withIexec } from '../../provider/IExecProvider';
import AppLayout from '../../layout/AppLayout';
import React, { Suspense, useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core'
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
    // eslint-disable-next-line
    const { iexec, match } = props;
    const { chainId } = useWeb3React();
    const [ address, setAddress ] = useState("");
    const [ wallet, setWallet ] = useState("");
    const [ rlcWallet, setRLCWallet ] = useState("");
    const [ balance, setBalance ] = useState("");
    const [ datasetCount, setDatasetCount ] = useState("");
    const [ appCount, setAppCount ] = useState("");

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
    const appsDeployMREnclaveInput = document.getElementById("app-deploy-mrenclave-input");
    const appsDeployChecksumInput = document.getElementById("apps-deploychecksum-input");

    const appsDeployButton = document.getElementById("apps-deploy-button");
    const appsDeployError = document.getElementById("apps-deploy-error");
    const appsDeployOutput = document.getElementById("apps-deploy-output");

    const appRunDatasetMultiaddrInput = document.getElementById("app-run-dataset-address-input");
    const appRunPriceInput = document.getElementById("app-run-price-input");
    const appRunAddressInput = document.getElementById("app-run-address-input");
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


        let datasetCountResponse = "";
        let appCountResponse = "";
        try {
          const d_count = await iexec.dataset.countUserDatasets(
            await iexec.wallet.getAddress()
          );

          datasetCountResponse = `TOTAL DEPLOYED DATASETS: ${d_count}`;
          const a_count = await iexec.app.countUserApps(
            await iexec.wallet.getAddress()
          );
          appCountResponse = `TOTAL DEPLOYED APPLICATIONs: ${a_count}`;

        } catch (error) {
        } finally {

          setDatasetCount(datasetCountResponse);
          setAppCount(appCountResponse);
        }
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
        datasetsCountOutput.innerText = `TOTAL DEPLOYED DATASETS: ${count}`;
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
          console.log('heere:');
          sellPublishButton.disabled = true;
          sellPublishError.innerText = "";
          sellPublishOutput.innerText = "";
          const dataset = sellDatasetAddressInput.value;
          const datasetprice = sellDatasetPriceInput.value;
          const volume = sellDatasetVolumeInput.value;
          const apprestrict = sellDatasetApprestrictInput.value;
          const datasetOrder = await iexec.order.createDatasetorder({
              dataset,
              datasetprice,
              volume,
              apprestrict
            });
          console.log(datasetOrder);

          const signedOrder = await iexec.order.signDatasetorder(datasetOrder);
          console.log(signedOrder);

          const orderHash = await iexec.order.publishDatasetorder(signedOrder);
          console.log(orderHash);

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
            appsCountOutput.innerText = `TOTAL DEPLOYED APPLICATIONS: ${count}`;

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
            const mrenclave = appsDeployMREnclaveInput.value; // used for Scone apps
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

          const userAddress = await iexec.wallet.getAddress();
          const appDatasetAddress = appRunDatasetMultiaddrInput.value;
          const appPrice = appRunPriceInput.value;
          const appAddress = appRunAddressInput.value;

          const category = '1'; // TODO: hd to TEE
          const params = ""; // TODO: hd to none

          if (!checkStorageInitialized()){
            console.log("not init")
            initStorage();
          }

//        publishing app:
          const app = appDatasetAddress;
          const appprice = '0'; //TODO: hd to none
          const volume = '1'; //TODO: hd to n
          const tag = 'tee';
//        TODO: could restrict the access to requester only.
          const signedOrder = await iexec.order.signApporder(
            await iexec.order.createApporder({
              app,
              appprice,
              volume,
              tag
            })
          );
          const orderHash = await iexec.order.publishApporder(signedOrder);
          console.log(`Order published with hash ${orderHash}`)

          const { datasetOrders } = await iexec.orderbook.fetchDatasetOrderbook(appDatasetAddress);
          const datasetOrder = datasetOrders && datasetOrders[0] && datasetOrders[0].order;
          if (!datasetOrder) throw Error(`no datasetorder found for the dataset address ${appDatasetAddress}`);

          const { appOrders } = await iexec.orderbook.fetchAppOrderbook(appAddress);
          const appOrder = appOrders && appOrders[0] && appOrders[0].order;
          if (!appOrder) throw Error(`no apporder found for app ${appAddress}`);

          const { workerpoolOrders } = await iexec.orderbook.fetchWorkerpoolOrderbook({ category });
          const workerpoolOrder = workerpoolOrders && workerpoolOrders[0] && workerpoolOrders[0].order;
          if (!workerpoolOrder) throw Error(`no workerpoolorder found for category ${category}`);

//        TODO : request order
          const requestOrderToSign = await iexec.order.createRequestorder({
            app: appOrder.app,
            appmaxprice: appOrder.appprice,
            dataset: datasetOrder.dataset,
            datasetmaxprice: datasetOrder.datasetprice,
            workerpoolmaxprice: workerpoolOrder.workerpoolprice,
            requester: userAddress,
            volume: 1,
            tag:tag,
            params: params,
            category: category
          });

//        TODO: sign order
          const requestOrder = await iexec.order.signRequestorder(requestOrderToSign);

//        TODO: match order = find a deal
          const res = await iexec.order.matchOrders({
            datasetOrder: datasetOrder,
            apporder: appOrder,
            workerpoolorder: workerpoolOrder,
            requestorder: requestOrder
          });

          appRunOutput.innerText = JSON.stringify(res, null, 2);
          console.log(`Order published with dealId ${res.dealid}`)
          refreshUser(iexec)();

          // appRunOutput.innerText = `App Run: ${resp} .`;
          } catch (error) {
            appRunError.innerText = error;
          } finally {
            appRunButton.disabled = false;
          }
      }

// TODO: as in CLI app run , but might not be needed
      // const requestorderToSign = await createRequestorder(
      //    { contracts: chain.contracts, resultProxyURL: chain.resultProxy },
      //    {
      //      app: apporder.app,
      //      appmaxprice: apporder.appprice,
      //      dataset: datasetorder.dataset,
      //      datasetmaxprice: datasetorder.datasetprice,
      //      workerpool: workerpoolorder.workerpool,
      //      workerpoolmaxprice: workerpoolorder.workerpoolprice,
      //      requester,
      //      volume: 1,
      //      tag,
      //      category: workerpoolorder.category,
      //      trust,
      //      beneficiary: beneficiary || requester,
      //      callback,
      //      params,
      //    },
      //  );



    async function initStorage(){
      try {

        const storageToken = await iexec.storage.defaultStorageLogin();
        await iexec.storage.pushStorageToken(storageToken, { forceUpdate: true });

        if (!checkStorageInitialized()) throw Error(`unable to init storage`);
      } catch (error) {
        // storageInitError.innerText = error;
      } finally {
        // storageInitButton.disabled = false;
      }
    }

    async function checkStorageInitialized(){
      const isStorageInitialized  = false;
      try {
          isStorageInitialized = await iexec.storage.checkStorageTokenExists(
          await iexec.wallet.getAddress()
          );
          const responseStr = isStorageInitialized
          ? "initialized"
          : "not initialized";
      } catch (error) {
        const errorMsg = error.message;
      } finally {
        return isStorageInitialized;
      }
    }

    function createDataset(param) {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: param })
      };

      return fetch("http://localhost:9000/pdp/", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
    }

    function createDatasetRequest(param) {

      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: param })
      };

      return fetch("http://localhost:9000/pdp/", requestOptions)
      .then(response => response.json())
      .then(data => this.setState({ postId: data.id }));
    }

    // function fetchDatasets(param) {
    //   // param is a highlighted word from the user before it clicked the button
    //   return fetch("https://api.com/?param=" + param);
    // }
    //
    // function fetchPatientDatasets(param) {
    //   // param is a highlighted word from the user before it clicked the button
    //   return fetch("https://api.com/?param=" + param);
    // }
    //
    // function fetchApplications() {
    //   // param is a highlighted word from the user before it clicked the button
    //   return fetch("https://api.com/?param=" + param);
    // }
    //
    // function fetchResearcherApplications(param) {
    //   // param is a highlighted word from the user before it clicked the button
    //   return fetch("https://api.com/?param=" + param);
    // }

    return (
        <AppLayout>
        <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Router>
            <Switch>
              <Route
                path={`${match.url}/dashboard`}
                render={props => <ViewDashboard loading={loading} chainId = {chainId} address = {address} nativeWallet = {wallet} rlcWallet = {rlcWallet} balance = {balance} />}
              />
              <Route
                path={`${match.url}/account`}
                render={props => <ViewAccount loading={loading} handleDeposit = {handleDeposit} handleWithdraw = {handleWithdraw} />}
              />
              <Route
                path={`${match.url}/order`}
                render={props => <ViewOrder loading={loading} />}
              />
              <Route
                path={`${match.url}/dataset`}
                render={props => <ViewDataSet datasetCount={datasetCount}  handleCountUserDatasets={handleCountUserDatasets} handleShowUserDatasets={handleShowUserDatasets} handleShowUserDatasetsByAddress={handleShowUserDatasetsByAddress} handleDeployDataset={handleDeployDataset} handlePushSecret={handlePushSecret} handlePublishDataset={handlePublishDataset} handleUnpublishDataset={handleUnpublishDataset} loading={loading} />}
              />
              <Route
                path={`${match.url}/request`}
                render={props => <ViewRequest loading={loading} />}
              />
              <Route
                path={`${match.url}/apps`}
                render={props => <ViewApps  handleShowAppsByIndex={handleShowAppsByIndex} handleShowAppsByAddress={handleShowAppsByAddress} handleAppDeploy={handleAppDeploy} handleAppRun={handleAppRun} loading={loading} />}
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
