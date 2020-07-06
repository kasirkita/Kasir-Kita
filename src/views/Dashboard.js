import React, { Component, Fragment, useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { url } from '../global'
import { withToastManager } from 'react-toast-notifications'


function Dashboard(props) {

    const { toastManager } = props

    const [data, setData] = useState({
        sales: '',
        purchase: '',
        income: '',
        profit: ''
    })

    const [bestSeller, setBestSeller] = useState([])
    const [almostOut, setAlmostOut] = useState([])
    const [labels, setLabels] = useState([])
    const [dataPurchase, setDataPurchase] = useState([])
    const [dataSales, setDataSales] = useState([])

    useEffect(() => {
        if (sessionStorage.getItem('token')) {
            getChart()
            getAlmostOut()
            getBestSeller()
            getSummary()
        }
    }, [])

    const getSummary = () => {

        Axios.get(`${url}/dashboard`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            const {sales, income, purchase, profit} = res.data
            
            setData({
                ...data,
                sales,
                income,
                purchase,
                profit
            })

        }).catch(err => {
            if (err.response) {
                toastManager.add(err.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true
                })
            }
        })

    }

    const getBestSeller = () => {

        Axios.get(`${url}/dashboard/best-seller`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            const data = res.data.data
            
            setBestSeller(data)

        }).catch(err => {
            if (err.response) {
                toastManager.add(err.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true
                })
            }
        })
    }


    const getAlmostOut = () => {

        Axios.get(`${url}/dashboard/almost-out`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            const data = res.data.data
            
            setAlmostOut(data)

        }).catch(err => {
            if (err.response) {
                toastManager.add(err.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true
                })
            }
        })
    }

    const getChart = () => {

        Axios.get(`${url}/dashboard/chart`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then(res => {
            const data = res.data
            
            setLabels(data.labels)
            setDataPurchase(data.data_purchase)
            setDataSales(data.data_sales)
            
        }).catch(err => {
            if (err.response) {
                toastManager.add(err.response.data.message, {
                    appearance: 'error',
                    autoDismiss: true
                })
            }
        })
    }

    if (!sessionStorage.getItem('token')) {
        return <Redirect to="/login" />
    } else {

        const data = {
            labels: labels,
            datasets: [{
                label: 'Penjualan',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: dataSales,
                fill: false
            }, {
        
                label: 'Pembelian',
                backgroundColor: 'rgb(0, 123, 255)',
                borderColor: 'rgb(0, 123, 255)',
                data: dataPurchase,
                fill: false
            
            }]
        }

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
                                <h6 className="text-right">{data.sales}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Pembelian</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Total Pendapatan hari ini</h6>
                                <h6 className="text-right">{data.purchase}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Total Pendapatan</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Total Pendapatan hari ini</h6>
                                <h6 className="text-right">{data.income}</h6>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Keuntungan</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Total keuntungan hari ini</h6>
                                <h6 className="text-right">{data.profit}</h6>
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
                                {
                                    bestSeller && bestSeller.map(best => {
                                        return (
                                            <tr key={best._id}>
                                                <td>{best.product_name}</td>
                                                <td>{best.price}</td>
                                                <td>x{best.qty}</td>
                                            </tr>
                                        )
                                    })
                                }
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
                                    <th>Tersisa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    almostOut && almostOut.map(out => {
                                        return (
                                            <tr key={out._id}>
                                                <td>{out.name}</td>
                                                <td>{out.price_formatted}</td>
                                                <td>{out.qty && out.qty.amount} {out.unit && out.unit.name}</td>
                                            </tr>
                                        )
                                    })
                                }
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

export default withToastManager(Dashboard)
