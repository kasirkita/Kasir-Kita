import React, { Fragment, useState, useEffect } from 'react'
import Table from '../../components/Table';
import Modal from 'react-bootstrap4-modal';
import Error from '../Errors/Error';
import { withToastManager } from 'react-toast-notifications'
import { url } from '../../global';
import Axios from 'axios';
import Pagination from "react-js-pagination";

function Category (props) {

    const { toastManager } = props

    const [state, setState] = useState({
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
        title: 'Tambah kategori baru',
        name: ''
    })

    const [loading, setLoading] = useState(false)
    const [fetching, setFetching] = useState(false)
    const [categories, setCategories] = useState([])
    const [validate, setValidate] = useState(null)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        fetchCategory()
    }, [state.page, state.perpage, state.ordering, state.filter])

    const handleChange = (name) => (e) => {
        setState({
            ...state,
            [name]: e.target.value
        })
    }

    const handleSearch = () => {
        fetchCategory()
    }

    const handleSorting = (e) => {
        const type = e.target.id
        const sort = state.ordering.sort

        setState({
			...state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
        })
    }

    const handleDeleteModal = (id) => {
        setState({
            ...state,
            deleteModal: true,
            deletedId: id
        })
    }

    const handleDelete = () => {
        setLoading(true)
        Axios.delete(`${url}/category/${state.deletedId}`, {
            headers: {
                Authorizaion: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            toastManager.add(res.data.message, {
                appearance: 'success',
                autoDismiss: true
            })

            handleReset()
            fetchCategory()

        }).catch(err => {
            if (err.response) {
                if (err.response.status === 422) {
                    setValidate(err.respose)
                }
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleCloseDeleteModal = () => {
        setState({
            ...state,
            deleteModal: false
        })
    }

    const handleCreateModal = () => {
        setState({
            ...state,
            createModal: true
        })
    }

    const handleCloseCreateModal = () => {
        setState({
            ...state,
            createModal: false,
            title: 'Tambah kategori baru',
            name: '',
            updatedId: ''
        })
    }

    const handleChangeSelect = (name) => (e) => {

        setState({
			...state,
           [name]: e.target.value
        })

    }

    const handleClickPage = (page) => {

        setState({
            ...state,
            page
        })
    }

    const handleActive = (e) => {

        setLoading(true)
        Axios.post(`${url}/category/toggle/${e.target.value}`,{
            is_active: e.target.checked
        }, {
            headers: {
                Authorizaion: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            toastManager.add(res.data.message, {
                appearance: 'success',
                autoDismiss: true
            })

        }).catch(err => {
            if (err.response) {
                if (err.response.status === 422) {
                    setValidate(err.respose)
                }
            }
        }).finally(() => {
            setLoading(false)
        })

    }

    const handleSubmit = () => {

        let apiUrl
        if (state.updatedId) {
            apiUrl = `${url}/category/${state.updatedId}`
        } else {
            apiUrl = `${url}/category`
        }

        setLoading(true)

        Axios.post(apiUrl, {
            name: state.name
        }, {
            headers: {
                Authorizaion: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            toastManager.add(res.data.message, {
                appearance: 'success',
                autoDismiss: true
            })
            handleReset()
            fetchCategory()
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 422) {
                    setValidate(err.respose)
                }
            }
        }).finally(() => {
            setLoading(false)
        })

    }


    const fetchCategory = () => {
        setFetching(true)
        Axios.get(`${url}/category`, {
            params: {
                page: state.page,
                perpage: state.perpage,
                ordering: state.ordering,
                keyword: state.keyword,
                filter: state.filter
            },
            headers: {
                Authorizaion: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            setCategories(res.data.data)
            setTotal(res.data.count)
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 422) {
                    setValidate(err.respose)
                }
            }
        }).finally(() => {
            setFetching(false)
        })
    }

    const getCategory = (id) => {
        setLoading(true)
        Axios.get(`${url}/category/${id}`, {
            headers: {
                Authorizaion: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {

            const data = res.data.data

            setState({
                ...state,
                updatedId: data._id,
                name: data.name,
                createModal: true,
                title: 'Ubah kategori'
            })

        }).catch(err => {
            if (err.response) {
                if (err.response.status === 422) {
                    setValidate(err.respose)
                }
            }
        }).finally(() => {
            setLoading(false)
        })
    }

    const handleReset = () => {
        setState({
            ...state,
            deleteModal: false,
            createModal: false,
            deletedId: '',
            updatedId: '',
            title: 'Tambah kategori baru',
            name: ''
        })
    }

    
    const { ordering, deleteModal, createModal, perpage, title, updatedId, name } = state

    const theads = [
        { name: 'name', value: 'Nama', sortable: true },
        { name: 'is_active', value: 'Aktif', sortable: false },
        { name: 'options', value: 'Opsi', sortable: false }
    ]

    return (
        <Fragment>
            <div className="row p-3"> 

                <div className="col-md-12">
                    <h1>Kategori</h1>
                    <hr/>
                </div>

                {/* delete modal */}

                <Modal visible={deleteModal} dialogClassName="modal-sm" onClickBackdrop={handleCloseDeleteModal}>
                    <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={handleCloseDeleteModal}>&times;</button>
                    <div className="modal-header">
                        <h5 className="modal-title">Hapus kategori</h5>
                    </div>
                    <div className="modal-body">
                        <p>Apakah anda yakin? Harap berhati-hati, data yang di hapus tidak bisa di kembalikan, gunakan opsi jangan centang aktif untuk menonaktifkan kategori</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseDeleteModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                        <button type="button" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`} disabled={loading} onClick={handleDelete}><i className="mdi mdi-alert mr-2"></i>Hapus data</button>
                    </div>
                </Modal>

                {/* add category modal */}

                <Modal visible={createModal} dialogClassName="modal-md" onClickBackdrop={handleCloseCreateModal}>
                    <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={handleCloseCreateModal}>&times;</button>
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        {/* <form > */}
                            <div className="form-group">
                                <label className="control-label">Nama</label>
                                <input type="text" onKeyPress={(e) => (e.key === 'Enter') && handleSubmit() } value={name} onChange={handleChange('name')} className={`form-control ${validate && validate.name ? 'is-invalid' : ''}`} placeholder="Nama kategori" />
                                {
                                    validate && validate.name && (
                                        <div className="invalid-feedback">{ validate.name }</div>
                                    )
                                }
                            </div>
                        {/* </form> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseCreateModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                        <button type="button" className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`} disabled={loading} onClick={handleSubmit}><i className="mdi mdi-content-save mr-2"></i>{ updatedId ? 'Simpan Perubahan' : 'Simpan' }</button>
                    </div>
                </Modal>


                <div className="col-md-12 mt-3">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="d-flex justify-content-start">
                                <button onClick={handleCreateModal} className="btn btn-primary"><i className="mdi mdi-plus mr-2"></i>Tambah Baru</button>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="d-flex justify-content-end">
                                <div className="form-group mr-4">
                                    <label className="control-label">Filter</label>
                                    <select className="form-control" onChange={handleChangeSelect('filter')}>
                                        <option value="all">Semua</option>
                                        <option value="active">Hanya yang aktif</option>
                                        <option value="inactive">Hanya yang tidak aktif</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label className="control-label">Pencarian</label>
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" onKeyPress={(e) => (e.key === 'Enter') && handleSearch() } onChange={handleChange('keyword')} placeholder="Kata kunci"/>
                                        <div className="input-group-prepend">
                                            <button className="btn btn-secondary" onClick={handleSearch} type="button"><i className="mdi mdi-magnify"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 mt-3">
                    <Table theads={theads} ordering={ordering} handleSorting={handleSorting}>
                    {
                            fetching ? (
                                <tr>
                                    <td className="text-center" colSpan="6"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading ...</td>
                                </tr>

                            ) : categories && categories.length > 0 ? categories.map(category => {
                                return (
                                    <tr key={category._id}>
                                        <td>{ category.name }</td>
                                        <td className="text-center"><input type="checkbox" value={category._id} onClick={handleActive} defaultChecked={category.isActive} /></td>
                                        <td>
                                            <button onClick={() => handleDeleteModal(category._id)} className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                            <button onClick={() => getCategory(category._id)} className="btn p-0 text-success btn-link btn-small">Ubah</button>
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

                    { categories && categories.length > 1 && (
                        <p>Menampilkan { state.page } s/d { total < state.perpage ? total : state.perpage * state.page } dari { total } data</p>
                    )}

                    
                        <Pagination
                            activePage={state.page}
                            itemsCountPerPage={parseInt(state.perpage)}
                            totalItemsCount={total}
                            pageRangeDisplayed={5}
                            onChange={handleClickPage}
                            itemClass="page-item"
                            linkClass="page-link"
                        />
                    

                </div>

                <div className="col-md-6 mt-2 text-right">
                    <div className="d-flex justify-content-end">
                        <div className="form-group">
                            <label className="control-label">Tampilkan data perhalaman</label>
                            <select value={perpage} className="form-control" onChange={handleChangeSelect('perpage')}>
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


export default (withToastManager(Category))
