import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import Modal from 'react-bootstrap4-modal'
import { fetchProduct, toggleProduct, deleteProduct, importProduct, selectProduct } from '../../store/actions/ProductActions'
import { withToastManager } from 'react-toast-notifications'
import Error from '../Errors/Error'
import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import Axios from 'axios'
import { url } from '../../global'
import fileDownload from 'js-file-download'

class Product extends Component {

    state = {
        ordering: {
            type: 'name',
            sort: 'asc'
        },
        modal: false,
        deleteModal: false,
        keyword: '',
        page: 1,
        perpage: 10,
        deletedId: '',
        filter: 'all',
        downloading: false,
        printing: false,
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleChangeSelect = (name) => (e) => {

        const {
            keyword,
            page,
            perpage,
            ordering,
            filter
        } = this.state

        
    
        this.props.fetchProduct({
            keyword,
            page,
            perpage,
            ordering,
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
            ordering,
            keyword,
            page,
            perpage,
            filter
        } = this.state

        this.props.fetchProduct({
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
            keyword,
            page,
            perpage,
            filter
        } = this.state
    
        this.props.fetchProduct({
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            },
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
        this.props.deleteProduct(this.state.deletedId)
    }

    handleClickPage = (page) => {

        const {
            ordering,
            keyword,
            perpage,
            filter
        } = this.state

        this.props.fetchProduct({
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

    handleDrop = (files) => {
        
        files && files.map(file => {

           return this.props.importProduct(file)

        })
    }

    handleDropFail = (files) => {
        const { toastManager } = this.props
        this.setState({
            ...this.state,
            modal: false
        })

        if (files.length > 1) {
            toastManager.add('Hanya boleh satu berkas saja', {
                appearance: 'error',
                autoDismiss: true
            })
        } else {
            files.map(file => {
                if (file.size > 102400) {
                    toastManager.add('Ukuran berkas terlalu besar maksimal 1Mb', {
                        appearance: 'error',
                        autoDismiss: true
                    })
                    
                }

                if (file.type !== 'text/csv') {
                    
                    toastManager.add('Format berkas tidak didukung', {
                        appearance: 'error',
                        autoDismiss: true
                    })
                    
                }

                return true
            })
        }

    }

    handleActive = (e) => {
        const value = e.target.value
        this.props.toggleProduct(value)
        
    }

    handleSelected = (e) => {
        const value = e.target.value
        this.props.selectProduct(value)
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
                    
                    this.props.fetchProduct(this.state)

                } else {

                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })

                }
            }

            if (this.props.type === 'import') {
                if (this.props.success) {

                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    })

                    this.setState({
                        ...this.state,
                        modal: false
                    })
                    
                    this.props.fetchProduct(this.state)

                } else {

                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })

                }
            }
        }
    }

    handleDownload = () => {
        
        this.setState({
            ...this.state,
            downloading: true
        })

        Axios.get(`${url}/product/template`, {
            headers: {
                Authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            fileDownload(res.data, 'template_produk.csv');
            this.setState({
                ...this.state,
                downloading: false,
                modal: false
            })
        })
    }

    handlePrintPdf = () => {
        this.setState({
            ...this.state,
            printing: true
        })

        Axios.get(`${url}/product/print`, {
            headers: {
                Authorization:`Bearer ${sessionStorage.getItem('token')}`
            },
            responseType: 'blob'
        }).then(res => {
            
            fileDownload(res.data, 'print_label.pdf');

            this.setState({
                ...this.state,
                printing: false,
                modal: false
            })

        })
    }

    handlePrintThermal = () => {

        this.setState({
            ...this.state,
            printing: true
        })

        Axios.get(`${url}/product/print-thermal`, {
            headers: {
                Authorization:`Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
        

            this.handlePrintLabel(res.data.data)

        })
    }

    handlePrintLabel = (data) => {
        const { toastManager } = this.props
        // const printer = sessionStorage.getItem('printer')
        Axios.post(`http://localhost:3002/label`, {
            data
        }).then(res => {

            toastManager.add(res.data.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.setState({
                ...this.state,
                printing: false,
                modal: false
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

    handlePrint = (name) => (e) => {
        const { selected, toastManager } = this.props
        if (selected < 1) {
            toastManager.add('Harap pilih dulu data', {
                appearance: 'warning',
                autoDismiss: true
            })
        } else {
            if (name === 'thermal') {
                this.handlePrintThermal()
            } else {
                this.handlePrintPdf()
            }
        }
    }

    componentDidMount = () => {

        const {
            ordering,
            keyword,
            page,
            perpage,
            filter
        } = this.state
    
        this.props.fetchProduct({
            ordering,
            keyword,
            page,
            perpage,
            filter
        })
    }

    render() {
        const { ordering, modal, deleteModal, downloading, printing, perpage } = this.state
        const { data, fetching, error, uploading, selected } = this.props
        const products = data && data.data

        const theads = [
            { name: 'name', value: 'Nama', sortable: true },
            { name: 'category', value: 'Kategori', sortable: true },
            { name: 'price', value: 'Harga Jual', sortable: true },
            { name: 'stock', value: 'Stok', sortable: true },
            { name: 'is_active', value: 'Aktif', sortable: false },
            { name: 'options', value: 'Opsi', sortable: false }
        ]

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
            <Fragment>
                <div className="row p-3"> 

                    {/*  modal */}

                    <Modal visible={modal} dialogClassName="modal-md" onClickBackdrop={this.handleCloseModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Impor data barang</h5>
                        </div>
                        <div className="modal-body">
                            
                                <Dropzone 
                                    onDrop={(files) => this.handleDrop(files)}
                                    multiple={false}
                                    onDropRejected={files => this.handleDropFail(files)}
                                    accept=".csv"
                                    maxSize={102400}
                                    >
                                    {({getRootProps, getInputProps}) => (
                                        <div className={`dropzone-wrapper text-center py-4 my-3 ${uploading ? 'uploading' : ''}`}>
                                        <section>
                                        <p className="text-muted">Seret dan lepaskan</p>
                                        <div {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            {
                                                uploading ? (
                                                    <button className="btn btn-primary btn-disabled" disabled><i className="mdi mdi-loading mdi-spin mr-2"></i>Mengunggah ...</button>

                                                ) : (

                                                    <button className="btn btn-primary"><i className="mdi mdi-folder-open mr-2"></i>Jelajahi Berkas</button>
                                                )
                                            }
                                        </div>
                                        </section>
                                    </div>
                                    )}
                                </Dropzone>

                            
                            <div className="row d-flex justify-content-start">
                                <div className="col">
                                    <div className="col-12">
                                        <small className="text-muted">* Format berkas .csv delimeter (;)</small>
                                    </div>
                                    <div className="col-12">
                                        <small className="text-muted">* Ukuran maks 1Mb</small>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="col-12  d-flex justify-content-end">
                                        {
                                            downloading ? (
                                                <button className="btn btn-success btn-sm btn-disabled" disabled><i className="mdi mdi-loading mdri-spin mr-2"></i>Mengunduh</button>
                                            ) : (

                                                <button className="btn btn-success btn-sm" onClick={this.handleDownload}><i className="mdi mdi-download mr-2"></i>Unduh template</button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                    </Modal>

                    {/* delete modal */}

                    <Modal visible={deleteModal} dialogClassName="modal-sm" onClickBackdrop={this.handleCloseDeleteModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseDeleteModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Hapus barang</h5>
                        </div>
                        <div className="modal-body">
                            <p>Apakah anda yakin? Harap berhati-hati, data yang di hapus tidak bisa di kembalikan, gunakan opsi jangan centang aktif untuk menonaktifkan barang</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseDeleteModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleDelete}><i className="mdi mdi-alert mr-2"></i>Hapus data</button>
                        </div>
                    </Modal>
                
                    <div className="col-md-12">
                        <h1>Barang</h1>
                        <hr/>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <Link to="/product/create" className="btn btn-primary mr-2"><i className="mdi mdi-plus mr-2"></i>Tambah Baru</Link>
                                    <button className="btn btn-secondary mr-2" onClick={this.handleModal}><i className="mdi mdi-arrow-up-thick mr-2"></i>Impor Data Barang</button>
                                </div>
                                <div className="d-flex justify-content-start mt-2">
                                    <button className={`btn btn-secondary dropdown-toggle ${printing ? 'disabled': ''}`} disabled={printing} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{ printing ? (<i className="mdi mdi-loading mdi-spin mr-2"/>) : (<i className="mdi mdi-printer mr-2"/>) }Cetak label</button>
                                        <div className="dropdown-menu">
                                            <button className="dropdown-item pointer" onClick={this.handlePrint('thermal')}>Cetak dengan thermal</button>
                                            <button className="dropdown-item pointer" onClick={this.handlePrint('pdf')}>Cetak dengan PDF</button>
                                        </div>
                                </div>
                                <div className="d-flex justofy-content-start mt-2">
                                    <small className="text-muted">Barang terpilih ({ selected ? selected : 0 })</small>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex justify-content-end">
                                    <div className="form-group mr-4">
                                        <label className="control-label">Filter</label>
                                        <select className="form-control" onChange={this.handleChangeSelect('filter')}>
                                            <option value="all">Semua</option>
                                            <option value="active">Hanya yang aktif</option>
                                            <option value="inactive">Hanya yang tidak aktif</option>
                                            <option value="selected">Hanya yang dipilih</option>
                                            <option value="unselected">Hanya yang tidak dipilih</option>
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
                                        <td className="text-center" colSpan="6"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading ...</td>
                                    </tr>

                                ) : products && products.length > 0 ? products.map(product => {
                                        return (
                                            <tr key={product._id}>
                                                <td>
                                                    <div className="form-check mt-0">
                                                        <input className="form-check-input" id={product._id} onClick={this.handleSelected} value={product._id} type="checkbox" defaultChecked={product.selected ? true : false} />
                                                        <label className="form-check-label" htmlFor={product._id}>
                                                            {product.name}
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>{product.category && product.category.name}</td>
                                                <td className="text-right">{product.price_formatted}</td>
                                                <td className="text-center">{product.qty && product.qty.amount} {product.unit && product.unit.name} </td>
                                                <td className="text-center"><input onClick={this.handleActive} value={product._id} type="checkbox" defaultChecked={product.deleted_at ? false : true} /></td>
                                                <td>
                                                    <button onClick={() => this.handleDeleteModal(product._id)} className="btn p-0 text-danger btn-link btn-sm mr-3">Hapus</button>
                                                    <Link to={`/product/edit/${product._id}`} className="btn p-0 text-success btn-link btn-sm mr-3">Ubah</Link>
                                                    <Link to={`/product/view/${product._id}`} className="btn p-0 text-info btn-link btn-sm">Lihat</Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                
                                : (
                                    <tr>
                                        <td className="text-center" colSpan="6">Belum ada data</td>
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
        fetching: state.product.fetching,
        error: state.product.error,
        data: state.product.data,
        type: state.product.type,
        success: state.product.success,
        message: state.product.message,
        uploading: state.product.uploading,
        selected: state.product.selected,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProduct: (params) => dispatch(fetchProduct(params)),
        toggleProduct: (id) => dispatch(toggleProduct(id)),
        deleteProduct: (id) => dispatch(deleteProduct(id)),
        importProduct: (id) => dispatch(importProduct(id)),
        selectProduct: (id) => dispatch(selectProduct(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Product))
