import React from "react";
import {Switch, Route, Link} from "react-router-dom";
import './App.css';
import HomePage from "./Pages/homepage/homepage.component";

const HatsPage = props => (
  <div>
    <button onClick={() => props.history.push("./hats/topi") }>Topi</button>
    <h1>HATS PAGE</h1>
  </div>
)

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/hats" component={HatsPage} />
      </Switch>
    </div>
  );
}

export default App;
