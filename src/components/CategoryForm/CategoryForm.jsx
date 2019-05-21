import React, { Component } from 'react';
import './CategoryForm.scss';
import categories from '../../services/categories';

class CategoryForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      loading: false,
      errors: null,

      selectedParent: '',
      newParent: '',
      newCategory: '',
      categoryDescription: ''
    };

    this._loadData = this._loadData.bind(this);
    this._toggleForm = this._toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this._handleCreate = this._handleCreate.bind(this);
    this._refreshList = this._refreshList.bind(this);
    this.disableSubmit = this.disableSubmit.bind(this);
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

  _handleCreate(e) {
    e.preventDefault();
    this.setState({loading: true, errors: null});

    categories.create(this.prepData(this.state), (success, response='') => {
      if (success) {
        this._refreshList();
        this._toggleForm();
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
      parent_category_id: raw.selectedParent,
      new_parent_name: raw.newParent,
      name: raw.newCategory,
      description: raw.categoryDescription
    }
  }

  disableSubmit() {
    const { loading, newCategory, selectedParent, newParent } = this.state;
    const hasNewParent = selectedParent === 'isNew' && !newParent.length;

    return loading || !selectedParent.length || hasNewParent || !newCategory.length
  }

  render() {
    const {
      errors,
      loading,
      categories,
      selectedParent
    } = this.state;
    const errorClass = errors ? 'is-invalid' : '';

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
            (selectedParent === 'isNew') && (
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

          <div className="form-group">
            <input
              id="categoryDescription"
              type="text"
              name="categoryDescription"
              className={`form-control ${errorClass}`}
              onChange={this.handleChange}
              placeholder="Description (optional)" />
          </div>

          <div className="actions">
            <button onClick={this._handleCreateTransaction} type="submit" className="btn btn-primary btn-fo-primary btn-block" disabled={this.disableSubmit()}>
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
