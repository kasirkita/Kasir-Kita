import React, { Component, Fragment } from 'react'
import Table from '../../components/Table';
import Modal from 'react-bootstrap4-modal';
import Error from '../Errors/Error';
import { withToastManager } from 'react-toast-notifications'
import { fetchUnit, toggleUnit, deleteUnit, saveUnit, updateUnit, getUnit } from '../../store/actions/UnitActions'
import { connect } from 'react-redux'

class Unit extends Component {

    state = {
        ordering: {
            type: 'name',
            sort: 'asc'
        },
        deleteModal: false,
        createModal: false,
        keyword: '',
        page: 1,
        perpage: 10,
        deletedId: '',
        updatedId: '',
        filter: 'all',
        title: 'Tambah satuan baru',
        name: ''
    }

    handleChange = (name) => (e) => {
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

        this.props.fetchUnit({
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
    
        this.props.fetchUnit({
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

    handleDeleteModal = (id) => {
        this.setState({
            ...this.state,
            deleteModal: true,
            deletedId: id
        })
    }

    handleDelete = () => {
        this.props.deleteUnit(this.state.deletedId)
    }

    handleCloseDeleteModal = () => {
        this.setState({
            ...this.state,
            deleteModal: false
        })
    }

    handleCreateModal = () => {
        this.setState({
            ...this.state,
            createModal: true
        })
    }

    handleCloseCreateModal = () => {
        this.setState({
            ...this.state,
            createModal: false,
            title: 'Tambah satuan baru',
            name: '',
            updatedId: ''
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

        
    
        this.props.fetchUnit({
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

    handleClickPage = (page) => {

        const {
            ordering,
            keyword,
            perpage,
            filter
        } = this.state

        this.props.fetchUnit({
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
        this.props.toggleUnit(value)
        
    }

    handleUpdate = (id) => {

        this.props.getUnit(id)
        
        this.setState({
            ...this.state,
            title: 'Ubah satuan',
            createModal: true
        })
    }

    handleSubmit = () => {
        if (this.state.updatedId) {
            this.props.updateUnit(this.state.updatedId, this.state)
        } else {
            this.props.saveUnit(this.state)
        }
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
                    
                    this.props.fetchUnit(this.state)

                } else {

                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })

                }
            }

            if (this.props.type === 'save') {
                if (this.props.success) {

                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    })

                    this.handleCloseCreateModal()
                    this.props.fetchUnit(this.state)

                } else {

                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })

                }
            }

            if (this.props.type === 'update') {
                if (this.props.success) {

                    toastManager.add(this.props.message, {
                        appearance: 'success',
                        autoDismiss: true
                    })

                    this.handleCloseCreateModal()
                    this.props.fetchUnit(this.state)

                } else {

                    toastManager.add(this.props.message, {
                        appearance: 'error',
                        autoDismiss: true
                    })

                }
            }
        }

        if (this.props.unit !== prevProps.unit) {
            this.setState({
                ...this.state,
                updatedId: this.props.unit._id,
                name: this.props.unit.name
            })
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
    
        this.props.fetchUnit({
            ordering,
            keyword,
            page,
            perpage,
            filter
        })
    }

    render() {
        const { ordering, deleteModal, createModal, perpage, title, updatedId, name } = this.state
        const { data, fetching, error } = this.props
        const categories = data && data.data

        const theads = [
            { name: 'name', value: 'Nama', sortable: true },
            { name: 'is_active', value: 'Aktif', sortable: false },
            { name: 'options', value: 'Opsi', sortable: false }
        ];

        const validate = error && error.data && error.data.errors

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        return (
            <Fragment>
                <div className="row p-3"> 

                    <div className="col-md-12">
                        <h1>Satuan</h1>
                        <hr/>
                    </div>

                    {/* delete modal */}

                    <Modal visible={deleteModal} dialogClassName="modal-sm" onClickBackdrop={this.handleCloseDeleteModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseDeleteModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Hapus satuan</h5>
                        </div>
                        <div className="modal-body">
                            <p>Apakah anda yakin? Harap berhati-hati, data yang di hapus tidak bisa di kembalikan, gunakan opsi jangan centang aktif untuk menonaktifkan satuan</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseDeleteModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                            <button type="button" className="btn btn-primary" onClick={this.handleDelete}><i className="mdi mdi-alert mr-2"></i>Hapus data</button>
                        </div>
                    </Modal>

                    {/* add unit modal */}

                    <Modal visible={createModal} dialogClassName="modal-md" onClickBackdrop={this.handleCloseCreateModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseCreateModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">{title}</h5>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label className="control-label">Nama</label>
                                    <input type="text" value={name} onChange={this.handleChange('name')} className={`form-control ${validate && validate.name ? 'is-invalid' : ''}`} placeholder="Nama satuan" />
                                    {
                                        validate && validate.name && (
                                            <div className="invalid-feedback">{ validate.name[0] }</div>
                                        )
                                    }
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseCreateModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                            <button type="button" className={`btn btn-primary ${fetching ? 'btn-disabled' : ''}`} disabled={fetching} onClick={this.handleSubmit}><i className="mdi mdi-content-save mr-2"></i>{ updatedId ? 'Simpan Perubahan' : 'Simpan' }</button>
                        </div>
                    </Modal>


                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <button onClick={this.handleCreateModal} className="btn btn-primary"><i className="mdi mdi-plus mr-2"></i>Tambah Baru</button>
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

                                ) : categories && categories.length > 0 ? categories.map(unit => {
                                    return (
                                        <tr key={unit._id}>
                                            <td>{ unit.name }</td>
                                            <td className="text-center"><input type="checkbox" value={unit._id} onClick={this.handleActive} defaultChecked={unit.deleted_at ? false : true } /></td>
                                            <td>
                                                <button onClick={() => this.handleDeleteModal(unit._id)} className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                                <button onClick={() => this.handleUpdate(unit._id)} className="btn p-0 text-success btn-link btn-small">Ubah</button>
                                            </td>
                                        </tr>
                                    )
                                }) : (
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
        fetching: state.unit.fetching,
        error: state.unit.error,
        data: state.unit.data,
        type: state.unit.type,
        success: state.unit.success,
        message: state.unit.message,
        unit: state.unit.unit
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUnit: (params) => dispatch(fetchUnit(params)),
        toggleUnit: (id) => dispatch(toggleUnit(id)),
        deleteUnit: (id) => dispatch(deleteUnit(id)),
        saveUnit: (data) => dispatch(saveUnit(data)),
        getUnit: (id) => dispatch(getUnit(id)),
        updateUnit: (id, data) => dispatch(updateUnit(id, data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Unit))
