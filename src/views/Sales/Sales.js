import React, { Component, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Table from '../../components/Table'
import { fetchSales, deleteSales } from '../../store/actions/SalesActions'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap4-modal'
import Error from '../Errors/Error'

class Sales extends Component {
    state = {

        start_date: new Date(),
        end_date: new Date(),
        ordering: {
            type: 'created_at',
            sort: 'asc'
        },
        modal: false,
        deleteModal: false,
        keyword: '',
        page: 1,
        perpage: 10,
        deletedId: '',
        filter: 'all'
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    changeDate = (name, date) => {
        this.setState({
            ...this.state,
            [name]: date
        })

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            filter
        } = this.state
    
        this.props.fetchSales({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            filter,
            [name]: date
        })

    }

    handleChangeSelect = (name) => (e) => {

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            filter
        } = this.state

        
    
        this.props.fetchSales({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            filter,
            [name]: e.target.value
        })

        this.setState({
			...this.state,
           [name]: e.target.value
        })
    }

    handleSearch = () => {

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            filter
        } = this.state

        this.props.fetchSales({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            filter
        })
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
            filter
        } = this.state
    
        this.props.fetchSales({
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            },
            start_date,
            end_date,
            keyword,
            page,
            perpage,
            filter
        })

        this.setState({
			...this.state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
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
        this.props.deleteSales(this.state.deletedId)
    }

    handleClickPage = (page) => {

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            perpage,
            filter
        } = this.state

        this.props.fetchSales({
            start_date,
            end_date,
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
                    
                    this.props.fetchSales(this.state)

                } else {

                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })

                }
            }
        }
    }

    componentDidMount() {
        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            filter
        } = this.state
    
        this.props.fetchSales({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            filter
        })
    }

    render() {
        const { start_date, end_date, ordering, deleteModal, perpage } = this.state
        const { data, fetching, error } = this.props

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        const sales = data && data.data

        const theads = [
            { name: 'created_at', value: 'Tanggal', sortable: true },
            { name: 'number', value: '#', sortable: true },
            { name: 'customer.name', value: 'Pelanggan', sortable: true },
            { name: 'total', value: 'Total Pesanan', sortable: true },
            { name: 'status', value: 'Status', sortable: true },
            { name: 'payment_type', value: 'Pembayaran', sortable: true },
            { name: 'options', value: 'Opsi', sortable: false }
        ]
        return (
           <Fragment>
               <div className="row p-3"> 

                    {/* delete modal */}

                    <Modal visible={deleteModal} dialogClassName="modal-sm" onClickBackdrop={this.handleCloseDeleteModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseDeleteModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Hapus Penjualan</h5>
                        </div>
                        <div className="modal-body">
                            <p>Apakah anda yakin? Harap berhati-hati, data yang di hapus tidak bisa di kembalikan, dan stok yang sudah berkurang tidak bisa kembali</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseDeleteModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleDelete}><i className="mdi mdi-alert mr-2"></i>Hapus data</button>
                        </div>
                    </Modal>
                    
                    <div className="col-md-12">
                        <h1>Penjualan</h1>
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
                                    <div className="form-group mr-4">
                                        <label className="control-label">Filter</label>
                                        <select className="form-control">
                                            <option value="all">Semua</option>
                                            <option value="active">Hanya yang sukses</option>
                                            <option value="inactiv">Hanya yang di tahan</option>
                                        </select>
                                    </div>
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
                                        <td className="text-center" colSpan="7"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading ...</td>
                                    </tr>

                                ) : sales && sales.length > 0 ? sales.map(sales => {
                                    return (
                                            <tr key={sales._id}>
                                                <td>{sales.created_at_formatted}</td>
                                                <td>{sales.number}</td>
                                                <td>{sales.customer && sales.customer.name}</td>
                                                <td className="text-right">{sales.total_formatted}</td>
                                                <td>{sales.status === 'done' ? <span className="badge badge-info">Selesai</span> : <span className="badge badge-info">Ditahan</span>}</td>
                                                <td>{sales.payment_type === 'cash' ? 'Tunai' : 'Kartu'}</td>
                                                <td>
                                                    <button onClick={() => this.handleDeleteModal(sales._id)} className="btn p-0 text-danger btn-link btn-sm mr-3">Hapus</button>
                                                    { sales.status === 'done' ? (
                                                        <Link to={`/sales/view/${sales._id}`} className="btn p-0 text-info btn-link btn-sm">Lihat</Link>
                                                    ) : (
                                                        <Fragment>
                                                            <Link to={`/sales/view/${sales._id}`} className="btn p-0 text-info btn-link btn-sm mr-2">Lihat</Link>
                                                            <Link to={`/cashier/${sales._id}`} className="btn p-0 text-warning btn-link btn-sm">Selesaikan</Link>
                                                        </Fragment>
                                                    ) }
                                                    
                                                </td>
                                            </tr>
                                    )
                                })
                                
                                : (
                                    <tr>
                                        <td className="text-center" colSpan="7">Belum ada data</td>
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
        fetching: state.sales.fetching,
        error: state.sales.error,
        data: state.sales.data,
        type: state.sales.type,
        success: state.sales.success,
        message: state.sales.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSales: (params) => dispatch(fetchSales(params)),
        deleteSales: (id) => dispatch(deleteSales(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Sales))
