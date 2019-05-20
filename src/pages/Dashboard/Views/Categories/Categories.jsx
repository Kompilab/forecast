import React, { Component } from 'react';
import './Categories.scss';
import userAuth from '../../../../services/authenticate';
import Icon from 'react-web-vector-icons';

class Categories extends Component {
  constructor(props) {
    super(props)

    this.state = {
      formOpen: false
    }

    this.handleToggleForm = this.handleToggleForm.bind(this);
  }

  handleToggleForm() {
    this.setState(prevState => ({
      formOpen: !prevState.formOpen
    }))
  }

  render() {
    const { formOpen } = this.state;

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
      </section>
    )
  }
}

export default Categories;
