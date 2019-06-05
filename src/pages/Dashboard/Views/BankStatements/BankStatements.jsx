import React, { Component } from 'react';
import './BankStatements.scss';
import FormattersHelpers from '../../../../helpers/formatter_helpers';
import globalRequests from '../../../../services/global';
import moment from 'moment';
import gtbImg from '../../../../assets/images/banks/gtbank.jpg';
import accessImg from '../../../../assets/images/banks/accessbank.png';
import ubaImg from '../../../../assets/images/banks/uba.png';
import ecobankImg from '../../../../assets/images/banks/ecobank.png';
import firstbankImg from '../../../../assets/images/banks/firstbank-square.png';
import heritagebankImg from '../../../../assets/images/banks/heritage-bank.jpeg';
import DateHelpers from '../../../../helpers/date_helpers';
import Icon from 'react-web-vector-icons';
import UploadForm from '../../../../components/UploadForm/UploadForm';

class BankStatements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankStatements: [],
      supportedBanks: [],
      loading: false,
      errors: null,
      formOpen: false,
    };

    this._fetchData = this._fetchData.bind(this);
    this.handleToggleForm = this.handleToggleForm.bind(this);
    this.loadStatements = this.loadStatements.bind(this);
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
    this.setState({loading: true});

    globalRequests.initBankStatements((success, responses ) => {
      this.setState({
        loading: false
      });

      if (success) {
        for(let i=0; i < responses.length; i++) {
          let states = ['supportedBanks', 'bankStatements'];

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

  loadStatements(data) {
    data = data || [];

    if (!data.length) {
      return (
        <div className="text-center text-muted">
          <p>You have no bank statements</p>
        </div>
      )
    }

    return data.map((s, index) => (
      <div key={index} className="col-sm-6 col-md-4 col-lg-4 col-xl-3 mb-3">
        <div className="statement-card">
          <div className="bank-details">
            <h6>{s.bank_name}</h6>
            <div className="date-range">
              <span className="badge badge-light">{moment(s.from_date).format('ll')}</span> to <span className="badge badge-light">{moment(s.to_date).format('ll')}</span>
            </div>
            <div>
              {s.transactions.length} transaction{ s.transactions.length === 1 ? '' : 's'}
            </div>

            <div className="bank-img">
              <img src={this.mapBankImages(s.bank_key)} alt={s.bank_key} />
            </div>
          </div>

          <div className="owner-details my-4">
            <h6>{s.account_name}</h6>
            <p>******{s.account_number}</p>
          </div>

          <hr />

          <div className="summary">
            <div className="row credit">
              <div className="col-6">Credits:</div>
              <div className="col-6 text-right" dangerouslySetInnerHTML={{ __html: FormattersHelpers.formatAmount(s.total_credits) }}></div>
            </div>

            <div className="row debit">
              <div className="col-6">Debits:</div>
              <div className="col-6 text-right" dangerouslySetInnerHTML={{ __html: FormattersHelpers.formatAmount(s.total_debits) }}></div>
            </div>
          </div>

          <div className="uploaded-meta mt-3">
            uploaded {DateHelpers.calendar(s.created_at)}
          </div>
        </div>
      </div>
    ))
  }

  mapBankImages(key) {
    const images = {
      gtb: gtbImg,
      accessbank: accessImg,
      uba: ubaImg,
      firstbank: firstbankImg,
      hb: heritagebankImg,
      ecobank: ecobankImg
    }

    return images[key]
  }

  render() {
    const {
      errors,
      loading,
      formOpen,
      bankStatements,
      supportedBanks
    } = this.state;

    return (
      <div>
        <section className="all-statements fo-section mb-3">
          <div className="header mb-3">
            <div className="">
              <h5>Bank Statements <span className="badge badge-light">{bankStatements && bankStatements.length}</span></h5>
            </div>

            <div className="text-right">
              <button type="button" className={`btn btn-sm ${formOpen ? 'btn-light' : 'btn-fo-primary btn-primary'}`} onClick={this.handleToggleForm}>
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
                      font="Feather"
                      name="upload"
                      color='#ffffff'
                      size={15}
                    />
                  ) }
                </div>
                <span className="d-none d-sm-none d-md-block">
                  { formOpen ? 'Cancel' : 'Upload' }
                </span>
              </button>
            </div>
          </div>

          {
            formOpen ? (
              <UploadForm
                supportedBanks={supportedBanks}
                toggleForm={this.handleToggleForm}
                refresh={this._fetchData}
              />
            ) : null
          }

          {
            errors ? (
              <div>{FormattersHelpers.formatErrors(errors)}</div>
            ): null
          }

          <div className="statements-list">
            {
              loading ? (
                <div className="text-center">
                  <div className="spinner-grow text-primary" role="status" aria-hidden="true">
                    <span className="sr-only">Loading statements...</span>
                  </div>
                </div>
              ) : (
                <div className="container-fluid px-0">
                  <div className="row">
                    { this.loadStatements(bankStatements) }
                  </div>
                </div>
              )
            }
          </div>
        </section>
      </div>
    )
  }
}

export default BankStatements;
