import React, { Component, Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { withIexec } from '../../provider/IExecProvider';
import "iexec";

class DataSet extends Component {
  constructor(props) {
    super(props)
    this.state = {
        address: ""
    };
  }

  render() {
    const { handleCountUserDatasets,  handleShowUserDatasets, handleShowUserDatasetsByAddress, web3State, web3, loading } = this.props;
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
                <h2>Datasets</h2>
                   <div class="container">
                     <button id="datasets-count-button" onClick={handleCountUserDatasets}>COUNT USER DATASETS</button>
                     <label id="datasets-count-error" class="error"></label>
                     <div id="datasets-count-output"></div>
                   </div>
                   <div class="container">
                     <div>
                       <label for="datasets-index-input">Dataset index : </label>
                       <input
                         id="datasets-index-input"
                         type="number"
                         min="1"
                         placeholder="Dataset index"
                       />
                       <button id="datasets-showindex-button" onClick={handleShowUserDatasets}>
                         SHOW USER DEPLOYED DATASET(By Index)
                       </button>
                     </div>
                     <label id="datasets-showindex-error" class="error"></label>
                     <div class="scrollable" id="datasets-showindex-output"></div>
                   </div>
                   <div class="container">
                     <div>
                       <label for="datasets-address-input">Dataset address : </label>
                       <input
                         id="datasets-address-input"
                         type="text"
                         placeholder="Dataset address"
                       />
                       <button id="datasets-show-button" onClick={handleShowUserDatasetsByAddress}>
                       SHOW USER DEPLOYED DATASET(By Address)
                      </button>
                     </div>
                     <label id="datasets-show-error" class="error"></label>
                     <div class="scrollable" id="datasets-details-output"></div>
                   </div>
             </div>
          </div>
          )}
	
        </header>
      </div>
      );
  }
}

export default DataSet;