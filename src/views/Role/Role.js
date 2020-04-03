import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/Table';
import Modal from 'react-bootstrap4-modal';
import { fetchRole, toggleRole, deleteRole } from '../../store/actions/RoleActions'
import { withToastManager } from 'react-toast-notifications'
import Error from '../Errors/Error'
import { connect } from 'react-redux'

class Role extends Component {

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
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
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
    
        this.props.fetchRole({
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

    handleSearch = () => {

        const {
            ordering,
            keyword,
            page,
            perpage,
            filter
        } = this.state

        this.props.fetchRole({
            ordering,
            keyword,
            page,
            perpage,
            filter
        })
    }

    handleDeleteModal = () => {
        this.setState({
            ...this.state,
            deleteModal: true
        })
    }

    handleCloseDeleteModal = () => {
        this.setState({
            ...this.state,
            deleteModal: false
        })
    }

    handleDelete = () => {
        this.props.deleteRole(this.state.deletedId)
    }

    handleClickPage = (page) => {

        const {
            ordering,
            keyword,
            perpage,
            filter
        } = this.state

        this.props.fetchRole({
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

    handleChangeSelect = (name) => (e) => {

        const {
            keyword,
            page,
            perpage,
            ordering,
            filter
        } = this.state

        this.props.fetchRole({
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

    handleActive = (e) => {
        const value = e.target.value
        this.props.toggleRole(value)
        
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
                    
                    this.props.fetchRole(this.state)

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
                    
                    this.props.fetchRole(this.state)

                } else {

                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })

                }
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
    
        this.props.fetchRole({
            ordering,
            keyword,
            page,
            perpage,
            filter
        })
    }

    render() {
        const { ordering, deleteModal, perpage } = this.state
        const { data, fetching, error } = this.props
        const roles = data && data.data

        const theads = [
            { name: 'name', value: 'Nama', sortable: true },
            { name: 'is_active', value: 'Aktif', sortable: false },
            { name: 'options', value: 'Opsi', sortable: false }
        ];

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
            <Fragment>
                <div className="row p-3"> 

                    <div className="col-md-12">
                        <h1>Peranan</h1>
                        <hr/>
                    </div>

                    {/* delete modal */}

                    <Modal visible={deleteModal} dialogClassName="modal-sm" onClickBackdrop={this.handleCloseDeleteModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseDeleteModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Hapus peranan</h5>
                        </div>
                        <div className="modal-body">
                            <p>Apakah anda yakin? Harap berhati-hati, data yang di hapus tidak bisa di kembalikan, gunakan opsi jangan centang aktif untuk menonaktifkan kategori</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseDeleteModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleDelete}><i className="mdi mdi-alert mr-2"></i>Hapus data</button>
                        </div>
                    </Modal>



                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <Link to="/role/create" className="btn btn-primary"><i className="mdi mdi-plus mr-2"></i>Tambah Baru</Link>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex justify-content-end">
                                    <div className="form-group mr-4">
                                        <label className="control-label">Filter</label>
                                        <select onChange={this.handleChangeSelect('filter')} className="form-control">
                                            <option value="all">Semua</option>
                                            <option value="active">Hanya yang aktif</option>
                                            <option value="inactive">Hanya yang tidak aktif</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Pencarian</label>
                                        <div className="input-group mb-3">
                                            <input onChange={this.handleChange('keyword')}  onKeyPress={(e) => (e.key === 'Enter') && this.handleSearch() } type="text" className="form-control" placeholder="Kata kunci"/>
                                            <div className="input-group-prepend">
                                                <button onClick={this.handleSearch} className="btn btn-secondary" type="button"><i className="mdi mdi-magnify"></i></button>
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

                                ) : roles && roles.length > 0 ? roles.map(role => {
                                    return (
                                        <tr key={role._id}>
                                            <td>{role.name}</td>
                                            <td className="text-center"><input value={role._id} type="checkbox" onClick={this.handleActive} defaultChecked={role.deleted_at ? false : true} /></td>
                                            <td>
                                                <button onClick={() => this.handleDeleteModal(role._id) } className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                                <Link to={`/role/edit/${role._id}`} className="btn p-0 text-success btn-link btn-small mr-3">Ubah</Link>
                                                <Link to={`/role/view/${role._id}`} className="btn p-0 text-info btn-link btn-small">Lihat</Link>
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
                                <select value={perpage} onChange={this.handleChangeSelect('perpage')} className="form-control">
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
        fetching: state.role.fetching,
        error: state.role.error,
        data: state.role.data,
        type: state.role.type,
        success: state.role.success,
        message: state.role.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchRole: (params) => dispatch(fetchRole(params)),
        toggleRole: (id) => dispatch(toggleRole(id)),
        deleteRole: (id) => dispatch(deleteRole(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Role))
