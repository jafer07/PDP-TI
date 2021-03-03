import React, { Component, Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { withIexec } from '../../provider/IExecProvider';
import "iexec";

import styled from 'styled-components';

// import { Table } from '../../table';
// import { Styles } from '../../table';
// import makeData from '../../makeData';

class OrderDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {
        address: "",
    };
  }

componentDidMount() {
      // send HTTP request
      // save it to the state
      fetch('http://0.0.0.0:9000/pdp/datasets')
      .then(res => res.json())
      .then((data) => {
        this.setState({ datasets: data })
      })
      .catch(console.log)
  }

  render() {
      const { loading } = this.props;
      const Datasets = this.state.datasets;
      console.log(Datasets);

      // const tablestyle = {
      //   display: "inline-block",
      //   padding: "5px"
      // };
      // .table {
      // 	font-family: arial, sans-serif;
      // 	border-collapse: collapse;
      // 	width: 100%;
      // }


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
              <div>
                  <h2>My Datasets</h2>

                  <table>
                    <tr>
                      <th>Company</th>
                      <th>Contact</th>
                      <th>Country</th>
                    </tr>
                    <tr>
                      <td>Alfreds Futterkiste</td>
                      <td>Maria Anders</td>
                      <td>Germany</td>
                    </tr>
                    <tr>
                      <td>Centro comercial Moctezuma</td>
                      <td>Francisco Chang</td>
                      <td>Mexico</td>
                    </tr>
                    <tr>
                      <td>Ernst Handel</td>
                      <td>Roland Mendel</td>
                      <td>Austria</td>
                    </tr>
                    <tr>
                      <td>Island Trading</td>
                      <td>Helen Bennett</td>
                      <td>UK</td>
                    </tr>
                    <tr>
                      <td>Laughing Bacchus Winecellars</td>
                      <td>Yoshi Tannamuri</td>
                      <td>Canada</td>
                    </tr>
                    <tr>
                      <td>Magazzini Alimentari Riuniti</td>
                      <td>Giovanni Rovelli</td>
                      <td>Italy</td>
                    </tr>
                  </table>
              </div>
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
