import React, { Component, Fragment } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { getPurchase } from '../../store/actions/PurchaseActions'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { Link } from 'react-router-dom'
class ViewPurchase extends Component {
    
    componentDidMount() {
        this.props.getPurchase(this.props.match.params.id)
    }

    render() {
        const { purchase } = this.props
        return (
           <Fragment>
               <div className="row p-3">
                    
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>{ purchase && purchase.number }</h1>
                            </div>
                            <div className="col-md-4 text-right">
                                <Link className="btn btn-secondary" to="/purchase"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
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
                                            <th style={{ width: 200 }}>Pemasok</th>
                                            <td>{ purchase && purchase.supplier ? purchase.supplier.name : '-' }</td>
                                            <th style={{ width: 200 }}>Penanggung Jawab</th>
                                            <td>{ purchase && purchase.in_charge ? purchase.in_charge.name : '-' }</td>
                                        </tr>
                                        <tr>
                                           <th style={{ width: 200 }}>Tanggal Pembelian</th>
                                            <td>{ purchase && purchase.payment_date_formatted }</td>
                                            <th style={{ width: 200 }}>Di buat oleh</th>
                                            <td>{ purchase && purchase.user ? purchase.user.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ width: 200 }}>Bukti</th>
                                            <td>{ purchase && purchase.evidence ? <a href={purchase.evidence_url}>{purchase.evidence} <i className="mdi mdi-download ml-2"></i></a> : '-' }</td>
                                            <th style={{ width: 200 }}>Catatan</th>
                                            <td>{ purchase && purchase.notes }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-12 mt-4">
                                <h2 className="text-secondary">Pembelian</h2>
                                <table className="table mt-4 mb-5">
                                    <thead>
                                        <tr>
                                            <th>Nama Barang</th>
                                            <th>Harga Beli</th>
                                            <th>Harga Jual</th>
                                            <th>Harga Grosir</th>
                                            <th>Kuantitas</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            purchase && purchase.details ? purchase.details.map(detail => {

                                                return (
                                                    <tr key={detail._id}>
                                                        <td>{detail.product_name}</td>
                                                        <td className="text-right">{detail.cost_formatted}</td>
                                                        <td className="text-right">{detail.price_formatted}</td>
                                                        <td className="text-right">{detail.wholesale_formatted}</td>
                                                        <td className="text-center">{detail.qty}</td>
                                                        <td className="text-right">{detail.subtotal_formatted}</td>
                                                    </tr>
                                                )

                                            }) : (
                                                <tr>
                                                    <td colSpan="6" className="text-center">Tidak ada data</td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                    {
                                        purchase && purchase.details && (
                                            <tfoot>
                                                <tr>
                                                    <th colSpan="5" className="text-right">Subtotal</th>
                                                    <td className="text-right">{purchase && purchase.subtotal_formatted}</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="5" className="text-right">Pajak</th>
                                                    <td className="text-right">{purchase && purchase.tax_formatted}</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="5" className="text-right">Total Diskon</th>
                                                    <td className="text-right">-{purchase && purchase.total_discount_formatted}</td>
                                                </tr>
                                                <tr>
                                                    <th colSpan="5" className="text-right">Total</th>
                                                    <td className="text-right">{purchase && purchase.total_formatted}</td>
                                                </tr>
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
        purchase: state.purchase.purchase
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPurchase: id => dispatch(getPurchase(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewPurchase))
