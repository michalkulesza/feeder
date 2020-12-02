import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import { uiReducer } from "./uiReducers";
import { postReducer } from "./postReducers";

const rootReducer = combineReducers({
	ui: uiReducer,
	post: postReducer,
	firebase: firebaseReducer,
	firestore: firestoreReducer,
});

export default rootReducer;
