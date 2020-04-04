import React, { Component, Fragment } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import { Link } from 'react-router-dom'
import { getExpense } from '../../store/actions/ExpenseActions'

class ViewExpense extends Component {
    
    componentDidMount() {
        this.props.getExpense(this.props.match.params.id)
    }

    render() {
        const { expense } = this.props
        return (
           <Fragment>
               <div className="row p-3">
                    
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-8">
                                <h1>{ expense && expense.number }</h1>
                            </div>
                            <div className="col-md-4 text-right">
                                <Link className="btn btn-secondary" to="/expense"><i className="mdi mdi-arrow-left mr-2"></i>Kembali</Link>
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
                                            <th style={{ width: 200 }}>Nama Toko / Pemasok</th>
                                            <td>{ expense && expense.supplier_name }</td>
                                            <th style={{ width: 200 }}>Penanggung Jawab</th>
                                            <td>{ expense && expense.in_charge ? expense.in_charge.name : '-' }</td>
                                        </tr>
                                        <tr>
                                           <th style={{ width: 200 }}>Tanggal Pembelian</th>
                                            <td>{ expense && expense.payment_date_formatted }</td>
                                            <th style={{ width: 200 }}>Di buat oleh</th>
                                            <td>{ expense && expense.user ? expense.user.name : '-'}</td>
                                        </tr>
                                        <tr>
                                            <th style={{ width: 200 }}>Bukti</th>
                                            <td>{ expense && expense.evidence ? <a href={expense.evidence_url}>{expense.evidence} <i className="mdi mdi-download ml-2"></i></a> : '-' }</td>
                                            <th style={{ width: 200 }}>Catatan</th>
                                            <td>{ expense && expense.notes }</td>
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
                                            <th>Qty</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ expense && expense.product_name}</td>
                                            <td>{ expense && expense.price_formatted}</td>
                                            <td>{ expense && expense.qty}</td>
                                            <td>{ expense && expense.total_formatted}</td>
                                        </tr>
                                    </tbody>
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
        expense: state.expense.expense
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getExpense: id => dispatch(getExpense(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewExpense))
