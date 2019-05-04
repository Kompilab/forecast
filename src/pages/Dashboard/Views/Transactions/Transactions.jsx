import React, { Component } from 'react';
import './Transactions.scss';
import Icon from 'react-web-vector-icons';
import moment from 'moment';
import transactions from '../../../../services/transactions';

class Transactions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      transactions: [],
      loading: false,
      errors: null,
      formOpen: false,

      date: moment().format('YYYY-MM-DD'),
      description: '',
      amount: '',
      type: '',
      category_id: '',
      payment_method: '',
      notes: ''
    };

    this._fetchTransactions = this._fetchTransactions.bind(this);
    this.loadTransactions = this.loadTransactions.bind(this);
    this.clearForm = this.clearForm.bind(this);

    this.handleToggleForm = this.handleToggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._handleCreateTransaction = this._handleCreateTransaction.bind(this);
  }

  componentDidMount() {
    if (!this.state.transactions.length) {
      this._fetchTransactions()
    }
  }

  _fetchTransactions() {
    this.setState({loading: true});

    transactions.getAll((success, response=[]) => {
      this.setState({
        loading: false,
        transactions: response
      });

      if (!success) {
        this.setState({errors: response})
      }
    })
  }

  handleToggleForm() {
    this.setState(prevState => ({
      formOpen: !prevState.formOpen
    }))
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  _handleCreateTransaction(e) {
    e.preventDefault();
    this.setState({loading: true, errors: null});

    transactions.create(this.prepData(this.state), (success, response='') => {
      if (success) {
        console.log('success===> ', response);
        this.setState({
          transactions: response,
          date: moment().format('YYYY-MM-DD'),
          description: '',
          amount: '',
          type: '',
          category_id: '',
          payment_method: '',
          notes: '',
          loading: false,
          errors: null,
          formOpen: false
        })
      } else {
        this.setState({
          errors: response,
          loading: false
        });
      }
    })
  }

  prepData(raw) {
    return {
      description: raw.description,
      amount: raw.amount,
      transaction_type: raw.type,
      transaction_date: raw.date,
      category_id: raw.category_id,
      source: 'manual',
      payment_method: raw.payment_method,
      notes: raw.notes
    }
  }

  clearForm() {
    this.setState({
      date: moment().format('YYYY-MM-DD'),
      description: '',
      amount: '',
      type: '',
      category_id: '',
      payment_method: '',
      notes: '',
      loading: false,
      errors: null,
      formOpen: false 
    })
  }

  loadTransactions(data) {
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
                    onClick={console.log('i click')}
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
    const { date, loading, errors, transactions, formOpen } = this.state;
    const errorClass = errors ? 'is-invalid' : '';

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
                <h5>Transactions ({transactions.length})</h5>
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
              <div className="add-transaction">
                <form>
                  <div className="form-row">
                    <div className="form-group col-auto">
                      <label htmlFor="txDate">Date</label>
                      <input
                        id="txDate"
                        type="date"
                        name="date"
                        value={date}
                        min={moment().startOf('month').format('YYYY-MM-DD')}
                        max={moment().format('YYYY-MM-DD')}
                        className={`form-control ${errorClass}`}
                        onChange={this.handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="txDescription">Description</label>
                      <input id="txDescription" type="text" name="description" className={`form-control ${errorClass}`} onChange={this.handleChange} placeholder="Enter a description" required />
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="txAmount">Amount</label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">N</span>
                          <span className="input-group-text">0.00</span>
                        </div>
                        <input id="txAmount" type="number" step="0.01" name="amount" className={`form-control ${errorClass}`} onChange={this.handleChange} placeholder="" aria-label="Naira amount (with dot and two decimal places)" required />
                      </div>
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="txType">Type</label>
                      <select className="custom-select" id="txType" name="type" onChange={this.handleChange} required>
                        <option value="">Choose...</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                      </select>
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="txCategory">Category</label>
                      <select className="custom-select" id="txCategory" name="category_id" onChange={this.handleChange} required>
                        <option value="">Choose...</option>
                        <option value="1">Coffee shops</option>
                        <option value="2">Second Category</option>
                      </select>
                    </div>
                    <div className="form-group col-auto">
                      <label htmlFor="txPaymentMethod">Payment Method</label>
                      <select className="custom-select" id="txPaymentMethod" name="payment_method" onChange={this.handleChange} required>
                        <option value="">Choose...</option>
                        <option value="card">Card</option>
                        <option value="card_pos">Card POS</option>
                        <option value="card_web">Card Web</option>
                        <option value="card_mobile">Card Mobile</option>
                        <option value="cash">Cash</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="txNotes">Notes</label>
                      <textarea id="txNotes" row="4" name="notes" className={`form-control ${errorClass}`} onChange={this.handleChange} placeholder="Add a note about this transaction"></textarea>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="txNotes">Receipt</label>
                      <p><em>coming soon</em></p>
                    </div>
                  </div>

                  <div className="actions form-row">
                    <div className="btn-group col-md-6 mb-2" role="group" aria-label="cancel button">
                      <button onClick={this.clearForm} type="button" className="btn btn-secondary btn-block">
                        Cancel
                      </button>
                    </div>

                    <div className="btn-group col-md-6 mb-2" role="group" aria-label="submit button">
                      <button onClick={this._handleCreateTransaction} type="submit" className="btn btn-primary btn-fo-primary btn-block" disabled={loading}>
                        {
                          loading ? (
                            <div>
                              <Icon
                                font="EvilIcons"
                                name="spinner-2"
                                color='#ffffff'
                                size={18}
                                />
                              <span>Please wait</span>
                            </div>
                          ) : (
                            <div>Save</div>
                          )
                        }
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            ) : null
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
