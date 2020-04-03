import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AsyncSelect from 'react-select/async'
import Select from 'react-select'
import Axios from 'axios'
import { url } from '../../global'
import { withToastManager } from 'react-toast-notifications'
import { updateDiscount, getDiscount } from '../../store/actions/DiscountActions'
import Error from '../Errors/Error'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import moment from 'moment'

class EditDiscount extends Component {
    state = {
        valid_thru: undefined,
        amount: '',
        type: 'fix',
        term: '>',
        total_qty: '',
        quota: '',
        customer_id: '',
        customer_name: '',
        product_name: '',
        product_id: ''
    }

    handleChange = (name, value) => {

        this.setState({
            ...this.state,
            [name]: value
        })
    }

    handleChangeSelect = (name, e) => {

        if (e !== null) {
            this.setState({
                ...this.state,
                [`${name}_name`]: e.label,
                [`${name}_id`]: e.value
            })

        } else {
            this.setState({
                ...this.state,
                [`${name}_name`]: null,
                [`${name}_id`]: null
            })
        }
    }

    handleUpdate = () => {
        this.props.updateDiscount(this.props.match.params.id, this.state)
    }

    handleReset = () => {

        this.setState({
            ...this.state,
            valid_thru: null,
            amount: '',
            type: 'fix',
            term: '',
            total_qty: '',
            quota: '',
            customer_type: ''
        })
    }

    componentDidUpdate = (prevProps) => {
       
        const { toastManager } = this.props;
        if (prevProps.type !== this.props.type || prevProps.success !== this.props.success) {
            if (this.props.type === 'update') {
                
                if (this.props.success) {
    
                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    });
    
                    return this.props.history.push('/discount')
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }

            if (this.props.type === 'get') {

                if (this.props.success) {

                    
                    if (this.props.discount !== prevProps.discount) {
                        
                        const { discount } = this.props

                        this.setState({
                            ...this.state,
                            valid_thru: moment(discount.valid_thru).toDate(),
                            amount: discount.amount,
                            type: discount.type,
                            term: discount.term,
                            total_qty: discount.total_qty,
                            quota: discount.quota,
                            customer_id: discount.customer_type,
                            customer_name: discount.customer_type_name,
                            product_name: discount.product_name,
                            product_id: discount.product_id,
                        })
                    }
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }
        }
    }

    componentDidMount() {
        this.props.getDiscount(this.props.match.params.id)
    }

    render() {
        const { valid_thru,
            amount,
            type,
            term,
            total_qty,
            quota,
            customer_id,
            customer_name,
            product_name,
            product_id
        } = this.state

        const { fetching, error } = this.props

        const validate = error && error.data && error.data.errors

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
        <Fragment>

            <div className="row p-3">
               
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>Ubah Promo</h1>
                        </div>
                        <div className="col-md-4 text-right">
                            <Link className="btn btn-secondary" to="/discount"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                        </div>
                    </div>
                    <hr/>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label className="control-label">Barang <span className="text-danger">*</span></label>
                        <AsyncSelect isDisabled value={ product_id ? {
                            value: product_id,
                            label: product_name
                        } : null } onChange={(e) => this.handleChangeSelect('product', e)} loadOptions={getProductList} cacheOptions defaultOptions isClearable placeholder="Pilih Barang" className={`${ validate && validate.product_id ? 'is-invalid-select' : ''}`} />

                        {
                            validate && validate.product_id && (
                                <small className="text-danger">{ validate.product_id[0] }</small>
                            )
                        }
                        
                    </div>

                    <div className="form-group">
                        <label className="control-label">Tipe Pelanggan</label>
                        <Select
                        onChange={(e) => this.handleChangeSelect('customer', e)}
                        value={ customer_id ?  { value: customer_id, label: customer_name } : null }
                        options={[
                            {
                                label: 'Pengecer',
                                value: 'retailer'
                            },
                            {
                                label: 'Grosir',
                                value: 'wholesaler'
                            }
                        ]} isClearable placeholder="Pilih Tipe Pelanggan" />
                    </div>

                    <div className="row">

                        <div className="col-md-8">
                            <div className="form-group">
                                <label className="control-label">Berlaku sampai <span className="text-danger">*</span></label>
                                <DatePicker onChange={(e) => this.handleChange('valid_thru', e)} style={{display: 'block'}} placeholderText="dd/mm/yyyy" className={`form-control ${validate && validate.valid_thru ? 'is-invalid' : '' }`} selected={valid_thru} />
                                
                                {  validate && validate.valid_thru && (
                                        <div style={{display: 'flex'}} className="invalid-feedback">{ validate.valid_thru[0] }</div>
                                    )
                                }

                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">Kuota</label>
                                <NumberFormat value={quota} onValueChange={(e) => this.handleChange('quota', e.floatValue ? e.floatValue : '')} className="form-control text-right" placeholder="Kuota" />
                            </div>
                        </div>

                        <div className="col-md-12">
                            <div className="help-block text-muted">
                                *) Mengkosongkan kuota berarti promo tidak terbatas
                            </div>
                        </div>
                        
                    </div>


                </div>

                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label className="control-label">Jumlah <span className="text-danger">*</span></label>
                        <NumberFormat value={amount} onValueChange={(e) => this.handleChange('amount', e.floatValue)} className={`form-control text-right ${validate && validate.amount ? 'is-invalid' : ''}`} placeholder="Jumlah" />
                        {
                            validate && validate.amount && (
                                <div className="invalid-feedback">{ validate.amount[0] }</div>
                            )
                        }
                    </div>

                    <div className="form-group">
                        <label className="control-label">Tipe <span className="text-danger">*</span></label>
                        <select value={type} onChange={(e) => this.handleChange('type', e.target.value)} className={`form-control ${validate && validate.type ? 'is-invalid' : ''}`}>
                            <option value="fix">Tetap</option>
                            <option value="percentage">Persentase</option>
                        </select>

                        {
                            validate && validate.type && (
                                <div className="invalid-feedback">{ validate.type[0] }</div>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">Ketentuan<span className="text-danger">*</span></label>
                                <select value={term} onChange={(e) => this.handleChange('term', e.target.value)} className={`form-control ${validate && validate.term ? 'is-invalid' : ''}`}>
                                    <option value=">">Lebih dari</option>
                                    <option value="=">Sama dengan</option>
                                </select>

                                {
                                    validate && validate.term && (
                                        <div className="invalid-feedback">{ validate.term[0] }</div>
                                    )
                                }

                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="form-group">
                                <label className="control-label">Total Produk<span className="text-danger">*</span></label>
                                <NumberFormat type="text" value={total_qty} onValueChange={(e) => this.handleChange('total_qty', e.floatValue)} className={`form-control text-right ${validate && validate.total_qty ? 'is-invalid' : ''}`} placeholder="Total Produk" />
                                {
                                    validate && validate.total_qty && (
                                        <div className="invalid-feedback">{ validate.total_qty[0] }</div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-md-12 mt-2 text-right mb-5">
                    <hr/>
                    <button className={`btn btn-primary mr-2 ${fetching ? 'btn-disabled': '' }`} disabled={fetching} onClick={this.handleUpdate}>{ fetching ? <i className="mdi mdi-loading mdi-spin mr-2" /> :  <i className="mdi mdi-content-save mr-2" /> } Simpan Perubahan</button>
                    <button className="btn btn-secondary" onClick={this.handleReset}><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>

            </div>
        </Fragment>
        )
    }
}


const filterProductList = (products) => {
    const options = products.map(product => {
        return { label: product.name, value: product._id }
    })
    return appendProduct(options);
 };

const appendProduct = filteredOptions => {
    return [
      ...filteredOptions
    ];
};
   
const getProductList = (inputValue, callback) => {
     Axios.get(`${url}/product/list`, {
         params: {
             keyword: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
        callback(filterProductList(response.data.data));
     })
}

const mapStateToProps = state => {
    return {
        ...state,
        message: state.discount.message,
        fetching: state.discount.fetching,
        error: state.discount.error,
        success: state.discount.success,
        type: state.discount.type,
        discount: state.discount.discount
    }    
}

const mapDispatchToProps = dispatch => {
    return {
        updateDiscount: (id, data) => dispatch(updateDiscount(id, data)),
        getDiscount: (id) => dispatch(getDiscount(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditDiscount))
