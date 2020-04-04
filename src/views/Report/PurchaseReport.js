import React, { Component, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Table from '../../components/Table'
import { fetchPurchaseReport } from '../../store/actions/ReportActions'
import Error from '../Errors/Error'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import FormatNumber from '../../components/FormatNumber'
import moment from 'moment'
import Axios from 'axios'
import { url } from '../../global'
import fileDownload from 'js-file-download'

class PurchaseReport extends Component {
    state = {
        start_date: new Date(),
        end_date: new Date(),
        ordering: {
            type: 'product_name',
            sort: 'asc'
        },
        keyword: '',
        page: 1,
        perpage: 10,
        downloading: false
    }

    handleSorting = (e) => {
        const type = e.target.id
        const sort = this.state.ordering.sort

        const {
            start_date,
            end_date,
            keyword,
            page,
            perpage,
        } = this.state
    
        this.props.fetchPurchaseReport({
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            },
            start_date,
            end_date,
            keyword,
            page,
            perpage,
        })

        this.setState({
			...this.state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
        })
    }

    handleSearch = () => {

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage
        } = this.state

        this.props.fetchPurchaseReport({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage
        })
    }

    changeDate = (name, date) => {

        
        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage
        } = this.state
    
        this.props.fetchPurchaseReport({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            [name]: date
        })
        

        this.setState({
            ...this.state,
            [name]: date
        })
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }

    handleChangeSelect = (name) => (e) => {

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
        } = this.state

        
    
        this.props.fetchPurchaseReport({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
            [name]: e.target.value
        })

        this.setState({
			...this.state,
           [name]: e.target.value
        })
    }

    handleClickPage = (page) => {

        const {
            start_date,
            end_date,
            ordering,
            keyword,
            perpage
        } = this.state

        this.props.fetchPurchaseReport({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage
        })

        this.setState({
            ...this.state,
            page
        })
    }

    handleDownload = (type) => {

        const {
            start_date,
            end_date
        } = this.state

        const {
            toastManager
        } = this.props

        this.setState({
            ...this.state,
            downloading: true
        })

        if (type === 'pdf') {
    
            Axios.get(`${url}/report-purchase/print/pdf`, {
                params: {
                    keyword: this.state.keyword,
                    start_date: moment(this.state.start_date).format('YYYY-MM-DD'),
                    end_date: moment(this.state.end_date).format('YYYY-MM-DD')
                },
                headers: {
                    Authorization:`Bearer ${sessionStorage.getItem('token')}`
                },
                responseType: 'blob'
            }).then(res => {
                
                fileDownload(res.data, `laporan_pembelian_barang_${moment(start_date).format('DD/MM/YYYY')}_sd_${moment(end_date).format('DD/MM/YYYY')}.pdf`);
    
                this.setState({
                    ...this.state,
                    downloading: false,
                })
    
            }).catch(err => {

                this.setState({
                    ...this.state,
                    downloading: false,
                })

                console.log(err)
            })

        } else {

            Axios.get(`${url}/report-purchase/print/excel`, {
                params: {
                    keyword: this.state.keyword,
                    start_date: moment(this.state.start_date).format('YYYY-MM-DD'),
                    end_date: moment(this.state.end_date).format('YYYY-MM-DD')
                },
                headers: {
                    Authorization:`Bearer ${sessionStorage.getItem('token')}`
                },
                responseType: 'blob'
            }).then(res => {
                
                fileDownload(res.data, `laporan_pembelian_barang_${moment(start_date).format('DD/MM/YYYY')}_sd_${moment(end_date).format('DD/MM/YYYY')}.xlsx`);
    
                this.setState({
                    ...this.state,
                    downloading: false,
                })
    
            }).catch(err => {

                this.setState({
                    ...this.state,
                    downloading: false,
                })

                console.log(err)
            })
            
        }
    }

    componentDidMount() {
        const {
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
        } = this.state
    
        this.props.fetchPurchaseReport({
            start_date,
            end_date,
            ordering,
            keyword,
            page,
            perpage,
        })
    }

    render() {
        const { start_date, end_date, ordering, perpage, downloading } = this.state

        const { data, fetching, error } = this.props

        if (error && error.status !== 422)
            return <Error title={error.statusText} message={error.data.message} code={error.status} connection={error.connection} />

        const purchase = data && data.data
        
        const theads = [
            { name: 'purchase.payment_date', value: 'Tanggal', sortable: false},
            { name: 'product_name', value: 'Nama', sortable: true },
            { name: 'price', value: 'Harga Jual', sortable: true },
            { name: 'cost', value: 'Harga Beli', sortable: true },
            { name: 'qty', value: 'Qty', sortable: true },
            { name: 'subtotal', value: 'Subtotal', sortable: true },
        ]
        return (
           <Fragment>
               <div className="row p-3"> 
                    <div className="col-md-12">
                        <h1>Laporan Pembelian Barang</h1>
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
                                            <input type="text" className="form-control" onKeyPress={(e) => (e.key === 'Enter') && this.handleSearch() } onChange={this.handleChange('keyword')} placeholder="Kata kunci"/>
                                            <div className="input-group-prepend">
                                                <button className="btn btn-secondary" onClick={this.handleSearch} type="button"><i className="mdi mdi-magnify"></i></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="dropdown">
                                    <button className={`btn btn-secondary dropdown-toggle ${downloading ? 'btn-disabled' : ''}`} disabled={downloading} id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {
                                            downloading ? <i className="mdi mdi-loading mdi-spin mr-2" /> : <i className="mdi mdi-download mr-2" />
                                        } Unduh
                                    </button>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <button onClick={() => this.handleDownload('pdf')} className="dropdown-item"><i className="mdi mdi-file-pdf mr-2"></i>PDF</button>
                                        <button onClick={() => this.handleDownload('excel')} className="dropdown-item"><i className="mdi mdi-file-excel mr-2"></i>Excel</button>
                                    </div>
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 mt-3">
                        <Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
                            {
                                fetching ? (
                                    <tr>
                                        <td className="text-center" colSpan="8"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading ...</td>
                                    </tr>

                                ) : purchase && purchase.length > 0 ? purchase.map(purchase => {
                                    return (
                                            <tr key={purchase._id}>
                                                <td>{purchase.purchase && purchase.purchase.payment_date_formatted}</td>
                                                <td>{purchase.product_name}</td>
                                                <td className="text-right">{purchase.price_formatted}</td>
                                                <td className="text-right">{purchase.cost_formatted}</td>
                                                <td className="text-right">{purchase.qty} {purchase.product && purchase.product.unit}</td>
                                                <td className="text-right">{purchase.subtotal_formatted}</td>
                                            </tr>
                                    )
                                })
                                
                                : (
                                    <tr>
                                        <td className="text-center" colSpan="8">Belum ada data</td>
                                    </tr>
                                )
                                
                            }
                        </Table>
                        <table className="table table-bordered">
                            <tfoot>
                                <tr>
                                    <td colSpan="4" className="text-right">Total Barang Dibeli</td>
                                    <td className="text-right">{data && data.total_purchased ? data.total_purchased : 0}</td>
                                </tr>
                                <tr>
                                    <td colSpan="4" className="text-right">Total Pembelian</td>
                                    <td className="text-right">{data && data.total_purchase ? data.total_purchase : <FormatNumber value={0} type="text" />}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <hr/>
                    </div>

                    <div className="col-md-6 mt-2">
                        { data && data.total > 1 && (
                                <p>Menampilkan { data && data.from.toLocaleString() } s/d { data && data.to.toLocaleString() } dari { data && data.total.toLocaleString() } data</p>
                            )}

                            {
                                data && data.total > 1 && (
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">

                                            { data.current_page > 1 && <li key="prev" className="page-item"><button onClick={ () => this.handleClickPage(data.current_page - 1) } className="page-link">Prev</button></li> }

                                            {
                                                data.pages.map((page, index) => {
                                                    return (
                                                        
                                                        <li key={index} className={`page-item ${page === '...' ? 'disabled' : '' } ${page === data.current_page ? 'active' : '' }`}><button onClick={ () => this.handleClickPage(page)} className="page-link">{page}</button></li>
                                                        
                                                    )
                                                })
                                            }

                                            { data.current_page < data.last_page && <li key="next" className="page-item"><button onClick={() => this.handleClickPage(data.current_page + 1)} className="page-link">Next</button></li> }


                                        </ul>
                                    </nav>
                                )
                            }
                    </div>

                    <div className="col-md-6 mt-2 text-right">
                        <div className="d-flex justify-content-end">
                            <div className="form-group">
                                <label className="control-label">Tampilkan data perhalaman</label>
                                <select value={perpage} className="form-control" onChange={this.handleChangeSelect('perpage')}>
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

const mapStateToProps = (state) => {
    return {
        fetching: state.report.fetching,
        error: state.report.error,
        data: state.report.data,
        type: state.report.type,
        success: state.report.success,
        message: state.report.message,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPurchaseReport: (params) => dispatch(fetchPurchaseReport(params)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(PurchaseReport))

