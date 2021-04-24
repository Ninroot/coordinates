import React, { Component } from "react";
import CoordinateService from "../services/CoordinateService";

class ListCoordinateComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordinates: [],
    };
    this.addCoordinate = this.addCoordinate.bind(this);
    this.editCoordinate = this.editCoordinate.bind(this);
    this.deleteCoordinate = this.deleteCoordinate.bind(this);
  }

  deleteCoordinate(id) {
    CoordinateService.deleteCoordinate(id).then((res) => {
      this.setState({
        coordinates: this.state.coordinates.filter(
          (coordinate) => coordinate.id !== id
        ),
      });
    });
  }
  viewCoordinate(id) {
    this.props.history.push(`/view-coordinate/${id}`);
  }
  editCoordinate(id) {
    this.props.history.push(`/add-coordinate/${id}`);
  }

  componentDidMount() {
    CoordinateService.getCoordinates().then((res) => {
      this.setState({ coordinates: res.data });
    });
  }

  addCoordinate() {
    this.props.history.push("/add-coordinate/_add");
  }

  render() {
    return (
      <div>
        <h2 className="text-center">Coordinates List</h2>
        <div className="row">
          <button className="btn btn-primary" onClick={this.addCoordinate}>
            {" "}
            Add Coordinate
          </button>
        </div>
        <br></br>
        <div className="row">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Longitude</th>
                <th>Latitude</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.coordinates.map((coordinate) => (
                <tr key={coordinate.id}>
                  <td>{coordinate.longitude}</td>
                  <td>{coordinate.latitude}</td>
                  <td>
                    <button
                      onClick={() => this.editCoordinate(coordinate.id)}
                      className="btn btn-info"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.deleteCoordinate(coordinate.id)}
                      className="btn btn-danger"
                    >
                      Delete{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => this.viewCoordinate(coordinate.id)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ListCoordinateComponent;
