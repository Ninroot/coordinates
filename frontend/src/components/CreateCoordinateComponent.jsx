import React, { Component } from "react";
import CoordinateService from "../services/CoordinateService";

class CreateCoordinateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      longitude: 0,
      latitude: 0,
    };
    this.changeLongitudeHandler = this.changeLongitudeHandler.bind(this);
    this.changeLatitudeHandler = this.changeLatitudeHandler.bind(this);
    this.saveOrUpdateCoordinate = this.saveOrUpdateCoordinate.bind(this);
  }

  componentDidMount() {
    if (this.state.id === "_add") {
      return;
    } else {
      CoordinateService.getCoordinateById(this.state.id).then((res) => {
        let coordinate = res.data;
        this.setState({
          longitude: coordinate.longitude,
          latitude: coordinate.latitude,
        });
      });
    }
  }
  saveOrUpdateCoordinate = (e) => {
    e.preventDefault();
    let coordinate = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    };
    console.log("coordinate => " + JSON.stringify(coordinate));

    if (this.state.id === "_add") {
      CoordinateService.createCoordinate(coordinate).then((res) => {
        this.props.history.push("/coordinates");
      });
    } else {
      CoordinateService.updateCoordinate(coordinate, this.state.id).then(
        (res) => {
          this.props.history.push("/coordinates");
        }
      );
    }
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

  getTitle() {
    if (this.state.id === "_add") {
      return <h3 className="text-center">Add Coordinate</h3>;
    } else {
      return <h3 className="text-center">Update Coordinate</h3>;
    }
  }
  render() {
    return (
      <div>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              {this.getTitle()}
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Longitude:</label>
                    <input
                      placeholder="Longitude (Float)"
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
                      placeholder="Latitude (Float)"
                      type="number"
                      name="latitude"
                      className="form-control"
                      value={this.state.latitude}
                      onChange={this.changeLatitudeHandler}
                    />
                  </div>

                  <button
                    className="btn btn-success"
                    onClick={this.saveOrUpdateCoordinate}
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

export default CreateCoordinateComponent;
