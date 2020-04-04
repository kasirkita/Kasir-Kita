import React, { Component, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Table from '../../components/Table'
import AsyncSelect from 'react-select/async'
import Modal from 'react-bootstrap4-modal'
import Axios from 'axios'
import { url } from '../../global'
import { fetchStock, saveStock } from '../../store/actions/StockActions'
import Error from '../Errors/Error'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'

class Stock extends Component {
    state = {
        start_date: new Date(),
        end_date: new Date(),
        ordering: {
            type: 'created_at',
            sort: 'desc'
        },
        modal: false,
        product_id: '',
        product_name: '',
        keyword: '',
        page: 1,
        perpage: 10,
        real_stock: '',
        description: ''
    }

    handleSearch = () => {

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            product_id
            
        } = this.state

        this.props.fetchStock({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            product_id
            
        })
    }


    handleChangeSelectProduct = (name) => (e) => {

        const {
            start_date,
            end_date,
            keyword,
            ordering,
            page,
            perpage
        } = this.state
    
        this.props.fetchStock({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            product_id: e !== null ? e.value : null
        })

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

    handleSorting = (e) => {
        const type = e.target.id
        const sort = this.state.ordering.sort

        const {
            start_date,
            end_date,
            keyword,
            page,
            perpage,
            product_id
            
        } = this.state
    
        this.props.fetchStock({
            start_date,
            end_date,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            },
            keyword,
            page,
            perpage,
            product_id
        })

        this.setState({
			...this.state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
        })
    }
    
    handleClickPage = (page) => {

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            perpage,
            product_id
        } = this.state

        this.props.fetchStock({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            product_id
        })

        this.setState({
            ...this.state,
            page
        })
    }

    componentDidMount() {
        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            product_id
        } = this.state
    
        this.props.fetchStock({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            product_id
        })
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleChangeSelect = (name) => (e) => {

        const {
            start_date,
            end_date,
            keyword,
            page,
            perpage,
            ordering,
            product_id
            
        } = this.state

        
    
        this.props.fetchStock({
            start_date,
            end_date,
            keyword,
            page,
            perpage,
            ordering,
            product_id,
            [name]: e.target.value
        })

        this.setState({
			...this.state,
           [name]: e.target.value
        })
    }


    changeDate = (name, date) => {

        const {
            start_date,
            end_date,
            keyword,
            page,
            perpage,
            ordering,
            product_id,
            
        } = this.state

        this.props.fetchStock({
            start_date,
            end_date,
            keyword,
            page,
            perpage,
            ordering,
            product_id,
            [name]: date
        })
    
        this.setState({
            ...this.state,
            [name]: date
        })
    }

    handleModal = () => {
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

    handleSave = () => {
        this.props.saveStock(this.state)
    }

    handleReset = () => {
        this.setState({
            ...this.state,
            real_stock: '',
            description: ''
        })
    }

    componentDidUpdate = (prevProps) => {

        const { toastManager } = this.props;

        if (prevProps.type !== this.props.type || prevProps.success !== this.props.success) {
            if (this.props.type === 'save') {

                if (this.props.success) {
                    
                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    })
                    
                    const {
                        start_date,
                        end_date,
                        ordering,
                        keyword,
                        page,
                        perpage,
                        product_id
                    } = this.state
                
                    this.props.fetchStock({
                        start_date,
                        end_date,
                        ordering,
                        keyword,
                        page,
                        perpage,
                        product_id
                    })

                    this.setState({
                        ...this.state,
                        real_stock: '',
                        description: '',
                        modal: false
                    })
    
                } else {
    
                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })
                }
            }
        }
    }

    render() {
        const { start_date, end_date, ordering, modal, product_name, product_id, perpage, real_stock, description } = this.state

        const { data, fetching, error } = this.props
        const current_stock = data ? data.current_stock : 0

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        const stocks = data && data.data

        const theads = [
            { name: 'notes', value: 'Catatan', sortable: true },
            { name: 'stock', value: 'Stok', sortable: true },
            { name: 'created_at', value: 'Tanggal', sortable: true },
            { name: 'user_id', value: 'Dibuat oleh', sortable: false }
        ]
        return (
           <Fragment>

                <Modal visible={modal} dialogClassName="modal-md" onClickBackdrop={this.handleCloseModal}>
                    <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseModal}>&times;</button>
                    <div className="modal-header">
                        <h5 className="modal-title">Penyesuaian</h5>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
                            <label className="control-label">Stok Sebenarnya</label>
                            <input type="number" value={real_stock} onChange={this.handleChange('real_stock')} className="form-control text-right" placeholder="0" />
                            <span className="help-block">
                                {  real_stock ? current_stock && current_stock > real_stock ? (
                                    <span className="text-danger">Stok Berkurang { current_stock - real_stock }</span>
                                ) : (
                                    <span className="text-success">Stok Bertambah { real_stock - current_stock }</span>
                                ) : '' }
                            </span>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Catatan</label>
                            <textarea value={description} onChange={this.handleChange('description')} rows="5" className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button onClick={this.handleSave} className={`btn btn-primary mr-2 ${fetching ? 'btn-disabled' : ''}`} disabled={fetching} onClick={this.handleSave}>{ fetching ? <i className="mdi mdi-loading mdi-spin mr-2"></i> : <i className="mdi mdi-content-save mr-2"></i>}Simpan</button>
                        <button onClick={this.handleReset} className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
                    </div>
                </Modal>

               <div className="row p-3"> 
                    <div className="col-md-12">
                        <h1>Stok</h1>
                        <hr/>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Dari tanggal</label>
                                            <DatePicker className="form-control" selected={start_date} onChange={date => this.changeDate('start_date', date)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Sampai tanggal</label>
                                            <DatePicker className="form-control" selected={end_date} onChange={date => this.changeDate('end_date', date)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex justify-content-end">
                                    <div className="form-group">
                                        <label className="control-label">Pencarian</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" onKeyPress={(e) => (e.key === 'Enter') && this.handleSearch() } onChange={this.handleChange('keyword')} placeholder="Kata kunci"/>
                                            <div className="input-group-prepend">
                                                <button className="btn btn-secondary" onClick={this.handleSearch} type="button"><i className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Pilih Barang</label>
                                    <AsyncSelect onChange={this.handleChangeSelectProduct('product')} value={ product_id && { 
                                        label: product_name,
                                        value: product_id
                                    }  } isClearable placeholder="Pilih Produk" cacheOptions defaultOptions loadOptions={getUserList} />
                                </div>
                            </div>
                            <div className="col-md-6 text-right">
                                {
                                    product_id && (
                                        <div className="form-group">
                                            <label className="control-label">Stok Sekarang: {data && data.current_stock}</label>
                                            <br />
                                            <button className="btn btn-secondary" onClick={this.handleModal}>
                                                <i className="mdi mdi-adjust mr-2"></i>Penyesuaian
                                            </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
                            {
                                fetching ? (
                                    <tr>
                                        <td className="text-center" colSpan="8"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading ...</td>
                                    </tr>

                                ) : stocks && stocks.length > 0 ? stocks.map(stock => {
                                    return (
                                            <tr key={stock._id}>
                                                <td>{stock.description}</td>
                                                <td>{stock.type === '+' ? <span className="text-success">+{stock.amount}</span> : <span className="text-danger">-{stock.amount}</span> }</td>
                                                <td>{stock.created_at_formatted}</td>
                                                <td>{stock.user ? stock.user.name : '-'}</td>
                                            </tr>
                                    )
                                })
                                
                                : (
                                    <tr>
                                        <td className="text-center" colSpan="4">Belum ada data</td>
                                    </tr>
                                )
                                
                            }
                        </Table>
                        <hr/>
                    </div>

                    <div className="col-md-6 mt-2">
                        { data && data.total > 1 && (
                                <p>Menampilkan { data && data.from.toLocaleString() } s/d { data && data.to.toLocaleString() } dari { data && data.total.toLocaleString() } data</p>
                            )}

                            {
                                data && data.total > 1 && (
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">

                                            { data.current_page > 1 && <li key="prev" className="page-item"><button onClick={ () => this.handleClickPage(data.current_page - 1) } className="page-link">Prev</button></li> }

                                            {
                                                data.pages.map((page, index) => {
                                                    return (
                                                        
                                                        <li key={index} className={`page-item ${page === '...' ? 'disabled' : '' } ${page === data.current_page ? 'active' : '' }`}><button onClick={ () => this.handleClickPage(page)} className="page-link">{page}</button></li>
                                                        
                                                    )
                                                })
                                            }

                                            { data.current_page < data.last_page && <li key="next" className="page-item"><button onClick={() => this.handleClickPage(data.current_page + 1)} className="page-link">Next</button></li> }


                                        </ul>
                                    </nav>
                                )
                            }
                    </div>

                    <div className="col-md-6 mt-2 text-right">
                        <div className="d-flex justify-content-end">
                            <div className="form-group">
                                <label className="control-label">Tampilkan data perhalaman</label>
                                <select value={perpage} className="form-control" onChange={this.handleChangeSelect('perpage')}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
           </Fragment>
        )
    }
}

const filterUserList = (products) => {
    const options = products.map(product => {
        return { label: product.name, value: product._id }
    })
    return appendUser(options);
 };

const appendUser = filteredOptions => {
    return [
      ...filteredOptions
    ];
};
   
const getUserList = (inputValue, callback) => {
     Axios.get(`${url}/product/list`, {
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

const mapStateToProps = (state) => {
    return {
        fetching: state.stock.fetching,
        error: state.stock.error,
        data: state.stock.data,
        type: state.stock.type,
        success: state.stock.success,
        message: state.stock.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStock: (params) => dispatch(fetchStock(params)),
        saveStock: (data) => dispatch(saveStock(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Stock))
