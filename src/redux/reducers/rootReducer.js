import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import userReducer from "./userReducer";
import uiReducer from "./uiReducers";

const rootReducer = combineReducers({
  user: userReducer,
  ui: uiReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
