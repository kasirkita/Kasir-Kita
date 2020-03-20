import React, { Component } from 'react'

class FullScreen extends Component {
    render() {
        return (
            <div className="container">
                {this.props.children}
            </div>
        )
    }
}

export default FullScreen
