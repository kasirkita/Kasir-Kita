import React from 'react'
import NumberFormat from 'react-number-format'

class FormatNumber extends React.Component {

    handleChangeNumber = (e) => {
        const { handleChangeNumber = false } = this.props

        if (handleChangeNumber) {
            handleChangeNumber(e)
        }
    }

    render() {
        const { value, validate, name, type = false } = this.props
        return <NumberFormat displayType={ type ? type : 'input'} decimalSeparator={sessionStorage.getItem('decimal_separator') === 'null' ? '' : sessionStorage.getItem('decimal_separator')} thousandSeparator={sessionStorage.getItem('thousand_separator') === 'null' ? '' : sessionStorage.getItem('thousand_separator')} prefix={sessionStorage.getItem('currency') === 'null' ? '' : sessionStorage.getItem('currency')} type="text" className={ type !== 'text' ? `form-control text-right ${validate && validate[name] && 'is-invalid'} ` : '' } onValueChange={(e) => this.handleChangeNumber(e)} value={value} placeholder={`${sessionStorage.getItem('currency') !== 'null' ? sessionStorage.getItem('currency') : '' } ${sessionStorage.getItem('decimal_separator') !== 'null' ? `0${sessionStorage.getItem('decimal_separator')}0` : '00' } `} />
    }
} 
export default FormatNumber
