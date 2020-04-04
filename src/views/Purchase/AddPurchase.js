import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import AsyncSelect from 'react-select/async'
import AddProduct from '../Product/AddProduct'
import Modal from 'react-bootstrap4-modal'
import { savePurchase } from '../../store/actions/PurchaseActions'
import { getSales } from '../../store/actions/SalesActions'
import Axios from 'axios'
import { url } from '../../global'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import FormatNumber from '../../components/FormatNumber'
import Error from '../Errors/Error'

class AddPurchase extends Component {

    state = {
        payment_date: new Date(),
        modal: false,
        products: [],
        carts: [],
        keyword: '',
        code: '',
        tax: '',
        total_discount: '',
        number: '',
        notes: '',
        supplier_id: '',
        supplier_name: '',
        in_charge_id: '',
        in_charge_name: ''
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

    openModal = () => {
        this.setState({
            ...this.state,
            modal: true
        })
    }

    handleCloseModal = () => {
        this.setState({
            ...this.state,
            modal: false
        })
    }

    handleKeyPress = (e) => {

        if (e.key === 'Enter' && this.state.code !== '') {

            this.handleScan(e.target.value)

            this.setState({
                ...this.state,
                code: ''
            })
        }

    }

    handleChoose = (code) => {

        this.handleScan(code)
        this.setState({
            ...this.state,
            keyword: '',
            products: []
        })
    }

    handleChangeKeyword = (e) => {
        
        this.setState({
            ...this.state,
            keyword: e.target.value
        })

        this.getProduct(e.target.value)

    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    getProduct = (keyword) => {

        Axios.get(`${url}/cashier/search`, {
            params: {
                keyword
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            this.setState({
                ...this.state,
                products: res.data.data
            })

        }).catch(err => {

            const { toastManager } = this.props
            toastManager.add(err.response.data.message, {
                appearance: 'error',
                autoDismiss: true
            })
        })
    }

    handleScan = (code) => {
        Axios.get(`${url}/cashier/cart/${code}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            const carts = res.data.data
            let currentCart = this.state.carts
            const filterCart = currentCart.find(cart => cart._id === carts._id)

            if (filterCart) {
                
                const index = currentCart.findIndex(cart => cart._id === carts._id)
                filterCart.qty = filterCart.qty + 1

                currentCart[index] = filterCart

                this.setState({
                    ...this.state,
                    carts: currentCart
                })


            } else {

                carts.qty = 1

                this.setState({
                    ...this.state,
                    carts: [
                        ...this.state.carts,
                        carts
                    ]
                })
            }



        }).catch(err => {

            const { toastManager } = this.props
            toastManager.add(err.response.data.message, {
                appearance: 'error',
                autoDismiss: true
            })

        })
    }


    handleUpdateCart = (name, value, id) => {

        let currentCart = this.state.carts
        const filterCart = currentCart.find(cart => cart._id === id)
        const index = currentCart.findIndex(cart => cart._id === id)
        filterCart[name] = value

        currentCart[index] = filterCart

        this.setState({
            ...this.state,
            carts: currentCart
        })

    }

    handleDeleteCart = (id) => {

        const carts = this.state.carts
        const newCarts = carts.filter(cart => cart._id !== id)

        this.setState({
            ...this.state,
            carts: newCarts
        })

    }

    handleReset = () => {

        this.setState({
            ...this.state,
            carts: [],
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

    handleSave = () => {

        const { carts, tax, total_discount } = this.state
        const subtotal = carts.reduce((total, cart) => {
            return total + (cart.cost * cart.qty)
        }, 0)

        const tax_total = tax !== undefined ? tax : 0
        const discount_total = total_discount !== undefined ? total_discount : 0
        const total = (subtotal + tax_total) - discount_total

        const data = {
            ...this.state,
            subtotal,
            tax: tax_total,
            total_discount: discount_total,
            total
        }

        this.props.savePurchase(data)
    }

    componentDidUpdate = (prevProps) => {
        
        const { toastManager } = this.props;

        if (prevProps.type !== this.props.type || prevProps.success !== this.props.success) {
            
            if (this.props.type === 'save') {
                
                if (this.props.success) {
    
                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    
                    
                    this.props.history.push('/purchase')
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }
        }
    }

    render() {

        const { payment_date, modal, code, keyword, products, carts, tax, total_discount, number, notes, supplier_id, supplier_name, in_charge_id, in_charge_name } = this.state
        const { fetching, error } = this.props
        const subtotal = carts.reduce((total, cart) => {
            return total + (cart.cost * cart.qty)
        }, 0)

        const tax_total = tax !== undefined ? tax : 0
        const discount_total = total_discount !== undefined ? total_discount : 0
        const total = (subtotal + tax_total) - discount_total

        const validate = error && error.data && error.data.errors

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
        <Fragment>

            {/*  modal */}

            <Modal visible={modal} dialogClassName="modal-xl" onClickBackdrop={this.handleCloseModal}>
                <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseModal}>&times;</button>
                <div className="modal-header">
                    <h5 className="modal-title">Tambah Data Barang</h5>
                </div>
                <div className="modal-body">
                    <AddProduct isModal={true} onFinish={this.handleCloseModal} />
                </div>
            </Modal>

            <div className="row p-3">
               
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-8">
                            <h1>Tambah Pembelian Barang</h1>
                        </div>
                        <div className="col-md-4 text-right">
                            <Link className="btn btn-secondary" to="/purchase"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
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
                        <label className="control-label">Pemasok</label>
                        <AsyncSelect onChange={this.handleChangeSelect('supplier')} value={ supplier_id && { 
                            label: supplier_name,
                            value: supplier_id
                         }  } isClearable placeholder="Pilih Pemasok" cacheOptions defaultOptions loadOptions={getSupplierList} />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Bukti</label>
                        <input accept=".jpg, .png, .pdf" ref={ref => this.evidence = ref} onChange={this.handleChangeFile('evidence')} type="file" className="form-control"/>
                        <span className="help-block text-muted">*) Format .jpg, .png, .pdf</span>
                    </div>
                </div>

                <div className="col-md-6 mt-3">
                    <div className="form-group">
                        <label className="control-label">Penanggung Jawab</label>
                        <AsyncSelect onChange={this.handleChangeSelect('in_charge')} value={ in_charge_id && { 
                            label: in_charge_name,
                            value: in_charge_id
                         }  } isClearable placeholder="Pilih Penanggung Jawab" cacheOptions defaultOptions loadOptions={getUserList} />
                    </div>

                    <div className="form-group">
                        <label className="control-label">Catatan</label>
                        <textarea value={notes} onChange={this.handleChange('notes')} rows="5" className="form-control" placeholder="Catatan"></textarea>
                    </div>

                </div>

                <div className="col-md-12 mt-4">
                    <hr/>
                    <div className="row">
                        <div className="col-md-9">
                            
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" id="barcode-tab" data-toggle="tab" href="#barcode" role="tab" aria-controls="barcode" aria-selected="true">Barcode</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="manual-tab" data-toggle="tab" href="#manual" role="tab" aria-controls="manual" aria-selected="true">Manual Input</a>
                                </li>
                            </ul>

                            <div className="tab-content mt-4" id="myTabContent">
                                <div className="tab-pane fade show active" id="barcode" role="tabpanel" aria-labelledby="barcode-tab">
                                    <input value={code} onChange={this.handleChange('code')} onKeyPress={this.handleKeyPress} type="text" className="form-control form-control-lg" placeholder="Pindai disini" />
                                </div>
                                <div className="tab-pane fade autocomplete-wrapper" id="manual" role="tabpanel" aria-labelledby="manual-tab">
                                    <input value={keyword} onChange={this.handleChangeKeyword} type="text" className="form-control form-control-lg" placeholder="Ketik nama barang atau barcode" />
                                    <div className="autocomplete">
                                        <ul className="autocomplete-list m-0">
                                            {
                                                products && products.map(product => {
                                                    return (
                                                    <li key={product._id} onClick={() => this.handleChoose(product.code)}>{`${product.code} - ${product.name}`}</li>
                                                    )
                                                })
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        <div className="col-md-3 text-right mt-5">
                            <button className="btn btn-secondary mt-4" onClick={this.openModal}>
                                <i className="mdi mdi-plus mr-2"></i> Tambah Barang
                            </button>
                        </div>
                        <div className="col-md-12 mt-4">
                            <table className="table table-scrollable-two">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Nama</th>
                                        <th className="text-right">Harga Beli</th>
                                        <th className="text-right">Harga Jual</th>
                                        <th className="text-right">Harga Grosir</th>
                                        <th className="text-center">Qty</th>
                                        <th className="text-right">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        carts  && carts.length > 0 ? carts.map(cart => { 

                                            return (
                                                <tr key={cart._id}>
                                                    <td>{cart.name}</td>
                                                    <td className="text-right"><FormatNumber value={cart.cost} handleChangeNumber={(e) => this.handleUpdateCart('cost', e.floatValue, cart._id)} /> </td>
                                                    <td className="text-right"><FormatNumber value={cart.price} handleChangeNumber={(e) => this.handleUpdateCart('price', e.floatValue, cart._id)} /> </td>
                                                    <td className="text-right"><FormatNumber value={cart.wholesale} handleChangeNumber={(e) => this.handleUpdateCart('wholesale', e.floatValue, cart._id)} /> </td>
                                                    <td className="text-center"><input style={{width: '50%', margin: 'auto'}} type="number" value={cart.qty} min="1" onChange={(e) => this.handleUpdateCart('qty', e.target.value, cart._id) } className="form-control text-right" /></td>
                                                    <td className="text-right">
                                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                                            <FormatNumber value={ cart.cost * cart.qty } type="text" />
                                                            <button onClick={ () => this.handleDeleteCart(cart._id)  } className="btn btn-link text-danger btn-remove">&times;</button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        }).sort().reverse() : (

                                            <tr style={{display: 'flex'}}>
                                                <td colSpan="6" style={{margin: 'auto'}} className="text-center">Belum ada data</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th className="text-right" colSpan="5" style={{width: '80%'}}>Pajak</th>
                                        <th className="text-right">
                                            <FormatNumber handleChangeNumber={this.handleChangeNumber('tax')} value={tax} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan="5" style={{width: '80%'}}>Diskon</th>
                                        <th className="text-right">
                                            <FormatNumber handleChangeNumber={this.handleChangeNumber('total_discount')} value={total_discount} />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th className="text-right" colSpan="5" style={{width: '80%'}}>Total</th>
                                        <th className="text-right">
                                            <FormatNumber type="text" value={total} />
                                        </th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 mt-2 text-right mb-5" data-spy="affix" data-offset-top="197">
                    <hr/>
                    <button onClick={this.handleSave} className={`btn btn-primary mr-2 ${fetching ? 'btn-disabled' : ''}`} disabled={fetching}> {fetching ? (<i className="mdi mdi-loading mdi-spin mr-2"></i>) : (<i className="mdi mdi-content-save mr-2"></i>) }Simpan</button>
                    <button onClick={this.handleReset} className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                </div>

            </div>
        </Fragment>
        )
    }
}


const filterSupplierList = (suppliers) => {
    const options = suppliers.map(supplier => {
        return { label: supplier.name, value: supplier._id }
    })
    return appendSupplier(options);
 };

const appendSupplier = filteredOptions => {
    return [
      ...filteredOptions
    ];
};
   
const getSupplierList = (inputValue, callback) => {
     Axios.get(`${url}/supplier/list`, {
         params: {
             keyword: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
        callback(filterSupplierList(response.data.data));
     })
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
        fetching: state.purchase.fetching,
        fetched: state.purchase.fetched,
        message: state.purchase.message,
        success: state.purchase.success,
        type: state.purchase.type,
        sales: state.sales.sales,
        carts: state.sales.carts,
        error: state.purchase.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        savePurchase: data => dispatch(savePurchase(data)),
        getSales: id => dispatch(getSales(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddPurchase))
