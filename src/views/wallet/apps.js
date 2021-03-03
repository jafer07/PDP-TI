import React, { Component, Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { withIexec } from '../../provider/IExecProvider';
import "iexec";

class Apps extends Component {
  constructor(props) {
    super(props)
    this.state = {
        address: ""
    };
  }

  render() {
      //declare variable
    const { handleCountApps, handleShowAppsByIndex, handleShowAppsByAddress, handleAppDeploy, handleAppRun, loading } = this.props;
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
                <h2>My Apps</h2>
                  <div class="container">
                    <button id="apps-count-button" onClick={handleCountApps}>COUNT USER APPS</button>
                    <label id="apps-count-error" class="error"></label>
                    <div id="apps-count-output"></div>
                  </div>
                  <div class="container">
                    <div>
                      <label for="apps-index-input">App index</label>
                      <input
                        id="apps-index-input"
                        type="number"
                        min="0"
                        placeholder="App index"
                      />
                      <button id="apps-showindex-button" onClick={handleShowAppsByIndex}>SHOW USER APP</button>
                    </div>
                    <label id="apps-showindex-error" class="error"></label>
                    <div class="scrollable" id="apps-showindex-output"></div>
                  </div>
{/*
                  <div class="container">
                    <div>
                      <label for="apps-address-input">App address</label>
                      <input
                        id="apps-address-input"
                        type="text"
                        placeholder="App address"
                      />
                      <button id="apps-show-button" onClick={handleShowAppsByAddress}>SHOW APP</button>
                    </div>
                    <label id="apps-show-error" class="error"></label>
                    <div class="scrollable" id="apps-details-output"></div>
                  </div>
*/}
                <hr />
                <h2>Deploy app</h2>
                  <div class="container">
                    <div>
                      <div>
                        <label for="apps-deployname-input">App name</label>
                        <input
                          id="apps-deployname-input"
                          type="text"
                          placeholder="App name"
                        />
                      </div>
                      <div>
                        <label for="apps-deploymultiaddr-input">App image</label>
                        <input
                          id="apps-deploymultiaddr-input"
                          type="text"
                          placeholder="App multiaddr"
                        />
                      </div>
                      <div>
                        <div>
                          <label for="app-deploy-mrenclave-input">Dataset address</label>
                          <input
                            id="app-deploy-mrenclave-input"
                            type="text"
                            placeholder="mr enclave"
                          />
                        </div>
                      <div>
                        <label for="apps-deploychecksum-input">App checksum</label>
                        <input
                          id="apps-deploychecksum-input"
                          type="text"
                          placeholder="App checksum"
                        />
                      </div>
                      <button id="apps-deploy-button" onClick={handleAppDeploy}>DEPLOY APP</button>
                    </div>
                    <label id="apps-deploy-error" class="error"></label>
                    <div id="apps-deploy-output"></div>
                  </div>
                </div>

                <hr />

                <h2>Run app</h2>
                <div class="container">
                  <div>
                    <div>
                      <label for="app-run-dataset-address-input">Dataset address</label>
                      <input
                        id="app-run-dataset-address-input"
                        type="text"
                        placeholder="App address"
                      />
                    </div>
                    <div>
                      <label for="app-run-price-input">Price</label>
                      <input
                        id="app-run-price-input"
                        type="number"
                        min="0"
                        placeholder="Price"
                      />
                    </div>
                    <div>
                      <label for="app-run-address-input">App address</label>
                      <input
                        id="buy-appaddress-input"
                        type="text"
                        placeholder="App address"
                      />
                    </div>
                    <button id="app-run-button" onClick={handleAppRun}>Run App</button>
                  </div>
                  <label id="app-run-error" class="error"></label>
                  <div id="app-run-output"></div>
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

export default Apps;
