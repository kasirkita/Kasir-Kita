import React, { Component } from 'react'

export class Welcome extends Component {
    state = {
        agree: false
    }
    handleAgree = (e) => {
        this.setState({
            ...this.state,
            agree: e.target.checked
        })
    }
    render() {
        const { agree } = this.state
        return (
            <div className="d-flex justify-content-center align-content-center mt-5">
                <div className="col-8 border p-5">
                    <p><i className="mdi mdi-desktop-classic mr-2"></i>Kasir Kita 2.0</p>
                    <h1>Selamat Datang</h1>
                    <p>Baru pertama kali install ya? Ayo isi data nya dulu disini</p>
                    <hr />
                    <form>
                        <div className="form-group">
                            <label className="control-label">Siapa nama kamu?</label>
                            <input type="text" className="form-control" placeholder="Nama" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Apa email kamu?</label>
                            <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Masukin password?</label>
                                    <input type="password" className="form-control" placeholder="Password" />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label className="control-label">Ulangi passwordnya</label>
                                    <input type="password" className="form-control" placeholder="Ulangi Password" />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="control-label">Syarat dan Ketentuan</label>
                            <div className="term-and-condition">
                                <p>Aplikasi ini 100% Gratis, tetapi jika menginginkan penambahan fitur dan atau cara menjalakan aplikasi silahkan chat melalui whatsapp 089611081675 Adapun ketentuan pada penggunaan aplikasi ini adalah</p>
                                <ul>
                                    <li>Tidak boleh dikomersilkan dalam bentuk apapun</li>
                                    <li>Tidak boleh menyalin dan menyebarkan ulang kode tanpa sepengetahuan author</li>
                                    <li>Tidak boleh menghapus credit pada aplikasi</li>
                                </ul>
                                <p>Jika ingin berkontribusi, silahkan lakukan fork pada repository github ini : <a href="https://github.com/kasirkita/Kasir-Kita">https://github.com/kasirkita/Kasir-Kita</a></p>
                                <p>Bisa juga melaukan donasi untuk mendukung author dengan seikhlasnya disini</p>
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td>
                                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/kasirkita/Kasir-Kita/raw/master/github/dana.png"><img src="https://github.com/kasirkita/Kasir-Kita/raw/master/github/dana.png" alt="Dana" width="120" /></a>           
                                            </td>
                                            <td>
                                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/kasirkita/Kasir-Kita/raw/master/github/ovo.png"><img src="https://github.com/kasirkita/Kasir-Kita/raw/master/github/ovo.png" alt="Ovo" width="120" /></a>        
                                            </td>
                                            <td>
                                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/kasirkita/Kasir-Kita/raw/master/github/paypal.png"><img src="https://github.com/kasirkita/Kasir-Kita/raw/master/github/paypal.png" alt="Paypal" width="120" /></a>            
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="agree" checked={agree} onChange={this.handleAgree} />
                            <label className="form-check-label" htmlFor="agree">
                                Saya sudah setuju
                            </label>
                        </div>
                        <div className="row">
                            <div className="col-md-12 text-right">
                                {
                                    agree ? (
                                        <button className="btn btn-primary"><i className="mdi mdi-check mr-2"></i>Submit</button>
                                    ) : (
                                        <button className="btn btn-primary btn-disabled" disabled alt="Harus setuju dulu"><i className="mdi mdi-check mr-2"></i>Submit</button>
                                    )
                                }
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Welcome
