import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Components
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/signup" component={SignUp}></Route>
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
