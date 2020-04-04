import React, { Component, Fragment } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Table from '../../components/Table'
import { fetchStockReport } from '../../store/actions/ReportActions'
import Error from '../Errors/Error'
import { connect } from 'react-redux'
import { withToastManager } from 'react-toast-notifications'
import FormatNumber from '../../components/FormatNumber'
import moment from 'moment'
import Axios from 'axios'
import { url } from '../../global'
import fileDownload from 'js-file-download'

class StockReport extends Component {
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
    
        this.props.fetchStockReport({
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

        this.props.fetchStockReport({
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
    
        this.props.fetchStockReport({
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

        
    
        this.props.fetchStockReport({
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

        this.props.fetchStockReport({
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
    
            Axios.get(`${url}/report-stock/print/pdf`, {
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

            Axios.get(`${url}/report-stock/print/excel`, {
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
    
        this.props.fetchStockReport({
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

        const stock = data && data.data
        
        const theads = [
            { name: 'created_at', value: 'Tanggal', sortable: true},
            { name: 'stock.product.name', value: 'Nama', sortable: true },
            { name: 'amount', value: 'Stok', sortable: true },
            { name: 'desciption', value: 'Keterangan', sortable: true },
            { name: 'user_id', value: 'Dibuat Oleh', sortable: false },
        ]
        return (
           <Fragment>
               <div className="row p-3"> 
                    <div className="col-md-12">
                        <h1>Laporan Stok</h1>
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
                                        <td className="text-center" colSpan="5"><i className="mdi mdi-loading mdi-spin mr-2"></i>Loading ...</td>
                                    </tr>

                                ) : stock && stock.length > 0 ? stock.map(stock => {
                                    return (
                                            <tr key={stock._id}>
                                                <td>{stock.created_at_formatted}</td>
                                                <td>{stock.stock && stock.stock.product && stock.stock.product.name}</td>
                                                <td>{stock.type === '+' ? <span className="text-success">+{stock.amount}</span> : <span className="text-danger">-{stock.amount}</span>} </td>
                                                <td>{stock.description}</td>
                                                <td>{stock.user ? stock.user.name : '-'}</td>
                                            </tr>
                                    )
                                })
                                
                                : (
                                    <tr>
                                        <td className="text-center" colSpan="5">Belum ada data</td>
                                    </tr>
                                )
                                
                            }
                        </Table>
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
        fetchStockReport: (params) => dispatch(fetchStockReport(params)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(StockReport))

