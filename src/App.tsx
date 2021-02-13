import React from "react";
import "./App.css";
import HomePage from "./Components/HomePage";
import PostPage from "./Components/PostPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Rento Mojo</h1>
        <Switch>
          <Route exact path="/" children={<HomePage />} />
          <Route path="/posts/:id" children={<PostPage />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
