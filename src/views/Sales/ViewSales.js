import React, { Component, Fragment } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { getSales } from '../../store/actions/SalesActions'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { Link } from 'react-router-dom'
class ViewSales extends Component {
    
    componentDidMount() {
        this.props.getSales(this.props.match.params.id)
    }

    render() {
        const { sales } = this.props
        return (
           <Fragment>
               <div className="row p-3">
                    
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>{ sales && sales.number }</h1>
                            </div>
                            <div className="col-md-4 text-right">
                                <Link className="btn btn-secondary" to="/sales"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
                            </div>
                        </div>
                        <hr/>
                    </div>

                    <div className="col-md-12 mt-3">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <th style={{ width: 200 }}>Pelanggan</th>
                                            <td>{ sales && sales.customer ? sales.customer.name : '-' }</td>
                                            <th style={{ width: 200 }}>Kasir</th>
                                            <td>{ sales && sales.user ? sales.user.name : '-' }</td>
                                        </tr>
                                        <tr>
                                           <th style={{ width: 200 }}>Metode Pembayaran</th>
                                            <td>{ sales && sales.payment_type === 'cash' ? 'Tunai' : 'Kartu' }</td>
                                            <th style={{ width: 200 }}>Status</th>
                                            <td>{ sales && sales.status === 'done' ? <span className="badge badge-success">Selesai</span> : <span className="badge badge-danger">Ditahan</span> }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-12 mt-4">
                                <h2 className="text-secondary">Belanjaan</h2>
                                <table className="table mt-4 mb-5">
                                    <thead>
                                        <tr>
                                            <th>Nama Barang</th>
                                            <th>Harga</th>
                                            <th>Kuantitas</th>
                                            <th>Diskon</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            sales && sales.details ? sales.details.map(detail => {

                                                return (
                                                    <tr key={detail._id}>
                                                        <td>{detail.product_name}</td>
                                                        <td className="text-right">{detail.price_formatted}</td>
                                                        <td className="text-center">{detail.qty} {detail.unit_name}</td>
                                                        <td className="text-right">-{detail.discount_formatted}</td>
                                                        <td className="text-right">{detail.subtotal_formatted}</td>
                                                    </tr>
                                                )

                                            }) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center">Tidak ada data</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                    {
                                        sales && sales.details && (
                                            <tfoot>
                                                <tr>
                                                    <th colSpan="4" className="text-right">Subtotal</th>
                                                    <td className="text-right">{sales && sales.subtotal_formatted}</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="4" className="text-right">Pajak</th>
                                                    <td className="text-right">{sales && sales.tax_formatted}</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="4" className="text-right">Total Diskon</th>
                                                    <td className="text-right">-{sales && sales.total_discount_formatted}</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="4" className="text-right">Total</th>
                                                    <td className="text-right">{sales && sales.total_formatted}</td>
                                                </tr>
                                                {
                                                    sales && sales.payment_type === 'cash' && (
                                                    
                                                        <Fragment>
                                                            <tr>
                                                                <th colSpan="4" className="text-right">Pembayaran</th>
                                                                <td className="text-right">{sales && sales.amount_formatted}</td>
                                                            </tr>
                                                            <tr>
                                                                <th colSpan="4" className="text-right">Kembalian</th>
                                                                <td className="text-right">{sales && sales.change_formatted}</td>
                                                            </tr>
                                                        </Fragment>
                                                    ) 
                                                }
                                            </tfoot>
                                        )
                                    }
                                </table>
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
        ...state,
        sales: state.sales.sales
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSales: id => dispatch(getSales(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewSales))
