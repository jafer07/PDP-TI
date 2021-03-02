import React, { Component, Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { withIexec } from '../../provider/IExecProvider';
import "iexec";

class OrderDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
        address: ""
    };
  }

  render() {
      const { loading } = this.props;
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
              <h2>Patient Data Management Portal</h2>
              <hr />
              <div id="ops">
                <h2>Orderbook</h2>
                  <div class="container">
                  <div>
                   <label for="orderbook-datasetaddress-input">Dataset address : </label>
                   <input
                     hash
                     id="orderbook-datasetaddress-input"
                     type="text"
                     value="0x917D71168fF60A10afD684d8D815b4A78097225D"
                     placeholder="Dataset address"
                   />
                   <button id="orderbook-show-button" disabled>SHOW DATASET ORDERBOOK</button>
                  </div>
                  <label id="orderbook-show-error" class="error"></label>
                  <div class="scrollable" id="orderbook-show-output"></div>
                  </div>
             </div>
          </div>
          )}

        </header>
      </div>
      );
  }
}

export default OrderDetails;
