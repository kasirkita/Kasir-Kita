import React, { Component } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'

class SetUrl extends Component {
    state = {
        url: '',
        error: '',
        loading: false,
        success: false
    }

    handleChange = (name) => (e) => {
        this.setState({
            ...this.state,
            [name]: e.target.value
        })
    }
    
    handleSave = () => {
        
        if (this.state.url) {

            this.setState({
                ...this.state,
                loading: true,
                error: ''
            })
    
            Axios.get(`${this.state.url}/test`).then(res => {

                localStorage.setItem('url', this.state.url)
                this.setState({
                    ...this.state,
                    loading: false,
                    success: true
                })

                window.location = window.location.href
              
            }).catch(err => {
                
                console.log(err)
                this.setState({
                    ...this.state,
                    loading: false,
                    error: 'URL backend tidak bisa terhubung',
                    success: false
                })
    
            })
        }

    }

    render() {

        const {
            error,
            url,
            loading
        } = this.state

        return (

            <div className="d-flex justify-content-center align-content-center mt-5">
                <div className="col-6">
                    <h4>Masukan URL Backend</h4>
                    <div className="col p-0">
                        <div className="form-group">
                            <label className="control-label">Silahkan masukan URL Backend <span className="text-danger">*</span></label>
                            <input type="text" className={`form-control ${error ? 'is-invalid' : ''}`} value={url} onChange={this.handleChange('url')} />
                            {
                                error && (
                                    <div className="invalid-feedback">{ error }</div>
                                )
                            }
                        </div>
                        <div className="form-group mt-4">
                            <button onClick={this.handleSave} className={`btn btn-primary mr-2 ${loading ? 'btn-disabled' : ''}`} disabled={loading} type="submit">{ loading ? (<i className="mdi mdi-loading mdi-spin mr-2"></i>) : (<i className="mdi mdi-content-save mr-2"></i>)}Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SetUrl)
