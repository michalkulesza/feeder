import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import userReducer from "./userReducer";
import dataReducer from "./dataReducer";
import miscReducer from "./miscReducer";

const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  misc: miscReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
