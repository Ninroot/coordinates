import React, { Component } from 'react'
import CoordinateService from '../services/CoordinateService'

class ViewCoordinateComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            coordinate: {}
        }
    }

    componentDidMount(){
        CoordinateService.getCoordinateById(this.state.id).then( res => {
            this.setState({coordinate: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Coordinate Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label>Longitude:</label>
                            <div> { this.state.coordinate.longitude }</div>
                        </div>
                        <div className = "row">
                            <label>Latitude:</label>
                            <div> { this.state.coordinate.latitude }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewCoordinateComponent
