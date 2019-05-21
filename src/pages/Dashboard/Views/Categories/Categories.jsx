import React, { Component } from 'react';
import './Categories.scss';
import Icon from 'react-web-vector-icons';
import categories from '../../../../services/categories';
import FormattersHelpers from '../../../../helpers/formatter_helpers';
import CategoryForm from '../../../../components/CategoryForm';
import StringHelpers from '../../../../helpers/string_helpers';

class Categories extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formOpen: false,
      fetchingData: false,
      categories: [],
      errors: null
    }

    this._fetchData = this._fetchData.bind(this);
    this.buildList = this.buildList.bind(this);
    this.handleToggleForm = this.handleToggleForm.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  handleToggleForm() {
    this.setState(prevState => ({
      formOpen: !prevState.formOpen
    }))
  }

  _fetchData() {
    this.setState({
      fetchingData: true, errors: null
    });

    categories.getAll((success, response) => {
      if (success) {
        this.setState({
          fetchingData: false,
          categories: response
        })
      } else {
        this.setState({
          fetchingData: false,
          errors: response
        })
      }
    })
  }

  buildList(data, formOpen) {
    data = data || [];

    if (!data.length) {
      return (
        <div className="text-center text-muted">
          <p>You have no categories.{formOpen ? '' : ' Click "Add New" to add one.'}</p>
        </div>
      )
    }

    const list = data.map((item, index) => (
      <div className="card" key={index}>
        <div className="card-header d-flex align-items-center justify-content-between" id={`heading${index}`} data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
          { StringHelpers.sentenceCase(item.parent_category.name) }

          <div>
            <span className="badge badge-info badge-pill mr-3">{item.categories.length}</span>
            <Icon
              font="Entypo"
              name="chevron-thin-down"
              color='#929292'
              size={15}
            />
          </div>
        </div>

        <div id={`collapse${index}`} className="collapse" aria-labelledby={`heading${index}`} data-parent="#accordionCategories">
          <div className="card-body">
            { this.buildSubList(item.categories) }
          </div>
        </div>
      </div>
    ))

    return (
      <div className="accordion" id="accordionCategories">
        {list}
      </div>
    )
  }

  buildSubList(data) {
    if (!data.length) return;

    return data.map((item, index) => (
      <span key={index} className="badge badge-pill badge-light">{ item.name }</span>
    ))
  }

  render() {
    const { formOpen, errors, fetchingData, categories } = this.state;

    console.log(this.state)

    return (
      <section className="all-categories fo-section">
        <div className="header mb-3">
          <div className="">
            <h5>Categories</h5>
          </div>

          <div className="text-right">
            <button type="button" className={`btn btn-sm ${formOpen ? 'btn-light' : 'btn-secondary'}`} onClick={this.handleToggleForm}>
              <div className="d-sm-block d-md-none">
                { formOpen ? (
                  <Icon
                    font="AntDesign"
                    name="close"
                    color='#212529'
                    size={15}
                  />
                ) : (
                  <Icon
                    font="AntDesign"
                    name="plus"
                    color='#ffffff'
                    size={15}
                  />
                ) }
              </div>
              <span className="d-none d-sm-none d-md-block">
                { formOpen ? 'Cancel' : 'Add New' }
              </span>
            </button>
          </div>
        </div>

        {
          formOpen ? (
            <CategoryForm
              allCategories={categories}
              refresh={this._fetchData}
              toggleForm={this.handleToggleForm} />
          ) : null
        }

        {
          errors ? (
            <div>{FormattersHelpers.formatErrors(errors)}</div>
          ): null
        }

        <div className="categories-list">
          {
            fetchingData ? (
              <div className="text-center">
                <div className="spinner-grow text-primary" role="status" aria-hidden="true">
                  <span className="sr-only">Loading categories...</span>
                </div>
              </div>
            ) : (
              <div>
                { this.buildList(categories, formOpen) }
              </div>
            )
          }
        </div>
      </section>
    )
  }
}

export default Categories;
