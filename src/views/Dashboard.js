import React, { Component, Fragment } from 'react'
import { Line } from 'react-chartjs-2'
import { Redirect } from 'react-router-dom'

const data = {
    labels: ['07:00', '08:00', '11:00', '14:00', '15:00', '16:00', '17:00'],
    datasets: [{
        label: 'Penjualan',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
        fill: false
    }, {

        label: 'Pembelian',
        backgroundColor: 'rgb(0, 123, 255)',
        borderColor: 'rgb(0, 123, 255)',
        data: [0, 0, 2, 6, 0, 3, 1],
        fill: false
    
    }]
}

class Dashboard extends Component {
    render() {
        if (!sessionStorage.getItem('token'))
            return <Redirect to="/login" />
        return (
            <Fragment>
                <div className="row p-3"> 
                
                    <div className="col-md-12">
                        <h1>Dashboard</h1>
                        <hr/>
                    </div>
                
                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Penjualan</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Total Penjualan hari ini</h6>
                                <h6 className="text-right">Rp. 500,000</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Pembelian</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Total Pendapatan hari ini</h6>
                                <h6 className="text-right">Rp. 200,000</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Pendapatan</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Total Pendapatan hari ini</h6>
                                <h6 className="text-right">Rp. 300,000</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Keuntungan</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Total keuntungan hari ini</h6>
                                <h6 className="text-right">Rp. 50,000</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 mt-4">
                        <h4 className="text-secondary mb-3">Produk Terlaris hari ini</h4>
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Nama</th>
                                    <th>Harga Jual</th>
                                    <th>Terjual</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>x10</td>
                                </tr>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>x10</td>
                                </tr>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>x10</td>
                                </tr>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>x10</td>
                                </tr>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>x10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-6 mt-4">
                        <h4 className="text-secondary mb-3">Stok hampir habis</h4>
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Nama</th>
                                    <th>Harga Jual</th>
                                    <th>Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>10</td>
                                </tr>
                                <tr>
                                    <td>Barang ABC</td>
                                    <td>Rp. 1,200</td>
                                    <td>10</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-12 mt-4">
                        <h4 className="text-secondary mb-3">Grafik penjualan dan pembelian hari ini</h4>
                        <Line data={data} />
                    </div>
                
                </div>
            </Fragment>
        )
    }
}

export default Dashboard
