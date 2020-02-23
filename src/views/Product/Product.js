import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Table from '../../components/Table'
import Modal from 'react-bootstrap4-modal'

export class Product extends Component {

    state = {
        ordering: {
            type: 'name',
            sort: 'asc'
        },
        modal: false,
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
        const { ordering, modal, deleteModal } = this.state;

        const theads = [
            { name: 'name', value: 'Nama', sortable: true },
            { name: 'category.name', value: 'Kategori', sortable: true },
            { name: 'cost', value: 'Harga Jual', sortable: true },
            { name: 'stock', value: 'Stok', sortable: true },
            { name: 'is_active', value: 'Aktif', sortable: false },
            { name: 'options', value: 'Opsi', sortable: false }
        ];
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
                            <div className="dropzone-wrapper text-center py-4 my-3">
                                <p className="text-muted">Seret dan lepaskan</p>
                                <button className="btn btn-primary"><i className="mdi mdi-folder-open mr-2"></i>Jelajahi Berkas</button>
                            </div>
                            
                            <div className="row d-flex justify-content-start">
                                <div className="col">
                                    <div className="col-12">
                                        <small className="text-muted">* Format berkas .xls .xlsx atau .csv</small>
                                    </div>
                                    <div className="col-12">
                                        <small className="text-muted">* Ukuran maks 1Mb</small>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="col-12  d-flex justify-content-end">
                                        <button className="btn btn-success btn-sm"><i className="mdi mdi-download mr-2"></i>Unduh template</button>
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
                            <button type="button" className="btn btn-primary"><i className="mdi mdi-alert mr-2"></i>Hapus data</button>
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
                                    <button className="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="mdi mdi-printer mr-2"></i>Cetak label</button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">Cetak dengan thermal</a>
                                            <a className="dropdown-item" href="#">Cetak dengan PDF</a>
                                        </div>
                                </div>
                                <div className="d-flex justofy-content-start mt-2">
                                    <small className="text-muted">Barang terpilih (0)</small>
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
                                            <option value="active">Hanya yang dipilih</option>
                                            <option value="active">Hanya yang tidak dipilih</option>
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
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="1" />
                                        <label className="form-check-label" htmlFor="1">
                                            ABC Kopi Susu 18gr
                                        </label>
                                    </div>
                                </td>
                                <td>Minuman Sashet</td>
                                <td className="text-right">Rp. 1,500</td>
                                <td className="text-center">200</td>
                                <td className="text-center"><input type="checkbox" defaultChecked={true} /></td>
                                <td>
                                    <button onClick={this.handleDeleteModal} className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                    <button className="btn p-0 text-success btn-link btn-small mr-3">Ubah</button>
                                    <button className="btn p-0 text-info btn-link btn-small">Lihat</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="2" />
                                        <label className="form-check-label" htmlFor="2">
                                            ABC Asam Jawa 250ml
                                        </label>
                                    </div>
                                </td>
                                <td>Minuman</td>
                                <td className="text-right">Rp. 7,500</td>
                                <td className="text-center">180</td>
                                <td className="text-center"><input type="checkbox" defaultChecked={true} /></td>
                                <td>
                                    <button onClick={this.handleDeleteModal} className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                    <button className="btn p-0 text-success btn-link btn-small mr-3">Ubah</button>
                                    <button className="btn p-0 text-info btn-link btn-small">Lihat</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="3" />
                                        <label className="form-check-label" htmlFor="3">
                                            ABC Extra Pedas 135ml
                                        </label>
                                    </div>
                                </td>
                                <td>Bumbu Masak</td>
                                <td className="text-right">Rp. 9,500</td>
                                <td className="text-center">500</td>
                                <td className="text-center"><input type="checkbox" defaultChecked={true} /></td>
                                <td>
                                    <button onClick={this.handleDeleteModal} className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                    <button className="btn p-0 text-success btn-link btn-small mr-3">Ubah</button>
                                    <button className="btn p-0 text-info btn-link btn-small">Lihat</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="4" />
                                        <label className="form-check-label" htmlFor="4">
                                            ABC Kecap Extra Pedas 135ml
                                        </label>
                                    </div>
                                </td>
                                <td>Bumbu Masak</td>
                                <td className="text-right">Rp. 10,500</td>
                                <td className="text-center">120</td>
                                <td className="text-center"><input type="checkbox" defaultChecked={true} /></td>
                                <td>
                                    <button onClick={this.handleDeleteModal} className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
                                    <button className="btn p-0 text-success btn-link btn-small mr-3">Ubah</button>
                                    <button className="btn p-0 text-info btn-link btn-small">Lihat</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="5" />
                                        <label className="form-check-label" htmlFor="5">
                                            ABC Kecap Manis 135ml
                                        </label>
                                    </div>
                                </td>
                                <td>Bumbu Masak</td>
                                <td className="text-right">Rp. 1,500</td>
                                <td className="text-center">120</td>
                                <td className="text-center"><input type="checkbox" defaultChecked={true} /></td>
                                <td>
                                    <button onClick={this.handleDeleteModal} className="btn p-0 text-danger btn-link btn-small mr-3">Hapus</button>
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

export default Product
