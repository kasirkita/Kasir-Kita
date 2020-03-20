import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import Modal from 'react-bootstrap4-modal'
import { fetchUser, toggleUser, deleteUser } from '../../store/actions/UserActions'
import { withToastManager } from 'react-toast-notifications'
import Error from '../Errors/Error'
import { connect } from 'react-redux'

class User extends Component {

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

        
    
        this.props.fetchUser({
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

        this.props.fetchUser({
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
    
        this.props.fetchUser({
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
        this.props.deleteUser(this.state.deletedId)
    }

    handleClickPage = (page) => {

        const {
            ordering,
            keyword,
            perpage,
            filter
        } = this.state

        this.props.fetchUser({
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

    handleActive = (e) => {
        const value = e.target.value
        this.props.toggleUser(value)
        
    }

    handleSelected = (e) => {
        const value = e.target.value
        this.props.selectUser(value)
    }

    componentDidUpdate = (prevProps) => {

        const { toastManager } = this.props;

        if (prevProps.type !== this.props.type) {
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
                    
                    this.props.fetchUser(this.state)

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
                    
                    this.props.fetchUser(this.state)

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
            ordering,
            keyword,
            page,
            perpage,
            filter
        } = this.state
    
        this.props.fetchUser({
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
        const users = data && data.data

        const theads = [
            { name: 'avatar', value: '', sortable: false },
            { name: 'name', value: 'Nama', sortable: true },
            { name: 'role_name', value: 'Peranan', sortable: true },
            { name: 'email', value: 'Email', sortable: true },
            { name: 'is_active', value: 'Aktif', sortable: false },
            { name: 'options', value: 'Opsi', sortable: false }
        ];

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
            <Fragment>
                <div className="row p-3"> 

                    {/* delete modal */}

                    <Modal visible={deleteModal} dialogClassName="modal-sm" onClickBackdrop={this.handleCloseDeleteModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseDeleteModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Hapus pengguna</h5>
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
                        <h1>Pengguna</h1>
                        <hr/>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <Link to="/user/create" className="btn btn-primary mr-2"><i className="mdi mdi-plus mr-2"></i>Tambah Baru</Link>
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

                                ) : users && users.length > 0 ? users.map(user => {
                                    return (
                                            <tr key={user._id}>
                                                <td className="text-center">
                                                    <img src={user.avatar ? user.avatar : require('../../assets/img/default.png')} alt={user.name} className="img-fluid rounded-circle img-avatar" width="50" />
                                                </td>
                                                <td>{user.name}</td>
                                                <td>{user.role && user.role.name}</td>
                                                <td>{user.email}</td>
                                                <td className="text-center"><input type="checkbox" onClick={this.handleActive} value={user._id} defaultChecked={user.deleted_at ? false : true} /></td>
                                                <td>
                                                    <button onClick={() => this.handleDeleteModal(user._id)} className="btn p-0 text-danger btn-link btn-sm mr-3">Hapus</button>
                                                    <Link to={`/user/edit/${user._id}`} className="btn p-0 text-success btn-link btn-sm mr-3">Ubah</Link>
                                                    <Link to={`/user/view/${user._id}`} className="btn p-0 text-info btn-link btn-sm">Lihat</Link>
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
        fetching: state.user.fetching,
        error: state.user.error,
        data: state.user.data,
        type: state.user.type,
        success: state.user.success,
        message: state.user.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: (params) => dispatch(fetchUser(params)),
        toggleUser: (id) => dispatch(toggleUser(id)),
        deleteUser: (id) => dispatch(deleteUser(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(User))
