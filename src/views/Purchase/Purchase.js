import React, { Component, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Table from '../../components/Table'
import { Link } from 'react-router-dom'
import { fetchPurchase, deletePurchase } from '../../store/actions/PurchaseActions'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import Modal from 'react-bootstrap4-modal'
import Error from '../Errors/Error'

class Purchase extends Component {
    state = {
        payment_date_start: new Date(),
        payment_date_end: new Date(),
        ordering: {
            type: 'number',
            sort: 'asc'
        },
        modal: false,
        deleteModal: false,
        keyword: '',
        page: 1,
        perpage: 10,
        deletedId: ''
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleChangeSelect = (name) => (e) => {

        const {
            payment_date_start,
            payment_date_end,
            keyword,
            page,
            perpage,
            ordering,
            
        } = this.state

        
    
        this.props.fetchPurchase({
            payment_date_start,
            payment_date_end,
            keyword,
            page,
            perpage,
            ordering,
            [name]: e.target.value
        })

        this.setState({
			...this.state,
           [name]: e.target.value
        })
    }
    
    handleSearch = () => {

        const {
            payment_date_start,
            payment_date_end,
            ordering,
            keyword,
            page,
            perpage,
            
        } = this.state

        this.props.fetchPurchase({
            payment_date_start,
            payment_date_end,
            ordering,
            keyword,
            page,
            perpage,
            
        })
    }

    handleSorting = (e) => {
        const type = e.target.id
        const sort = this.state.ordering.sort

        const {
            payment_date_start,
            payment_date_end,
            keyword,
            page,
            perpage,
            
        } = this.state
    
        this.props.fetchPurchase({
            payment_date_start,
            payment_date_end,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            },
            keyword,
            page,
            perpage,
            
        })

        this.setState({
			...this.state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
        })
    }

    changeDate = (name, date) => {

        const {
            payment_date_start,
            payment_date_end,
            keyword,
            page,
            perpage,
            ordering
            
        } = this.state
    
        this.props.fetchPurchase({
            payment_date_start,
            payment_date_end,
            ordering,
            keyword,
            page,
            perpage,
            [name]: date
            
        })

        this.setState({
            ...this.state,
            [name]: date
        })
    }

    handleDeleteModal = (id) => {
        this.setState({
            ...this.state,
            deleteModal: true,
            deletedId: id
        })
    }

    handleCloseDeleteModal = () => {
        this.setState({
            ...this.state,
            deleteModal: false,
            deletedId: ''
        })
    }

    handleDelete = () => {
        this.props.deleteUser(this.state.deletedId)
    }

    handleClickPage = (page) => {

        const {
            payment_date_start,
            payment_date_end,
            ordering,
            keyword,
            perpage,
            filter
        } = this.state

        this.props.fetchPurchase({
            payment_date_start,
            payment_date_end,
            ordering,
            keyword,
            page,
            perpage,
            filter
        })

        this.setState({
            ...this.state,
            page
        })
    }

    componentDidMount() {
        const {
            payment_date_start,
            payment_date_end,
            ordering,
            keyword,
            page,
            perpage
        } = this.state
    
        this.props.fetchPurchase({
            payment_date_start,
            payment_date_end,
            ordering,
            keyword,
            page,
            perpage
        })
    }

    componentDidUpdate = (prevProps) => {

        const { toastManager } = this.props;

        if (prevProps.type !== this.props.type || prevProps.success !== this.props.success) {
            if (this.props.type === 'delete') {
                if (this.props.success) {

                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    })

                    this.setState({
                        ...this.state,
                        deleteModal: false
                    })
                    
                    this.props.fetchPurchase(this.state)

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
        const { payment_date_start, payment_date_end, ordering, deleteModal, perpage } = this.state
        const { data, fetching, error } = this.props

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        const purchases = data && data.data

        const theads = [
            { name: 'number', value: '#', sortable: true },
            { name: 'supplier_name', value: 'Pemasok', sortable: true },
            { name: 'total', value: 'Total Pesanan', sortable: true },
            { name: 'in_charge_name', value: 'Penanggung jawab', sortable: true },
            { name: 'options', value: 'Opsi', sortable: false }
        ]
        return (
           <Fragment>
               <div className="row p-3"> 

                    {/* delete modal */}

                    <Modal visible={deleteModal} dialogClassName="modal-sm" onClickBackdrop={this.handleCloseDeleteModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseDeleteModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Hapus pembelian</h5>
                        </div>
                        <div className="modal-body">
                            <p>Apakah anda yakin? Harap berhati-hati, data yang di hapus tidak bisa di kembalikan, dan stok yang sudah bertambah tidak bisa dikembalikan</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseDeleteModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleDelete}><i className="mdi mdi-alert mr-2"></i>Hapus data</button>
                        </div>
                    </Modal>
                    
                    <div className="col-md-12">
                        <h1>Pembelian Barang</h1>
                        <hr/>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-12 mb-4">
                                <Link to="/purchase/create" className="btn btn-secondary">
                                    <i className="mdi mdi-plus mr-2"></i>Tambah Pembelian Barang
                                </Link>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Dari tanggal</label>
                                            <DatePicker className="form-control" selected={payment_date_start} onChange={date => this.changeDate('payment_date_start', date)} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Sampai tanggal</label>
                                            <DatePicker className="form-control" selected={payment_date_end} onChange={date => this.changeDate('payment_date_end', date)} />
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
                    </div>

                    <div className="col-md-12 mt-3">
                        <Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
                        {
                                fetching ? (
                                    <tr>
                                        <td className="text-center" colSpan="5"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading ...</td>
                                    </tr>

                                ) : purchases && purchases.length > 0 ? purchases.map(purchase => {
                                    return (
                                            <tr key={purchase._id}>
                                                <td>{purchase.number}</td>
                                                <td>{purchase.supplier && purchase.supplier.name}</td>
                                                <td className="text-right">{purchase.total_formatted}</td>
                                                <td>{purchase.in_charge && purchase.in_charge.name}</td>
                                                <td>
                                                    <button onClick={() => this.handleDeleteModal(purchase._id)} className="btn p-0 text-danger btn-link btn-sm mr-3">Hapus</button>
                                                    <Link to={`/purchase/view/${purchase._id}`} className="btn p-0 text-info btn-link btn-sm mr-2">Lihat</Link>
                                                </td>
                                            </tr>
                                    )
                                })
                                
                                : (
                                    <tr>
                                        <td className="text-center" colSpan="5">Belum ada data</td>
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

const mapStateToProps = (state) => {
    return {
        fetching: state.purchase.fetching,
        error: state.purchase.error,
        data: state.purchase.data,
        type: state.purchase.type,
        success: state.purchase.success,
        message: state.purchase.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPurchase: (params) => dispatch(fetchPurchase(params)),
        deletePurchase: (id) => dispatch(deletePurchase(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Purchase))
