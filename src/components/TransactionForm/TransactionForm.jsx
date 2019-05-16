import React, { Component } from 'react';
import './TransactionForm.scss';
import Icon from 'react-web-vector-icons';
import moment from 'moment';
import transactions from '../../services/transactions';
import globalRequests from '../../services/global';
import StringHelpers from '../../helpers/string_helpers';

class TransactionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      paymentMethods: [],
      loading: false,
      errors: null,
      formOpen: false,

      date: moment().format('YYYY-MM-DD'),
      description: '',
      amount: '',
      type: '',
      selectedCategory: {},
      payment_method: '',
      notes: ''
    };

    this._fetchData = this._fetchData.bind(this);
    this._toggleForm = this._toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnCategoryChange = this.handleOnCategoryChange.bind(this);
    this._handleCreateTransaction = this._handleCreateTransaction.bind(this);
    this._refreshTransactions = this._refreshTransactions.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  _fetchData() {
    this.setState({loading: true});

    globalRequests.initTransactionFormData((success, responses ) => {
      this.setState({
        loading: false
      });

      if (success) {
        for(let i=0; i < responses.length; i++) {
          let states = ['categories', 'paymentMethods'];

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

  _refreshTransactions() {
    if (this.props.refreshTransactions) {
      this.props.refreshTransactions()
    }
  }

  _toggleForm() {
    if (this.props.toggleForm) {
      this.props.toggleForm()
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnCategoryChange(category) {
    this.setState({
      selectedCategory: category
    })
  }

  _handleCreateTransaction(e) {
    e.preventDefault();
    this.setState({loading: true, errors: null});

    transactions.create(this.prepData(this.state), (success, response='') => {
      if (success) {
        this._refreshTransactions();
        this._toggleForm();

        console.log('success===> ', response);
        this.setState({
          loading: false,
          errors: null
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
      category_id: raw.selectedCategory.id,
      source: 'manual',
      payment_method: raw.payment_method,
      notes: raw.notes
    }
  }

  render() {
    const { date, loading, errors, categories, selectedCategory, paymentMethods } = this.state;
    const errorClass = errors ? 'is-invalid' : '';

    console.log('==> TransactionForm: ', this.state)

    return (
      <div className="add-transaction mb-3">
        <form className="transaction-form">
          <div className="form-row">
            <div className="col-md-6">
              <div className="form-group">
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

              <div className="form-group">
                <label htmlFor="txDescription">Description</label>
                <input id="txDescription" type="text" name="description" className={`form-control ${errorClass}`} onChange={this.handleChange} placeholder="Enter a description" required />
              </div>

              <div className="form-group">
                <label htmlFor="txAmount">Amount</label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">&#x20a6;</span>
                  </div>
                  <input id="txAmount" type="number" step="0.01" name="amount" className={`form-control ${errorClass}`} onChange={this.handleChange} placeholder="" aria-label="Naira amount (with dot and two decimal places)" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="txNotes">Notes</label>
                <textarea id="txNotes" row="4" name="notes" className={`form-control ${errorClass}`} onChange={this.handleChange} placeholder="Add a note about this transaction"></textarea>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="txType">Type</label>
                <select className="custom-select" id="txType" name="type" onChange={this.handleChange} required>
                  <option value="">Choose...</option>
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="txCategory">Category</label>
                <div className="dropdown">
                  <button className="select-dropdown btn btn-light btn-block text-left dropdown-toggle" type="button" id="txCategoryDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    { !!Object.keys(selectedCategory).length ? selectedCategory.name : 'Choose...' }
                  </button>
                  <div className="dropdown-menu dropdown-menu-left" aria-labelledby="txCategoryDropdown">
                    {
                      categories && categories.map((category, index) => {
                        return (
                          <li key={index} className="dropdown-submenu">
                            <div className="dropdown-item" tabIndex="-1">{category.parent_category.name}</div>
                            <ul className="dropdown-menu dropdown-menu-right">
                              {
                                category.categories.map((c, i) => {
                                  return (
                                    <li key={i}>
                                      <div className="dropdown-item" tabIndex="-1" onClick={() => this.handleOnCategoryChange(c)}>{c.name}</div>
                                    </li>
                                  )
                                })
                              }
                            </ul>
                          </li>
                        )
                      })
                    }
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="txPaymentMethod">Payment Method</label>
                <select className="custom-select" id="txPaymentMethod" name="payment_method" onChange={this.handleChange} required>
                  <option value="">Choose...</option>
                  {
                    paymentMethods && paymentMethods.map((m, i) => {
                      return <option value={m} key={i}>{StringHelpers.sentenceCase(m)}</option>
                    })
                  }
                </select>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="txNotes">Receipt</label>
                <p><em>coming soon</em></p>
              </div>
            </div>
          </div>

          <div className="actions">
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
        </form>
      </div>
    )
  }
}

export default TransactionForm;
