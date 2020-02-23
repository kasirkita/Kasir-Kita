import React, { Component } from 'react'

export class FullScreen extends Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}

export default FullScreen
