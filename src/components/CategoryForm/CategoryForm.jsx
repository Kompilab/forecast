import React, { Component } from 'react';
import './CategoryForm.scss';
import moment from 'moment';
import transactions from '../../services/transactions';
import globalRequests from '../../services/global';
import StringHelpers from '../../helpers/string_helpers';

class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      loading: false,
      errors: null,
      formOpen: false,

      selectedParent: '',
      newParent: '',
      newCategory: ''
    };

    this._loadData = this._loadData.bind(this);
    this._toggleForm = this._toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._handleCreateTransaction = this._handleCreateTransaction.bind(this);
    this._refreshList = this._refreshList.bind(this);
  }

  componentDidMount() {
    this._loadData()
  }

  _loadData() {
    if (this.props.allCategories) {
      this.setState({
        categories: this.props.allCategories
      })
    }
  }

  _refreshList() {
    if (this.props.refresh) {
      this.props.refresh()
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

  _handleCreateTransaction(e) {
    // e.preventDefault();
    // this.setState({loading: true, errors: null});

    // transactions.create(this.prepData(this.state), (success, response='') => {
    //   if (success) {
    //     this._refreshTransactions();
    //     this._toggleForm();
    //   } else {
    //     this.setState({
    //       errors: response,
    //       loading: false
    //     });
    //   }
    // })
  }

  prepData(raw) {
    return {
      description: raw.description,
      amount: raw.amount,
      transaction_type: raw.type,
      transaction_date: raw.date,
      category_id: raw.selectedCategoryId,
      source: 'manual',
      payment_method: raw.paymentMethod,
      notes: raw.notes
    }
  }

  render() {
    const {
      errors,
      loading,
      categories,
      newCategory,
      selectedParent
    } = this.state;
    const errorClass = errors ? 'is-invalid' : '';

    console.log('==> CategoryForm: ', this.state)

    return (
      <div className="add-category mb-3">
        <form className="category-form">
          <div className="form-group">
            <select className="custom-select" id="parentCategory" name="selectedParent" onChange={this.handleChange} required>
              <option value="">Choose parent...</option>
              <option value="isNew">New Parent Category</option>
              {
                categories && categories.map((parent, index) => {
                  return <option value={parent.parent_category.id} key={index}>{parent.parent_category.name}</option>
                })
              }
            </select>
          </div>

          {
            (selectedParent == 'isNew') && (
              <div className="form-group">
                <input
                  id="newParentName"
                  type="text"
                  name="newParent"
                  className={`form-control ${errorClass}`}
                  onChange={this.handleChange}
                  placeholder="Enter a new parent" required />
              </div>
            )
          }

          <div className="form-group">
            <input
              id="categoryName"
              type="text"
              name="newCategory"
              className={`form-control ${errorClass}`}
              onChange={this.handleChange}
              placeholder="Enter a new category" required />
          </div>

          <div className="actions">
            <button onClick={this._handleCreateTransaction} type="submit" className="btn btn-primary btn-fo-primary btn-block" disabled={loading || !newCategory.length}>
              {
                loading ? (
                  <div>
                    <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    Saving...
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

export default CategoryForm;
