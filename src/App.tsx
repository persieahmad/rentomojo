import React from "react";
import "./App.css";
import HomePage from "./Components/HomePage";
import PostPage from "./Components/PostPage";
import PostDetailsPage from "./Components/PostDetailsPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Rento Mojo</h1>
        <Switch>
          <Route exact path="/" children={<HomePage />} />
          <Route exact path="/posts/:id" children={<PostPage />} />
          <Route path="/postDetails/:id" children={<PostDetailsPage />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
