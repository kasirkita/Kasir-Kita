import React, { Component, Fragment } from 'react'
import NumberFormat from 'react-number-format'
import moment from 'moment'
import { getSetting, saveSetting } from '../store/actions/SettingActions'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import Error from './Errors/Error'
import Axios from 'axios'

class Settings extends Component {

    state = {
        name: '',
        address: '',
        logo: '',
        logo_remove: false,
        logo_url: '',
        phone_number: '',
        divider: '',
        currency: '',
        thousand_separator: ',',
        decimal_separator: '.',
        printer: 'http://localhost:4000',
        tax: 0,
        loadingTestReceipt: false,
        loadingTestPrinter: false
    }

    handleChange = (name, value) => {
        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleSave = () => {
        this.props.saveSetting(this.state)
    }

    divider = (value, length = 36) => {
        let separator = []
        for (let i = 0; i < length; i++ ) {
            separator.push(value)
        }

        return separator.join('')
    }

    handleReset = () => {
        this.setState({
            ...this.state,
            name: '',
            address: '',
            logo: '',
            logo_remove: false,
            phone_number: '',
            divider: '',
            currency: '',
            thousand_separator: ',',
            decimal_separator: '.',
            printer: 'http://localhost:4000',
            tax: 0
        })

        this.uploadLogo.value = ''
    }

    componentDidUpdate = (prevProps) => {

        const { toastManager } = this.props

        if (prevProps.type !== this.props.type || prevProps.success !== this.props.success) {

            if (this.props.type === 'get') {

                if (this.props.success) {
                    const { setting } = this.props

                    if (setting) {
                        
                        this.setState({
                            name: setting.name ? setting.name : '',
                            address: setting.address ? setting.address : '',
                            logo_remove: setting.logo_remove === 'true' ? true : false,
                            logo_url: setting.logo_url ? setting.logo_url : '',
                            phone_number: setting.phone_number ? setting.phone_number : '',
                            divider: setting.divider ? setting.divider : '',
                            currency: setting.currency ? setting.currency : '',
                            thousand_separator: setting.thousand_separator ? setting.thousand_separator : '',
                            decimal_separator: setting.decimal_separator ? setting.decimal_separator : '',
                            tax: setting.tax ? setting.tax : 0,
                            printer: setting.printer ? setting.printer : 'http://localhost:4000'
                        })
                    }

                }
            }

            if (this.props.type === 'save') {

                if (this.props.success) {
    
                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    });

                } else {

                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }

            }
        }
    }

    handleTestPrinter = () => {

        const { toastManager } = this.props
        const { printer } = this.state

        Axios.get(printer).then(res => {
            toastManager.add(res.data, {
                appearance: 'success',
                autoDismiss: true
            });
        }).catch(err => {

            if(!err.response) {
                
                toastManager.add('Printer tidak tersambung', {
                    appearance: 'error',
                    autoDismiss: true
                }); 
            
            } else {

                toastManager.add(err.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true
                }); 

            }

        })
    }

    handleTesReceipt = () => {

        const { toastManager } = this.props
        // const printer = sessionStorage.getItem('printer') ? sessionStorage.getItem('printer') : 'http://localhost:4000'

        const  {
            name,
            address,
            logo_url,
            logo_remove,
            phone_number,
            divider,
            currency,
            thousand_separator
        } = this.state

        this.setState({
            ...this.state,
            loadingTestReceipt: true
        })

        Axios.post(`http://localhost:3002/preview`, {
            name,
            address,
            logo: logo_url,
            logo_remove,
            phone_number,
            divider: this.divider(divider, 30),
            cashier: sessionStorage.getItem('name'),
            date: moment(new Date()).format('DD MMM YYYY HH:mm'),
            number: '198383811001',
            carts: [
                {
                    name: 'Minuman Berenergi',
                    price: `${currency}12${thousand_separator}000`,    
                    qty: 1,
                    subtotal: `${currency}12${thousand_separator}000`,
                },
                {
                    name: 'Makanan Ringan',
                    price: `${currency}8${thousand_separator}000`,    
                    qty: 2,
                    subtotal: `${currency}16${thousand_separator}000`,
                    discount_amount: `${currency}8${thousand_separator}000`
                },
            ],
            total_discount: `${currency}8${thousand_separator}000`,
            total: `${currency}20${thousand_separator}000`,
            subtotal: `${currency}28${thousand_separator}000`,
            tax: `${currency}0`,
            payment_type: 'Tunai',
            amount: `${currency}20${thousand_separator}000`,
            change: `${currency}0`

        }).then(res => {

            toastManager.add(res.data.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.setState({
                ...this.state,
                loadingTestReceipt: false
            })

        }).catch(err => {

            if(!err.response) {
                
                toastManager.add('Printer tidak tersambung', {
                    appearance: 'error',
                    autoDismiss: true
                }); 
            
            } else {

                toastManager.add(err.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true
                }); 

            }

            this.setState({
                ...this.state,
                loadingTestReceipt: false
            })

        })
        
    }

    componentDidMount = () => {
        this.props.getSetting()
    }

    render() {

        const {
            name,
            address,
            logo,
            logo_remove,
            logo_url,
            phone_number,
            divider,
            currency,
            thousand_separator,
            decimal_separator,
            tax,
            printer,
            loadingTestReceipt
        } = this.state

        const {
            fetching,
            error
        } = this.props

        const validate = error && error.data && error.data.errors

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
            <Fragment>
               <div className="row p-3"> 
                    <div className="col-md-12">
                        <h1>Pengaturan</h1>
                        <hr/>
                    </div>
                    <div className="col-md-12">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className="nav-item nav-link active" id="nav-general" data-toggle="tab" href="#general" role="tab" aria-controls="general" aria-selected="true">Umum</a>
                                <a className="nav-item nav-link" id="nav-other" data-toggle="tab" href="#other" role="tab" aria-controls="other" aria-selected="false">Lainnya</a>
                            </div>
                        </nav>
                        <div className="tab-content mt-5" id="nav-tabContent">
                            <div className="tab-pane fade show active" id="general" role="tabpanel" aria-labelledby="nav-general">
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="control-label">Nama Toko</label>
                                            <input type="text" value={name} onChange={(e) => this.handleChange('name', e.target.value)} placeholder="Nama Toko" className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">Alamat Toko</label>
                                            <textarea type="text" value={address} onChange={(e) => this.handleChange('address', e.target.value)} placeholder="Gunakan enter untuk garis baru" className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">Logo</label>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <input accept="image/jpg, image/png" type="file" ref={ ref => this.uploadLogo = ref } onChange={(e) => this.handleChange('logo', e.target.files[0])} className="form-control" />
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-check">
                                                        <input className="form-check-input" checked={logo_remove} onChange={(e) => this.handleChange('logo_remove', e.target.checked)} type="checkbox" id="removeImage" />
                                                        <label className="form-check-label" htmlFor="removeImage">
                                                            Hapus Logo
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">Nomor Telepon Toko</label>
                                            <input type="text" value={phone_number} onChange={(e) => this.handleChange('phone_number', e.target.value)} placeholder="Nomor Telepon Toko" className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">Garis Pembatas</label>
                                            <input type="text" value={divider} onChange={(e) => this.handleChange('divider', e.target.value)} placeholder="Garis Pembatas Struk" className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label className="control-label">Mata Uang</label>
                                            <input type="text" value={currency} onChange={(e) => this.handleChange('currency', e.target.value)} placeholder="Mata Uang" className="form-control" />
                                        </div>

                                        <div className="form-group">
                                            <label className="label-control">Separator Ribuan</label>
                                            <input type="text" value={thousand_separator} onChange={(e) => this.handleChange('thousand_separator', e.target.value)} placeholder="Separator Ribuan" className={`form-control ${ validate && validate.thousand_separator && 'is-invalid'}`} />
                                            {
                                                validate && validate.thousand_separator && (
                                                    <div className="invalid-feedback">{ validate.thousand_separator[0] }</div>
                                                )
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label className="label-control">Separator Desimal</label>
                                            <input type="text" value={decimal_separator} onChange={(e) => this.handleChange('decimal_separator', e.target.value)} placeholder="Separator Desimal" className={`form-control ${ validate && validate.decimal_separator && 'is-invalid'}`} />
                                            {
                                                validate && validate.decimal_separator && (
                                                    <div className="invalid-feedback">{ validate.decimal_separator[0] }</div>
                                                )
                                            }
                                        </div>

                                    </div>
                                    <div className="col-md-4">
                                        <p>Hasil Struk</p>
                                        <div className="receipt pb-5">
                                            <h5 className="text-center m-0">{name}</h5>
                                            <p className="text-center m-0">
                                                {
                                                    !logo_remove &&  <img src={ logo ? URL.createObjectURL(logo) : logo_url ? logo_url : require('../assets/img/logo.png')} width="200" alt="Toko Sukamakmur" style={{filter: 'grayscale(1)'}} /> 
                                                }
                                            </p>
                                            <p className="text-center m-0">
                                            { address && address.split('\n').map((item, key) => {
                                                return <Fragment key={key}>{item}<br/></Fragment>
                                            })}
                                            </p>
                                            <p className="text-center m-0">{phone_number && `Telp. ${phone_number}`}</p>
                                            <br />
                                            <div className="d-flex justify-content-between">
                                                <div>Nomor</div>
                                                <div>198383811001</div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Tanggal/Waktu</div>
                                                <div>{moment(new Date()).format('DD MMM YYYY HH:mm')}</div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Kasir</div>
                                                <div>{sessionStorage.getItem('name')}</div>
                                            </div>
                                            <p className="text-center m-0">
                                                { this.divider(divider) }
                                            </p>
                                            <p className="m-0">Minuman Berenergi</p>
                                            <div className="d-flex justify-content-between">
                                                <div>x1 <NumberFormat allowedDecimalSeparators={[',', '.']} prefix={currency} value={12000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                                <div><NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={12000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <p className="m-0">Makanan Ringan</p>
                                            <div className="d-flex justify-content-between">
                                                <div>x2 <NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={8000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                                <div><NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={16000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Diskon</div>
                                                <div>-<NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={8000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <p className="text-center m-0">{ this.divider(divider) }</p>
                                            <div className="d-flex justify-content-between">
                                                <div>Subtotal</div>
                                                <div><NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={28000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Pajak</div>
                                                <div><NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={0} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Total Diskon</div>
                                                <div><NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={8000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Total</div>
                                                <div><NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={20000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Tunai</div>
                                                <div><NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={20000} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <div>Kembalian</div>
                                                <div><NumberFormat prefix={currency} allowedDecimalSeparators={[',', '.']} value={0} thousandSeparator={thousand_separator} decimalSeparator={decimal_separator !== thousand_separator ? decimal_separator : thousand_separator === ',' ? '.' : ',' } displayType="text" /></div>
                                            </div>
                                            <p className="text-center m-0">{ this.divider(divider) }</p>
                                            <br />
                                            <p className="m-0 text-center">Terimakasih Telah Berkunjung</p>
                                            <p className="m-0 text-center">Dibuat oleh Kasir Kita</p>

                                        </div>
                                        <button className={`btn btn-primary mr-2 mt-2 ${loadingTestReceipt ? 'btn-disabled': '' }`} disabled={loadingTestReceipt} onClick={this.handleTesReceipt}>{ loadingTestReceipt ? <i className="mdi mdi-loading mdi-spin mr-2" /> :  <i className="mdi mdi-printer mr-2 mr-2" /> } Tes Struk</button>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="other" role="tabpanel" aria-labelledby="nav-other">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h2>Pajak</h2>
                                        <div className="form-group">
                                            <label className="control-label">PPN</label>
                                            <div className="input-group mb-3">
                                                <NumberFormat placeholder="Persentase" value={tax} onValueChange={(e) => this.handleChange('tax', e.floatValue)} className="form-control" />
                                                <div className="input-group-append">
                                                    <span className="input-group-text">%</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-md-12 mt-2 text-right mb-5">
                                <hr/>
                                <button className={`btn btn-primary mr-2 ${fetching ? 'btn-disabled': '' }`} disabled={fetching} onClick={this.handleSave}>{ fetching ? <i className="mdi mdi-loading mdi-spin mr-2" /> :  <i className="mdi mdi-content-save mr-2" /> } Simpan</button>
                                <button className="btn btn-secondary" onClick={this.handleReset}><i className="mdi mdi-reload mr-2"></i>Reset</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        setting: state.setting.setting,
        message: state.setting.message,
        fetching: state.setting.fetching,
        fetched: state.setting.fetched,
        success: state.setting.success,
        type: state.setting.type,
        error: state.setting.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSetting: () => dispatch(getSetting()),
        saveSetting: (data) => dispatch(saveSetting(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Settings))
