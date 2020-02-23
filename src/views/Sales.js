import React, { Component, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import '../../node_modules/react-datepicker/dist/react-datepicker.css'
import Table from '../components/Table'

export class Sales extends Component {
    state = {
        start_date: new Date(),
        end_date: new Date(),
        ordering: {
            type: 'name',
            sort: 'asc'
        }
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

    render() {
        const { start_date, end_date, ordering } = this.state
        const theads = [
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
                                <td colSpan="6" className="text-center">Belum ada data</td>
                            </tr>
                        </Table>
                        <hr/>
                    </div>

                    <div className="col-md-6 mt-2">
                        <p>Menampilkan 0 s/d 0 dari 0 data</p>
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

export default Sales
