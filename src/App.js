import React from "react";
import firebase from "firebase/app";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notifier from "./Notifier";
import { SnackbarProvider } from "notistack";

//Components
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Navbar from "./components/Navbar";
import UserProfile from "./components/UserProfile";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { createFirestoreInstance } from "redux-firestore";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";

//React redux firebase config
const rrfProps = {
  firebase,
  config: {
    userProfile: "users",
    useFirestoreForProfile: true
  },
  dispatch: store.dispatch,
  createFirestoreInstance
};

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <Router basename="/feeder">
            <div className="App">
              <Navbar />
              <Notifier />
              <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/signup" component={SignUp}></Route>
                <Route path="/user/:id" component={UserProfile}></Route>
              </Switch>
            </div>
          </Router>
        </ReactReduxFirebaseProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
