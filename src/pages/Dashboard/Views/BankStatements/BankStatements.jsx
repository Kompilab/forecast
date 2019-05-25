import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './BankStatements.scss';
import Icon from 'react-web-vector-icons';
import TransactionForm from '../../../../components/TransactionForm';
import FormattersHelpers from '../../../../helpers/formatter_helpers';
import globalRequests from '../../../../services/global';

class BankStatements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankStatements: [],
      loading: false,
      errors: null,
    };

    this._fetchData = this._fetchData.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    // this.setState({loading: true});

    // globalRequests.transactionsInitData((success, responses ) => {
    //   this.setState({
    //     loading: false
    //   });

    //   if (success) {
    //     for(let i=0; i < responses.length; i++) {
    //       let states = ['transactions', 'calculations'];

    //       responses[i].then(data => {
    //         this.setState({
    //           [states[i]]: data
    //         })
    //       })
    //     }
    //   } else {
    //     this.setState({
    //       errors: responses
    //     });
    //   }
    // })
  }

  loadTransactions(data, formOpen) {
    data = data || [];

    if (!data.length) {
      return (
        <div className="text-center text-muted">
          <p>You have no bank statements</p>
        </div>
      )
    }

    return (
      <div>okay</div>
    )
  }

  render() {
    const { loading, bankStatements, errors } = this.state;

    return (
      <div>
        <section className="upload mb-5 container-fluid">
          <div className="row">
            <div className="col-sm-7 summary-card p-3">
              <h5>Upload bank statement</h5>
            </div>
          </div>
        </section>

        <section className="all-transactions fo-section mb-3">
          <div className="header mb-3">
            <div className="">
              <h5>Bank Statements <span className="badge badge-light">{bankStatements && bankStatements.length}</span></h5>
              <p className="text-muted d-none"><em>as of 12:45 pm, 2019-04-28</em></p>
            </div>
          </div>

          {
            errors ? (
              <div>{FormattersHelpers.formatErrors(errors)}</div>
            ): null
          }

          <div className="transactions-list">
            {
              loading ? (
                <div className="text-center">
                  <div className="spinner-grow text-primary" role="status" aria-hidden="true">
                    <span className="sr-only">Loading statements...</span>
                  </div>
                </div>
              ) : (
                <div>
                  {/* { this.loadTransactions(transactions) } */}
                </div>
              )
            }
          </div>
        </section>
      </div>
    )
  }
}

export default BankStatements;
