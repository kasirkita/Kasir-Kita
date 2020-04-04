import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AsyncSelect from 'react-select/async'
import { updateExpense, getExpense } from '../../store/actions/ExpenseActions'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import FormatNumber from '../../components/FormatNumber'
import Error from '../Errors/Error'
import Axios from 'axios'
import { url } from '../../global'
import  moment from 'moment'

class EditExpense extends Component {

    state = {
        payment_date: new Date(),
        number: '',
        supplier_name: '',
        product_name: '',
        price: '',
        qty: '',
        in_charge_id: '',
        in_charge_name: '',
        notes: '',
        user: '',
    }

    changeDate = (name, date) => {
        this.setState({
            ...this.state,
            [name]: date
        })
    }

    handleChangeNumber = name => e => {
        this.setState({
            ...this.state,
            [name]: e.floatValue
        })
    }

    handleChangeSelect = (name) => (e) => {

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
    
    handleReset = () => {

        this.setState({
            ...this.state,
            payment_date: new Date(),
            number: '',
            supplier_name: '',
            product_name: '',
            price: '',
            qty: '',
            in_charge_id: '',
            in_charge_name: '',
            notes: '',
            user: '',
        })

        this.evidence.value = ""
    }

    handleChangeFile = (name) => (e) => {
        const file = e.target.files[0];
        
        this.setState({
            ...this.state,
            [name]: file
        })
    }
    
    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleUpdate = () => {
        this.props.updateExpense(this.props.match.params.id, this.state)
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
                    
                    
                    this.props.history.push('/expense')
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }

            if (this.props.type === 'get') {

                if (this.props.success) {

                    
                    if (this.props.expense !== prevProps.expense) {
                        
                        const { expense } = this.props

                        this.setState({
                            ...this.state,
                            payment_date: moment(expense.payment_date).toDate(),
                            number: expense.number,
                            supplier_name: expense.supplier_name,
                            product_name: expense.product_name,
                            price: expense.price,
                            qty: expense.qty,
                            in_charge_id: expense.in_charge_id,
                            in_charge_name: expense.in_charge_name,
                            notes: expense.notes,
                            user: expense.user
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

    componentWillMount = () => {
        this.props.getExpense(this.props.match.params.id)
    }

    render() {
        const { 
            payment_date,
            number,
            supplier_name,
            product_name,
            price,
            qty,
            in_charge_id,
            in_charge_name,
            notes,
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
                            <h1>Tambah Pembelian Barang</h1>
                        </div>
                        <div className="col-md-4 text-right">
                            <Link className="btn btn-secondary" to="/expense"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                        </div>
                    </div>
                    <hr/>
                </div>

                <div className="col-md-6 mt-3">
                <div className="form-group">
                        <label className="control-label">Nomor Referensi <span className="text-danger">*</span></label>
                        <input value={number} onChange={this.handleChange('number')} type="text" className={`form-control ${validate && validate.number ? 'is-invalid' : ''}`} placeholder="Nomor Referensi" />
                        {
                            validate && validate.number  && (
                                <div className="invalid-feedback">{ validate.number[0] }</div>
                            )
                        }
                    </div>

                    <div className="form-group">
                        <label className="control-label">Tanggal Pembelian <span className="text-danger">*</span></label>
                        <DatePicker style={{display: 'block'}} className={`form-control ${validate && validate.payment_date ? 'is-invalid' : ''}`} selected={payment_date} onChange={date => this.changeDate('payment_date', date)} />
                        {  validate && validate.payment_date && (
                                <div style={{display: 'flex'}} className="invalid-feedback">{ validate.payment_date[0] }</div>
                            )
                        }
                    </div>

                    <div className="form-group">
                        <label className="control-label">Nama Toko / Pemasok</label>
                        <input value={supplier_name} onChange={this.handleChange('supplier_name')} type="text" className="form-control" placeholder="Nama Toko / Pemasok" />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Bukti</label>
                        <input accept=".jpg, .png, .pdf" ref={ref => this.evidence = ref} onChange={this.handleChangeFile('evidence')} type="file" className="form-control"/>
                        <span className="help-block text-muted">*) Format .jpg, .png, .pdf</span>
                    </div>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label className="control-label">Nama Barang <span className="text-danger">*</span></label>
                        <input value={product_name} onChange={this.handleChange('product_name')} type="text" className="form-control" placeholder="Nama Barang" />
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <div className="form-group">
                                <label className="control-label">Harga <span className="text-danger">*</span></label>
                                <FormatNumber value={price} handleChangeNumber={this.handleChangeNumber('price')} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <label className="control-label">Qty <span className="text-danger">*</span></label>
                                <input type="number" placeholder="0" className="form-control text-right" value={qty} min="1" onChange={this.handleChange('qty')} />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label">Penanggung Jawab</label>
                        <AsyncSelect onChange={this.handleChangeSelect('in_charge')} value={ in_charge_id && { 
                            label: in_charge_name,
                            value: in_charge_id
                         }  } isClearable placeholder="Pilih Penanggung Jawab" cacheOptions defaultOptions loadOptions={getUserList} />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Catatan</label>
                        <textarea onChange={this.handleChange('notes')} value={notes} rows="5" className="form-control" placeholder="Catatan"></textarea>
                    </div>

                </div>

                <div className="col-md-12 mt-2 text-right mb-5">
                    <hr/>
                    <button onClick={this.handleUpdate} className={`btn btn-primary mr-2 ${fetching ? 'btn-disabled' : ''}`} disabled={fetching}> {fetching ? (<i className="mdi mdi-loading mdi-spin mr-2"></i>) : (<i className="mdi mdi-content-save mr-2"></i>) }Simpan Perubahan</button>
                    <button onClick={this.handleReset} className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>

            </div>
        </Fragment>
        )
    }
}


const filterUserList = (users) => {
    const options = users.map(user => {
        return { label: user.name, value: user._id }
    })
    return appendUser(options);
 };

const appendUser = filteredOptions => {
    return [
      ...filteredOptions
    ];
};
   
const getUserList = (inputValue, callback) => {
     Axios.get(`${url}/user/list`, {
         params: {
             keyword: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
        callback(filterUserList(response.data.data));
     })
}


const mapStateToProps = state => {
    return {
        ...state,
        fetching: state.expense.fetching,
        fetched: state.expense.fetched,
        message: state.expense.message,
        success: state.expense.success,
        type: state.expense.type,
        error: state.expense.error,
        expense: state.expense.expense
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateExpense: (id, data) => dispatch(updateExpense(id, data)),
        getExpense: id => dispatch(getExpense(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditExpense))
