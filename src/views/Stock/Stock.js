import React, { Component, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import '../../../node_modules/react-datepicker/dist/react-datepicker.css'
import Table from '../../components/Table'
import Select from 'react-select'
import Modal from 'react-bootstrap4-modal'

export class Stock extends Component {
    state = {
        start_date: new Date(),
        end_date: new Date(),
        ordering: {
            type: 'name',
            sort: 'asc'
        },
        modal: false
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

    changeDate = (name, date) => {
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

    render() {
        const { start_date, end_date, ordering, modal } = this.state
        const theads = [
            { name: 'notes', value: 'Catatan', sortable: true },
            { name: 'stock', value: 'Stok', sortable: true },
            { name: 'date', value: 'Tanggal', sortable: true }
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
                            <input type="number" className="form-control text-right" placeholder="0" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Catatan</label>
                            <textarea rows="5" className="form-control"></textarea>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary mr-2" onClick={this.handleSave}><i className="mdi mdi-content-save mr-2"></i>Simpan</button>
                        <button className="btn btn-secondary"><i className="mdi mdi-reload mr-2"></i>Reset</button>
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
                                            <input type="text" className="form-control" placeholder="Kata kunci"/>
                                            <div className="input-group-prepend">
                                                <button className="btn btn-secondary" type="button"><i className="mdi mdi-magnify"></i></button>
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
                                    <Select isClearable placeholder="Pilih Barang" defaultValue={{value: 1, label: '9191919281391 - ABC Alkaline AAA'}} options={[
                                        {
                                            label: '9191919281391 - ABC Alkaline AAA',
                                            value: 1
                                        }
                                    ]} />
                                </div>
                            </div>
                            <div className="col-md-6 text-right">
                                <div className="form-group">
                                    <label className="control-label">Stok Sekarang: 119</label>
                                    <br />
                                    <button className="btn btn-secondary" onClick={this.handleModal}>
                                        <i className="mdi mdi-adjust mr-2"></i>Penyesuaian
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
                            <tr>
                                <td>Pembelian</td>
                                <td className="text-center"><span className="text-danger">-1</span></td>
                                <td>10/02/2020</td>
                            </tr>
                            <tr>
                                <td>Stok Awal</td>
                                <td className="text-center"><span className="text-success">+120</span></td>
                                <td>05/02/2020</td>
                            </tr>
                        </Table>
                        <hr/>
                    </div>

                    <div className="col-md-6 mt-2">
                        <p>Menampilkan 1 s/d 1 dari 2 data</p>
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

export default Stock
