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
    const { onFileUpload, hiddenFileInput, hiddenKeyFileInput, datasetCount, handleCountUserDatasets,  handleShowUserDatasets, handleShowUserDatasetsByAddress,
      handleDeployDataset, handlePublishDataset, handleUnpublishDataset, handlePushSecret,
      loading } = this.props;

    const count = {datasetCount};
    console.log(count);
    const divparallelstyle = {
      display: "inline-block",
      padding: "5px"
    };

    const divfieldstyle = {
      padding: "5px"
    };

      return (
      <div className="App">
        <header className="App-header">
          { loading && (
            <div>
              Contacting provider...
            </div>
          )}
          { !loading && (
            <div>
            <h2>Patient Data Privacy Portal</h2>
              <hr />
              <div id="ops">
              <h3>Datasets</h3>
                 <div class="container">
                  <div style={divparallelstyle}> <label id="datasets-count-error" class="error"></label> </div>
                  <div style={divparallelstyle}>  <button id="datasets-count-button" onClick={handleCountUserDatasets}>Refresh</button> </div>
                  <div style={divparallelstyle}> <div id="datasets-count-output">{datasetCount}</div>
                  </div>

                 </div>
              <hr />

              <h3>Deploy dataset</h3>
                <div class="container">
                 <div>
                   <div>
                    <div style={divparallelstyle}><label for="datasets-deployname-input">Dataset name : </label></div>
                    <div style={divparallelstyle}>
                     <input
                       id="datasets-deployname-input"
                       type="text"
                       placeholder="Dataset name"
                     />
                     </div>
                  </div>


                   <div>
                    <div style={divparallelstyle}> <label for="datasets-deploymultiaddr-input">Dataset url/ipfs : </label></div>
                    <div style={divparallelstyle}>
                      <input
                        id={1}
                        type="file"
                        onChange={onFileUpload}
                      />
                    </div>
                   </div>

                   <div>
                    <div style={divparallelstyle}><label for="dataset-deployed-Keystore">Dataset Keystore : </label></div>
                    <div style={divparallelstyle}>
                      <input
                        id={2}
                        type="file"
                        onChange={onFileUpload}
                      />
                    </div>
                   </div>

                   <button id="datasets-deploy-button" onClick={handleDeployDataset}>DEPLOY DATASET : </button>
                 </div>
                 <label id="datasets-deploy-error" class="error"></label>
                 <div id="datasets-deploy-output"></div>
                </div>

              <hr />
{/*
              <h2>Push Dataset Secret</h2>
                <div class="container">
                 <div>
                   <div>
                     <label for="dataset-deployed-address-input">Dataset Address : </label>
                     <input
                       id="dataset-deployed-address-input"
                       type="text"
                       placeholder="Dataset Address"
                     />
                   </div>
                   <div>
                     <label for="dataset-deployed-Keystore">Dataset Keystore : </label>
                     <input
                       id="dataset-deployed-keystore-input"
                       type="text"
                       placeholder="Dataset Keystore"
                     />
                   </div>
                   <button id="dataset-push-secret-button" onClick={handlePushSecret}>Push DATASET Secret : </button>
                 </div>
                 <label id="dataset-push-secret-error" class="error"></label>
                 <div id="dataset-push-secret-output"></div>
                </div>
              <hr />
*/}

              <h3>Sell dataset</h3>
                <div class="container">
                 <div>
                   <div>
                     <label for="sell-datasetaddress-input">Dataset address : </label>
                     <input
                       id="sell-datasetaddress-input"
                       type="text"
                       placeholder="Dataset address"
                     />
                   </div>
                   <div>
                     <label for="sell-datasetprice-input">Price : </label>
                     <input
                       id="sell-datasetprice-input"
                       type="number"
                       min="0"
                       placeholder="Price"
                     />
                   </div>
                   <div>
                     <label for="sell-volume-input">Volume : </label>
                     <input
                       id="sell-volume-input"
                       type="number"
                       min="1"
                       placeholder="Volume"
                     />
                   </div>
                   <div>
                     <label for="sell-apprestrict-input">Restrict to app : </label>
                     <input
                       id="sell-apprestrict-input"
                       type="text"
                       placeholder="app address"
                     />
                   </div>
                   <button id="sell-publish-button" onClick={handlePublishDataset}>PUBLISH SELL ORDER</button>
                 </div>
                 <label id="sell-publish-error" class="error"></label>
                 <div id="sell-publish-output"></div>
                </div>
              <hr />

              <h3>Deployed Dataset Information</h3>
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
{/*
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
*/}
              <hr />

              <h2>Unpublish dataset</h2>
                <div class="container">
                 <div>
                   <label for="sell-unpublishhash-input">Order hash : </label>
                   <input
                     id="sell-unpublishhash-input"
                     type="text"
                     placeholder="Order hash"
                   />
                   <button id="sell-unpublish-button">UNPUBLISH ORDER : </button>
                 </div>
                 <label id="sell-unpublish-error" class="error"></label>
                 <div id="sell-unpublish-output"></div>
                </div>
                <div class="container">
                 <div>
                   <label for="sell-cancelhash-input">Order hash : </label>
                   <input
                     id="sell-cancelhash-input"
                     type="text"
                     value=""
                     placeholder="Order hash"
                   />
                   <button id="sell-cancel-button" onClick={handleUnpublishDataset}>CANCEL ORDER : </button>
                 </div>
                 <label id="sell-cancel-error" class="error"></label>
                 <div id="sell-cancel-output"></div>
                </div>

              <hr />

             </div>
          </div>
          )}

        </header>
      </div>
      );
  }
}

export default DataSet;
