import React, { Component, Fragment, useEffect, useState } from "react";
import { Row } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import Breadcrumb from "../../containers/navs/Breadcrumb";
import { withIexec } from '../../provider/IExecProvider';
import "iexec";

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
        chainId: "",
        address: "",
        nativeWallet: "",
        rlcWallet: "",
        balance: ""
    };
  }

  render() {
      const { loading, chainId, address, nativeWallet, rlcWallet, balance, data } = this.props;
      console.log(data);
      return (
        <div>
            { loading && (
              <div>
                Contacting provider...
              </div>
            )}
            { !loading &&(
          <Fragment>
          <Row>
            <Colxx xxs="12">
              <Separator className="mb-5" />
            </Colxx>
          </Row>
          <Row>
            <Colxx xxs="12" className="mb-4">
              <p>chain: {chainId}</p>
              <p>Address: {address}</p>
              <p>Native Wallet: {nativeWallet}</p>
              <p>RLC Wallet: {rlcWallet}</p>
              <p>Balance: {balance}</p>
            </Colxx>
          </Row>
        </Fragment>
      )}
      </div>
      )
  }
}

export default Dashboard;
