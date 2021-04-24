import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ListCoordinateComponent from "./components/ListCoordinateComponent";
import CreateCoordinateComponent from "./components/CreateCoordinateComponent";
import ViewCoordinateComponent from "./components/ViewCoordinateComponent";

function App() {
  return (
    <div>
      <Router>
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListCoordinateComponent}></Route>
            <Route
              path="/coordinates"
              component={ListCoordinateComponent}
            ></Route>
            <Route
              path="/add-coordinate/:id"
              component={CreateCoordinateComponent}
            ></Route>
            <Route
              path="/view-coordinate/:id"
              component={ViewCoordinateComponent}
            ></Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
