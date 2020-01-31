import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import uiReducer from "./uiReducers";

const rootReducer = combineReducers({
  ui: uiReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
