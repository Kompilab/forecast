import React, { Component } from 'react';
import './UploadForm.scss';
import FormattersHelpers from '../../helpers/formatter_helpers';
import bankStatements from '../../services/bank_statements';

class UploadForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      supportedBanks: [],
      loading: false,
      errors: null,

      formErrors: null,
      selectedBank: '',
      uploadedFile: null,
      filePassword: ''
    };

    this._loadData = this._loadData.bind(this);
    this._toggleForm = this._toggleForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFileChange = this.handleOnFileChange.bind(this);
    this._refreshList = this._refreshList.bind(this);
    this.disableUpload = this.disableUpload.bind(this);
    this._handleFileUpload = this._handleFileUpload.bind(this);
  }

  componentDidMount() {
    this._loadData()
  }

  _loadData() {
    if (this.props.supportedBanks) {
      this.setState({
        supportedBanks: this.props.supportedBanks
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

  handleOnFileChange(e) {
    this.setState({
      [e.target.name]: e.target.files[0]
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
        this._refreshList();
        this._toggleForm();
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

  render() {
    const {
      uploading,
      formErrors,
      uploadedFile,
      selectedBank,
      supportedBanks
    } = this.state;
    let allowedFormats = '';

    if (selectedBank) {
      allowedFormats = supportedBanks[selectedBank].formats
    }
    // const errorClass = errors ? 'is-invalid' : '';

    return (
      <section className="upload mb-5 container-fluid">
        <div className="row">
          <div className="col-12 summary-card p-3">
            <h5 className="mb-2">Upload bank statement</h5>

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
    )
  }
}

export default UploadForm;
