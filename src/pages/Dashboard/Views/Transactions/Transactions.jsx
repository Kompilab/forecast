import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Transactions.scss';
import Icon from 'react-web-vector-icons';
import TransactionForm from '../../../../components/TransactionForm';
import FormattersHelpers from '../../../../helpers/formatter_helpers';
import globalRequests from '../../../../services/global';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      calculations: {},
      loading: false,
      errors: null,
      formOpen: false,
    };

    this._fetchData = this._fetchData.bind(this);
    this.loadTransactions = this.loadTransactions.bind(this);
    this.handleToggleForm = this.handleToggleForm.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    this.setState({loading: true});

    globalRequests.transactionsInitData((success, responses ) => {
      this.setState({
        loading: false
      });

      if (success) {
        for(let i=0; i < responses.length; i++) {
          let states = ['transactions', 'calculations'];

          responses[i].then(data => {
            this.setState({
              [states[i]]: data
            })
          })
        }
      } else {
        this.setState({
          errors: responses
        });
      }
    })
  }

  handleToggleForm() {
    this.setState(prevState => ({
      formOpen: !prevState.formOpen
    }))
  }

  loadTransactions(data, formOpen) {
    data = data || [];

    if (!data.length) {
      return (
        <div className="text-center text-muted">
          <p>You have no transactions.{formOpen ? '' : ' Click "Add Transaction" to add one.'}</p>
        </div>
      )
    }

    if (!false) {
      return (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Category</th>
              <th>Payment Method</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            {data.map((tx, index) => {
              return (
                  <tr
                    className={`clickable`}
                    onClick={() => console.log('i click')}
                    key={index}>
                    <td data-label="Date">{tx.transaction_date}</td>
                    <td data-label="Transaction">{tx.description}</td>
                    <td data-label="Amount" dangerouslySetInnerHTML={{ __html: FormattersHelpers.formatAmount(tx.amount) }}></td>
                    <td data-label="Type">{tx.transaction_type}</td>
                    <td data-label="Category">{tx.category_name}</td>
                    <td data-label="Payment Method">{tx.payment_method}</td>
                    <td data-label="Source">{tx.source}</td>
                  </tr>
                )
              }
            )}
          </tbody>
        </table>
      )
    }
  }

  render() {
    const { loading, transactions, formOpen, errors, calculations } = this.state;

    return (
      <div>
        <section className="at-a-glance mb-3">
          <div>
            Income: <span dangerouslySetInnerHTML={{ __html: FormattersHelpers.formatAmount(calculations.income) }}></span>
          </div>
          <div>
            Expenses: <span dangerouslySetInnerHTML={{ __html: FormattersHelpers.formatAmount(calculations.expenses) }}></span>
          </div>
        </section>

        <section className="all-transactions mb-3">
          <div className="header mb-3">
            <div className="">
              <h5>Transactions <span className="badge badge-light">{transactions && transactions.length}</span></h5>
              <p className="text-muted d-none"><em>as of 12:45 pm, 2019-04-28</em></p>
            </div>

            <div className="text-right">
              <div className="btn-group mr-2" role="group" aria-label="First group">
                <button type="button" className="btn btn-sm btn-fo-primary btn-primary" onClick={this.handleToggleForm}>
                  <div className="d-sm-block d-md-none">
                    { formOpen ? (
                      <Icon
                        font="AntDesign"
                        name="close"
                        color='#ffffff'
                        size={15}
                        // style={{}}
                      />
                    ) : (
                      <Icon
                        font="AntDesign"
                        name="plus"
                        color='#ffffff'
                        size={15}
                        // style={{}}
                      />
                    ) }
                  </div>
                  <span className="d-none d-sm-none d-md-block">
                    { formOpen ? 'Cancel' : 'Add Transaction' }
                  </span>
                </button>
              </div>

              <div className="btn-group" role="group" aria-label="Third group">
                <div className="btn-group" role="group">
                  <button id="tx-more-options" type="button" className="btn btn-sm btn-light" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Icon
                      font="Entypo"
                      name="dots-three-horizontal"
                      color='#9b9b9b'
                      size={15}
                      // style={{}}
                    />
                  </button>
                  <div className="dropdown-menu dropdown-menu-right" aria-labelledby="tx-more-options">
                    <Link to="/dashboard/categories" className="dropdown-item">Manage Categories</Link>
                    <a className="dropdown-item" href="#">Import Transactions</a>
                    <a className="dropdown-item" href="#">Export Summary</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            formOpen ? (
              <TransactionForm
                refreshTransactions={this._fetchData}
                toggleForm={this.handleToggleForm} />
            ) : null
          }

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
                    <span className="sr-only">Loading transactions...</span>
                  </div>
                </div>
              ) : (
                <div>
                  { this.loadTransactions(transactions) }
                </div>
              )
            }
          </div>
        </section>
      </div>
    )
  }
}

export default Transactions;
