import React, { Component } from 'react';
import './BankStatements.scss';
import FormattersHelpers from '../../../../helpers/formatter_helpers';
import globalRequests from '../../../../services/global';
import bankStatements from '../../../../services/bank_statements';
import moment from 'moment';
import gtbImg from '../../../../assets/images/banks/gtbank.jpg';
import accessImg from '../../../../assets/images/banks/accessbank.png';
import ubaImg from '../../../../assets/images/banks/uba.png';
import ecobankImg from '../../../../assets/images/banks/ecobank.png';
import firstbankImg from '../../../../assets/images/banks/firstbank-square.png';
import heritagebankImg from '../../../../assets/images/banks/heritage-bank.jpeg';
import DateHelpers from '../../../../helpers/date_helpers';

class BankStatements extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bankStatements: [],
      supportedBanks: [],
      loading: false,
      errors: null,
      uploading: false,

      formErrors: null,
      selectedBank: '',
      uploadedFile: null,
      filePassword: ''
    };

    this._fetchData = this._fetchData.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFileChange = this.handleOnFileChange.bind(this);
    this.loadStatements = this.loadStatements.bind(this);
    this.disableUpload = this.disableUpload.bind(this);
    this._handleFileUpload = this._handleFileUpload.bind(this);
  }

  componentDidMount() {
    this._fetchData()
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnFileChange(e) {
    this.setState({
      [e.target.name]: e.target.files[0]
    })
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

  _handleFileUpload(e) {
    e.preventDefault();
    this.setState({uploading: true, formErrors: null});
    const formatData = this.prepData(this.state)

    const data = new FormData();
    data.append('import[file]', formatData.file)
    data.append('import[bank_key]', formatData.bank_key)
    data.append('import[password]', formatData.password)

    bankStatements.upload(data, (success, response='') => {
      if (success) {
        this.setState({
          uploading: false,
          selectedBank: '',
          uploadedFile: null,
          filePassword: ''
        });
        this._fetchData();
      } else {
        this.setState({
          formErrors: response,
          uploading: false
        });
      }
    })
  }

  prepData(raw) {
    return {
      bank_key: raw.supportedBanks[raw.selectedBank].key,
      file: raw.uploadedFile,
      password: raw.filePassword
    }
  }

  disableUpload() {
    const { uploading, selectedBank, uploadedFile } = this.state;

    return uploading || !selectedBank || !uploadedFile
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
              <div className="col-6 text-right">N 0.00</div>
            </div>

            <div className="row debit">
              <div className="col-6">Debits:</div>
              <div className="col-6 text-right">N 0.00</div>
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
    const { loading, bankStatements, errors, supportedBanks, selectedBank, uploadedFile, uploading, formErrors } = this.state;
    let allowedFormats = '';

    if (selectedBank) {
      allowedFormats = supportedBanks[selectedBank].formats
    }

    console.log(this.state)

    return (
      <div>
        <section className="upload mb-5 container-fluid">
          <div className="row">
            <div className="col-12 summary-card p-3">
              <h5>Upload bank statement</h5>

              {
                formErrors ? (
                  <div>{FormattersHelpers.formatErrors(formErrors)}</div>
                ): null
              }

              <form className="upload-form">
                <div className="form-row">
                  <div className="col-sm-4">
                    <select className="custom-select mb-2" id="bankSelect" name="selectedBank" onChange={this.handleChange} required>
                      <option value="">Choose your bank</option>
                      {
                        supportedBanks && supportedBanks.map((bank, index) => {
                          return <option value={index} key={index}>{bank.name}</option>
                        })
                      }
                    </select>
                    { selectedBank && <small id="bankHelp" className="form-text text muted mb-2">Allowed file formats for this bank: {allowedFormats}</small> }
                  </div>
                  <div className="col-sm-4">
                    <div className="input-group mb-2">
                      <div className="custom-file">
                        <input name="uploadedFile" type="file" accept=".pdf,.xls,.xlsx" className="custom-file-input" id="chooseStatementFile" onChange={this.handleOnFileChange} aria-describedby="inputGroupFileAddonBankStatement" />
                        <label className="custom-file-label" htmlFor="chooseStatementFile">
                          { (uploadedFile === undefined || uploadedFile === null) || (uploadedFile && !uploadedFile.name) ? 'Choose file' : (uploadedFile && uploadedFile.name) }</label>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group mb-2">
                      <input id="filePassword" type="password" name="filePassword" className="form-control" onChange={this.handleChange} placeholder="File password (optional)" />
                    </div>
                  </div>
                </div>

                <div className="actions my-3 text-center">
                  <button onClick={this._handleFileUpload} type="submit" className="btn btn-primary btn-fo-primary" disabled={this.disableUpload()}>
                    {
                      uploading ? (
                        <div>
                          <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                          Uploading...
                        </div>
                      ) : (
                        <div>Upload</div>
                      )
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        <section className="all-statements fo-section mb-3">
          <div className="header mb-3">
            <div className="">
              <h5>Bank Statements <span className="badge badge-light">{bankStatements && bankStatements.length}</span></h5>
            </div>
          </div>

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
