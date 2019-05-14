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
      category_id: '',
      payment_method: '',
      notes: ''
    };

    this._fetchData = this._fetchData.bind(this);
    this.clearForm = this.clearForm.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this._handleCreateTransaction = this._handleCreateTransaction.bind(this);
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

  render() {
    const { date, loading, errors, categories, paymentMethods } = this.state;
    const errorClass = errors ? 'is-invalid' : '';

    console.log('==> TransactionForm: ', this.state)

    return (
      <div className="add-transaction">
        <form className="transaction-form">
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
              <div className="dropdown">
                <button className="btn btn-light dropdown-toggle" type="button" id="txCategoryDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Choose...
                </button>
                <div className="dropdown-menu" aria-labelledby="txCategoryDropdown">
                  {
                    categories && categories.map((category, i) => {
                      return (
                        <div key={i}>
                        <h6 className="dropdown-header">{category.parent_category.name}</h6>
                        <a className="dropdown-item" href="#">Action</a>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
            <div className="form-group col-auto">
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
                Clear
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
    )
  }
}

export default TransactionForm;
