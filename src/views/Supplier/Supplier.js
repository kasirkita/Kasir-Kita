import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import Modal from 'react-bootstrap4-modal'

export class Supplier extends Component {

    state = {
        ordering: {
            type: 'name',
            sort: 'asc'
        },
        deleteModal: false
    }

    handleSorting = (e) => {
        const type = e.target.id
        const sort = this.state.ordering.sort
        this.setState({
			...this.state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
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

    render() {
        const { ordering, deleteModal } = this.state;

        const theads = [
            { name: 'name', value: 'Nama', sortable: true },
            { name: 'email', value: 'Email', sortable: true },
            { name: 'phone_number', value: 'Nomor Telfon', sortable: true },
            { name: 'is_active', value: 'Aktif', sortable: false },
            { name: 'options', value: 'Opsi', sortable: false }
        ];
        return (
            <Fragment>
                <div className="row p-3"> 

                    {/* delete modal */}

                    <Modal visible={deleteModal} dialogClassName="modal-sm" onClickBackdrop={this.handleCloseDeleteModal}>
                        <button className="btn btn-outline-secondary border-0 m-3 btn-close-modal" onClick={this.handleCloseDeleteModal}>&times;</button>
                        <div className="modal-header">
                            <h5 className="modal-title">Hapus pemasok</h5>
                        </div>
                        <div className="modal-body">
                            <p>Apakah anda yakin? Harap berhati-hati, data yang di hapus tidak bisa di kembalikan, gunakan opsi jangan centang aktif untuk menonaktifkan barang</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={this.handleCloseDeleteModal}><i className="mdi mdi-close mr-2"></i>Tutup</button>
                            <button type="button" className="btn btn-primary"><i className="mdi mdi-alert mr-2"></i>Hapus data</button>
                        </div>
                    </Modal>
                
                    <div className="col-md-12">
                        <h1>Pemasok</h1>
                        <hr/>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="d-flex justify-content-start">
                                    <Link to="/supplier/create" className="btn btn-primary mr-2"><i className="mdi mdi-plus mr-2"></i>Tambah Baru</Link>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex justify-content-end">
                                    <div className="form-group mr-4">
                                        <label className="control-label">Filter</label>
                                        <select className="form-control">
                                            <option value="all">Semua</option>
                                            <option value="active">Hanya yang aktif</option>
                                            <option value="inactiv">Hanya yang tidak aktif</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="control-label">Pencarian</label>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="Kata kunci"/>
                                            <div className="input-group-prepend">
                                                <button className="btn btn-secondary" type="button"><i className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
                            <tr>
                                <td>Yulianto Saparudin</td>
                                <td>yulianto.saparudin@gmail.com</td>
                                <td>089611081675</td>
                                <td className="text-center"><input type="checkbox" defaultChecked={true} /></td>
                                <td>
                                    <button onClick={this.handleDeleteModal} className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                    <button className="btn p-0 text-success btn-link btn-small mr-3">Ubah</button>
                                    <button className="btn p-0 text-info btn-link btn-small">Lihat</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Anthonio Joseph</td>
                                <td>anthoniojoseph1919@gmail.com</td>
                                <td>085229549820</td>
                                <td className="text-center"><input type="checkbox" defaultChecked={true} /></td>
                                <td>
                                    <button className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                    <button className="btn p-0 text-success btn-link btn-small mr-3">Ubah</button>
                                    <button className="btn p-0 text-info btn-link btn-small">Lihat</button>
                                </td>
                            </tr>
                           
                        </Table>
                        <hr/>
                    </div>

                    <div className="col-md-6 mt-2">
                        <p>Menampilkan 1 s/d 5 dari 1,290 data</p>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                                </li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item disabled"><a className="page-link" href="#">...</a></li>
                                <li className="page-item"><a className="page-link" href="#">625</a></li>
                                <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    <div className="col-md-6 mt-2 text-right">
                        <div className="d-flex justify-content-end">
                            <div className="form-group">
                                <label className="control-label">Tampilkan data perhalaman</label>
                                <select className="form-control">
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

export default Supplier
