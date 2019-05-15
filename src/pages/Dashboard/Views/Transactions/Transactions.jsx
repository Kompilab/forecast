import React, { Component } from 'react';
import './Transactions.scss';
import Icon from 'react-web-vector-icons';
import transactions from '../../../../services/transactions';
import TransactionForm from '../../../../components/TransactionForm';
import FormattersHelpers from '../../../../helpers/formatter_helpers';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      loading: false,
      errors: null,
      formOpen: false,
    };

    this._fetchTransactions = this._fetchTransactions.bind(this);
    this.loadTransactions = this.loadTransactions.bind(this);
    this.handleToggleForm = this.handleToggleForm.bind(this);
  }

  componentDidMount() {
    this._fetchTransactions()
  }

  _fetchTransactions() {
    this.setState({loading: true});

    transactions.getAll((success, response) => {
      if (success) {
        this.setState({
          loading: false,
          transactions: response
        })
      } else {
        this.setState({
          loading: false,
          errors: response
        })
      }
    })
  }

  handleToggleForm() {
    this.setState(prevState => ({
      formOpen: !prevState.formOpen
    }))
  }

  loadTransactions(data) {
    data = data || [];

    if (!data.length) {
      return (
        <div className="text-center text-muted">
          <p>You have no transactions. Click "Add Transaction" to add one.</p>
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
                    <td data-label="Amount">{tx.amount}</td>
                    <td data-label="Type">{tx.transaction_type}</td>
                    <td data-label="Category">{tx.category_id}</td>
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
    const { loading, transactions, formOpen, errors } = this.state;

    return (
      <div>
        <section className="at-a-glance">
          <h5>At a glance</h5>
          <div>
            Income: N 30,000
          </div>
          <div>
            Expenses: N 20,000
          </div>
        </section>

        <section className="all-transactions">
          <div className="header">
            <div className="row">
              <div className="col-6">
                <h5>Transactions ({transactions && transactions.length})</h5>
                <p className="text-muted"><em>as of 12:45 pm, 2019-04-28</em></p>
              </div>

              <div className="col-6 text-right">
                <div className="btn-group mr-2" role="group" aria-label="First group">
                  <button type="button" className="btn btn-primary" onClick={this.handleToggleForm}>
                    { formOpen ? 'Cancel' : 'Add Transaction' }
                  </button>
                </div>
                <div className="btn-group mr-2" role="group" aria-label="Second group">
                  <button type="button" className="btn btn-outline-secondary">Manage Categories</button>
                </div>

                <div className="btn-group" role="group" aria-label="Third group">
                  <div className="btn-group" role="group">
                    <button id="tx-more-options" type="button" className="btn btn-light dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <Icon
                        font="Entypo"
                        name="dots-three-horizontal"
                        color='#9b9b9b'
                        size={15}
                        // style={{}}
                      />
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="tx-more-options">
                      <a className="dropdown-item" href="#">Import Transactions</a>
                      <a className="dropdown-item" href="#">Export Summary</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {
            formOpen ? (
              <TransactionForm />
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
                <div>
                  <p>Loading transactions</p>
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
