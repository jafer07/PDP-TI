import React, { Component, Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { withIexec } from '../../provider/IExecProvider';
import "iexec";

class AccountDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
        address: ""
    };
  }

  render() {
    const { web3State, web3, loading, handleDeposit, handleWithdraw } = this.props;
      return (
      <div className="App">
        <header className="App-header">
        <div id="loader_div" class="loader_div">
            {web3State.isConnected && "Connected!\n"}
            {web3State.isLoading && "Loading...\n"}
            {web3State.error && `Connection error: ${web3State.error.message}\n`}
            Web3 version: {web3.version}
          </div>
          { loading && (
            <div>
              Contacting provider...
            </div>
          )}
          { !loading && (
            <div>
              <h2>Patient Data Management Portal</h2>
              <hr />
              <div id="ops">
                <h2>Account</h2>
                  <div class="container">
                    <div>
                      <label for="account-deposit-input">Amount : </label>
                      <input
                        id="account-deposit-input"
                        type="number"
                        min="1"
                        placeholder="nRLC to deposit"
                      />
                      <button id="account-deposit-button" onClick={handleDeposit}>DEPOSIT</button>
                    </div>
                    <label id="account-deposit-error" class="error"></label>
                  </div>
                  <div class="container">
                    <div>
                      <label for="account-withdraw-input">Amount : </label>
                      <input
                        id="account-withdraw-input"
                        type="number"
                        min="1"
                        placeholder="nRLC to withdraw"
                      />
                      <button id="account-withdraw-button" onClick={handleWithdraw}>WITHDRAW</button>
                    </div>
                    <label id="account-withdraw-error" class="error"></label>
                  </div>
             </div>
          </div>
          )}
        </header>
      </div>
      );
  }
}

export default AccountDetails;