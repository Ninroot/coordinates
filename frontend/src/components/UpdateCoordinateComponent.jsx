import React, { Component } from "react";
import CoordinateService from "../services/CoordinateService";

class UpdateCoordinateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      longitude: "",
      latitude: "",
    };
    this.changeLongitudeHandler = this.changeLongitudeHandler.bind(this);
    this.changeLatitudeHandler = this.changeLatitudeHandler.bind(this);
    this.updateCoordinate = this.updateCoordinate.bind(this);
  }

  componentDidMount() {
    CoordinateService.getCoordinateById(this.state.id).then((res) => {
      let coordinate = res.data;
      this.setState({
        longitude: coordinate.longitude,
        latitude: coordinate.latitude,
      });
    });
  }

  updateCoordinate = (e) => {
    e.preventDefault();
    let coordinate = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    };
    console.log("coordinate => " + JSON.stringify(coordinate));
    console.log("id => " + JSON.stringify(this.state.id));
    CoordinateService.updateCoordinate(coordinate, this.state.id).then(
      (res) => {
        this.props.history.push("/coordinates");
      }
    );
  };

  changeLongitudeHandler = (event) => {
    this.setState({ longitude: event.target.value });
  };

  changeLatitudeHandler = (event) => {
    this.setState({ latitude: event.target.value });
  };

  cancel() {
    this.props.history.push("/coordinates");
  }

  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Update Coordinate</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Longitude:</label>
                    <input
                      placeholder="Longitude"
                      type="number"
                      name="longitude"
                      className="form-control"
                      value={this.state.longitude}
                      onChange={this.changeLongitudeHandler}
                    />
                  </div>
                  <div className="form-group">
                    <label>Latitude:</label>
                    <input
                      placeholder="Latitude"
                      type="number"
                      name="latitude"
                      className="form-control"
                      value={this.state.latitude}
                      onChange={this.changeLatitudeHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.updateCoordinate}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateCoordinateComponent;
