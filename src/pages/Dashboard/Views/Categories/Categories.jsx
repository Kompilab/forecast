import React, { Component } from 'react';
import './Categories.scss';
import Icon from 'react-web-vector-icons';
import categories from '../../../../services/categories';
import FormattersHelpers from '../../../../helpers/formatter_helpers';

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
      <div class="card" key={index}>
        <div class="card-header" id={`heading${index}`} data-toggle="collapse" data-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
          {item.parent_category.name}
        </div>

        <div id={`collapse${index}`} class="collapse" aria-labelledby={`heading${index}`} data-parent="#accordionCategories">
          <div class="card-body">
            Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
          </div>
        </div>
      </div>
    ))

    return (
      <div class="accordion" id="accordionCategories">
        {list}
      </div>
    )
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
