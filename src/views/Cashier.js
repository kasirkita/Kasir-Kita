import React, { Component, Fragment } from 'react'
import Modal from 'react-bootstrap4-modal'
import Axios from 'axios'
import { withToastManager } from 'react-toast-notifications'
import { url } from '../global'
import FormatNumber from '../components/FormatNumber'
import AsyncSelect from 'react-select/async'
import { connect } from 'react-redux'
import { saveSales, getSales } from '../store/actions/SalesActions'
import moment from 'moment'

class Cashier extends Component {
    state = {
        number: '',
        carts: [],
        payModal: false,
        code: '',
        customer_id: null,
        customer_name: null,
        customer_type: null,
        products: [],
        keyword: '',
        cash: '',
        payment: 'cash',
        withPrint: false
    }

    handlePayModal = () => {

        const { carts } = this.state

        if (carts.length > 0) {

            this.setState({
                ...this.state,
                payModal: true
            })

        } else {

            const { toastManager } = this.props
            toastManager.add('Belanjaan kosong!', {
                appearance: 'error',
                autoDismiss: true
            })

        }
    }

    handleClosePayModal = () => {
        this.setState({
            ...this.state,
            payModal: false
        })
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleChangeNumber = (name) => (e) => {
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
                [`${name}_id`]: e.value,
                [`${name}_type`]: e.type,
            })

        } else {
            this.setState({
                ...this.state,
                [`${name}_name`]: null,
                [`${name}_id`]: null,
                [`${name}_type`]: null,
            })
        }
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


    handleUpdateQty = (value, id) => {

        let currentCart = this.state.carts
        const filterCart = currentCart.find(cart => cart._id === id)
        const index = currentCart.findIndex(cart => cart._id === id)
        filterCart.qty = value

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

    handleEmptyCart = () => {
        this.setState({
            ...this.state,
            carts: []
        })
    }

    handlePay = (withPrint, status = 'done') => {

        let data = this.state
        const subtotal = data.carts.reduce((total, cart) => {
            return total + ( data.customer_type === 'wholesaler' ? cart.wholesale * cart.qty : cart.price *  cart.qty )
        }, 0)


        let tax = sessionStorage.getItem('tax')
        tax  = tax > 0 ? subtotal * (tax / 100) : 0

        const total_discount = data.carts.reduce((total, cart) => {
        const set_discount = cart.discount_amount ? cart.type === 'fix' ? cart.discount_amount : cart.price * (cart.discount_amount / 100) : 0
        let set_term
        let discount

        if (cart.term === '=') {
            set_term = cart.qty >= cart.total_qty
        } else {
            set_term = cart.qty > cart.total_qty
        }

        if (set_term) {

            if (cart.customer_type) {
                if (cart.customer_type === data.customer_type) {
                    discount = set_discount
                } else {
                    discount = 0
                }
            } else {
                discount = set_discount;
            }

        } else {
            discount = 0
        }

        return total + discount

        }, 0)

        data = {
            ...data,
            status,
            subtotal,
            total_discount,
            tax,
            change: data.cash - ((subtotal + tax) - total_discount),
            total:  (subtotal + tax) - total_discount
        }

        this.setState({
            ...this.state,
            withPrint
        })

        this.props.saveSales(data)
    }

    componentDidUpdate = (prevProps) => {
        
        const { toastManager } = this.props;

        if (prevProps.type !== this.props.type || prevProps.success !== this.props.success || prevProps.sales !== this.props.sales || this.props.carts !== prevProps.carts) {
            
            if (this.props.type === 'get') {
                const {
                    number,
                    customer,
                    customer_name,
                    customer_id,
                    amount,
                    payment_type,
                    details
                } = this.props.sales
    
                this.setState({
                    number,
                    customer_id,
                    customer_name,
                    customer_type: customer && customer.type,
                    cash: amount,
                    payment: payment_type,
                    carts: details ? details.map(detail => {
                        return {
                            ...detail.product,
                            qty: detail.qty
                        }
                    }) : []
                })
            }
            
            if (this.props.type === 'save') {
                
                if (this.props.success) {
    
                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    });
                    
                    if (this.state.withPrint) {
                        this.handlePrint(this.props.carts)
                    } else {
                        if (this.props.match.params.id) {
                            this.props.history.push('/cashier')
                        } else {
                            this.handleReset()
                        }
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

    divider = (value, length = 36) => {
        let separator = []
        for (let i = 0; i < length; i++ ) {
            separator.push(value)
        }

        return separator.join('')
    }

    handlePrint = (res) =>{

        const { toastManager } = this.props
        let data = res
        // const printer = sessionStorage.getItem('printer') ? sessionStorage.getItem('printer') : 'http://localhost:4000'
        data = {
            ...data,
            logo: sessionStorage.getItem('logo'),
            cashier: sessionStorage.getItem('name'),
            logo_remove: sessionStorage.getItem('logo_remove') === 'false' ? false : true,
            date: moment(new Date()).format('DD MMM YYYY HH:mm'),
            shop_name: sessionStorage.getItem('shop_name'),
            address: sessionStorage.getItem('address'),
            divider: this.divider(sessionStorage.getItem('divider'), 30),
            phone_number: sessionStorage.getItem('phone_number')
        }

        Axios.post(`http://localhost:3002/receipt`, data).then(res => {
            if (this.props.match.params.id) {
                this.props.history.push('/cashier')
            } else {
                this.handleReset()
            }
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

    handleReset = () => {

        this.setState({
            ...this.state,
            carts: [],
            payModal: false,
            code: '',
            customer_id: null,
            customer_name: null,
            customer_type: null,
            products: [],
            keyword: '',
            cash: '',
            payment: 'cash'
        })
    }

    componentDidMount = () => {
        if (this.props.match.params.id) {
            this.props.getSales(this.props.match.params.id)
        }
    }

    render() {

        const { payModal, carts, code, customer_id, customer_name, products, keyword, customer_type, cash, payment } = this.state
        const { fetching } = this.props
        const total = carts.reduce((total, cart) => {
            return total + ( customer_type === 'wholesaler' ? cart.wholesale * cart.qty : cart.price *  cart.qty )
        }, 0)
        let tax = parseInt(sessionStorage.getItem('tax'))
        tax = tax > 0 ? total * (tax / 100) : 0

        const total_discount = carts.reduce((total, cart) => {

            const set_discount = cart.discount_amount ? cart.type === 'fix' ? cart.discount_amount : cart.price * (cart.discount_amount / 100) : 0
            let set_term
            let discount

            if (cart.term === '=') {
                set_term = cart.qty >= cart.total_qty
            } else {
                set_term = cart.qty > cart.total_qty
            }

            if (set_term) {

                if (cart.customer_type) {
                    if (cart.customer_type === customer_type) {
                        discount = set_discount
                    } else {
                        discount = 0
                    }
                } else {
                    discount = set_discount;
                }

            } else {
                discount = 0
            }

            return total + discount

        }, 0)

        return (
            <Fragment>
                <div className="row p-3"> 
                
                    <div className="col-md-12">
                        <h1>Kasir</h1>
                        <hr/>
                    </div>

                    {/*  pay modal */}

                    <Modal visible={payModal} dialogClassName="modal-lg" onClickBackdrop={this.handleClosePayModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleClosePayModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Bayar pesanan</h5>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-6">
                                    <table className="table">
                                        <tbody>
                                            <tr>
                                                <td className="border-0">Pelanggan</td>
                                                <td className="border-0">{
                                                    customer_name ? customer_name : '-'
                                                }</td>
                                            </tr>
                                            <tr>
                                                <td>Subtotal</td>
                                                <td>
                                                    <FormatNumber value={total} type="text" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Pajak</td>
                                                <td>
                                                   <FormatNumber value={tax} type="text" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total Diskon</td>
                                                <td>
                                                   -<FormatNumber value={total_discount} type="text" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Total Belanja</td>
                                                <td>
                                                    {
                                                        <FormatNumber value={(total + tax) - total_discount} type="text" />
                                                    }
                                                </td>
                                            </tr>
                                            {
                                                payment === 'cash' && (
                                                    <Fragment>
                                                        <tr>
                                                            <td>Pembayaran</td>
                                                            <td><FormatNumber value={cash} type="text" /></td>
                                                        </tr>
                                                        <tr>
                                                            <td>Kembalian</td>
                                                            <td><FormatNumber value={cash - ((total + tax) - total_discount)} type="text" /></td>
                                                        </tr>
                                                    </Fragment>
                                                )
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="control-label">Sistem Pembayaran</label>
                                        <select onChange={this.handleChange('payment')} value={payment} className="form-control">
                                            <option value="cash">Tunai</option>
                                            <option value="card">Kartu Debit / Kredit</option>
                                        </select>
                                    </div>
                                    {
                                        payment === 'cash' && (

                                            <div className="form-group">
                                                <label className="control-label">Pembayaran</label>
                                                <div className="col p-0 mb-3">
                                                    <div className="btn-group mb-2" role="group" aria-label="Basic example">
                                                        <button type="button" value={5000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 5{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                        <button type="button" value={10000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 10{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                        <button type="button" value={15000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 15{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                    </div>
                                                    <div className="btn-group mb-2" role="group" aria-label="Basic example">
                                                        <button type="button" value={20000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 20{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                        <button type="button" value={25000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 25{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                        <button type="button" value={30000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 30{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                    </div>
                                                    <div className="btn-group mb-2" role="group" aria-label="Basic example">
                                                        <button type="button" value={50000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 50{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                        <button type="button" value={70000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 70{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                        <button type="button" value={10000} onClick={this.handleChange('cash')} className="btn btn-info">{ sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } 100{sessionStorage.getItem('thousand_separator') !== 'null' ? sessionStorage.getItem('thousand_separator') : ''}000</button>
                                                    </div>
                                                </div>
                                                <FormatNumber value={cash} handleChangeNumber={this.handleChangeNumber('cash')} className="form-control text-right" placeholder="Rp. 0"/>
                                            </div>

                                        ) 
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            {
                                fetching ? (
                                    <button className="btn btn-default btn-disabled" disabled><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading...</button>
                                ) : (

                                    <Fragment>
                                        <button onClick={() => this.handlePay(true)} className="btn btn-primary mr-2"><i className="mdi mdi-cash mr-2"></i>Bayar dan cetak</button>
                                        <button onClick={() => this.handlePay(false)} className="btn btn-success mr-2"><i className="mdi mdi-cash mr-2"></i>Bayar tanpa cetak</button>
                                        <button onClick={() => this.handlePay(false, 'hold')} className="btn btn-success mr-2"><i className="mdi mdi-clock mr-2"></i>Tahan</button>
                                    </Fragment>
                                )
                            }
                        </div>
                    </Modal>

                    <div className="col-md-12">
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

                    <div className="col-md-12 mt-3">
                        <div className="form-group">
                            <label className="control-label">Pelanggan</label>
                            <AsyncSelect
                                isClearable
                                placeholder="Pilih pelanggan"
                                loadOptions={getCustomerList}
                                value={ customer_id ? {
                                    label: customer_name,
                                    value: customer_id
                                } : null }
                                onChange={this.handleChangeSelect('customer')}
                                cacheOptions
                                defaultOptions
                            />
                        </div>
                        <table className="table table-scrollable-two">
                            <thead className="thead-light">
                                <tr>
                                    <th>Nama</th>
                                    <th className="text-right">Harga Jual</th>
                                    <th className="text-center">Qty</th>
                                    <th className="text-center">Diskon</th>
                                    <th className="text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    carts ? carts.map(cart => { 

                                        const set_discount = cart.discount_amount ? cart.type === 'fix' ? cart.discount_amount : cart.price * (cart.discount_amount / 100) : 0
                                        let set_term
                                        let discount

                                        if (cart.term === '=') {
                                            set_term = cart.qty >= cart.total_qty
                                        } else {
                                            set_term = cart.qty > cart.total_qty
                                        }

                                        if (set_term) {

                                            if (cart.customer_type) {
                                                if (cart.customer_type === customer_type) {
                                                    discount = set_discount
                                                } else {
                                                    discount = 0
                                                }
                                            } else {
                                                discount = set_discount;
                                            }

                                        } else {
                                            discount = 0
                                        }

                                        const subtotal = customer_type === 'wholesaler' ? (cart.wholesale * cart.qty) - discount : (cart.price *  cart.qty) - discount

                                        return (
                                            <tr key={cart._id}>
                                                <td style={{width: '195px'}}>{cart.name}</td>
                                                <td style={{width: '195px'}} className="text-right">{ customer_type === 'wholesaler' ? cart.wholesale_formatted : cart.price_formatted}</td>
                                                <td style={{width: '195px'}} className="text-center" width="120"><input style={{width: '50%', margin: 'auto'}} type="number" value={cart.qty} min="1" onChange={(e) => this.handleUpdateQty(e.target.value, cart._id) } className="form-control text-right" /></td>
                                                <td style={{width: '195px'}} className="text-right"><FormatNumber value={discount} type="text" /></td>
                                                <td style={{width: '195px'}} className="text-right">
                                                    <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                                                        <FormatNumber value={ subtotal } type="text" />
                                                        <button onClick={ () => this.handleDeleteCart(cart._id)  } className="btn btn-link text-danger btn-remove p-0 pl-2">&times;</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    }).sort().reverse() : (

                                        <tr style={{display: 'flex'}}>
                                            <td colSpan="5" style={{margin: 'auto'}} className="text-center">Belum ada data</td>
                                        </tr>
                                    )
                                }
                            </tbody>

                            <tfoot>
                                <tr>
                                    <th className="text-right" colSpan="5" style={{width: '80%'}}>Total</th>
                                    <th className="text-right" style={{width: '1%'}}>
                                        <FormatNumber type="text" value={total} />
                                    </th>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    <div className="col-md-12 mt-3 text-right">
                        <button className="btn btn-primary mr-2" onClick={this.handlePayModal}><i className="mdi mdi-cash mr-2"></i>Bayar</button>
                        <button className={`btn btn-success mr-2 ${fetching ? 'btn-disabled': '' }`} disabled={fetching} onClick={() => this.handlePay(false, 'hold')}>{ fetching ? <i className="mdi mdi-loading mdi-spin mr-2" /> :  <i className="mdi mdi-clock mr-2" /> } Tahan</button>
                        <button className="btn btn-secondary" onClick={this.handleEmptyCart}><i className="mdi mdi-delete mr-2"></i>Hapus transaksi</button>
                    </div>

                </div>
            </Fragment>
        )
    }
}


const filterCustomerList = (customers) => {
    return appendCustomer(customers);
 };

const appendCustomer = filteredOptions => {
    return [
      ...filteredOptions
    ];
};
   
const getCustomerList = (inputValue, callback) => {
     Axios.get(`${url}/customer/list`, {
         params: {
             keyword: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
        callback(filterCustomerList(response.data.data));
     })
}


const mapStateToProps = state => {
    return {
        ...state,
        fetching: state.sales.fetching,
        fetched: state.sales.fetched,
        message: state.sales.message,
        success: state.sales.success,
        sales: state.sales.sales,
        type: state.sales.type,
        carts: state.sales.carts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveSales: data => dispatch(saveSales(data)),
        getSales: id => dispatch(getSales(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Cashier))
