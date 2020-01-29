import { auth } from "../../firebase/fireConfig";
import { db } from "../../firebase/fireConfig";

export const loginUser = (data, history) => dispatch => {
  auth
    .signInWithEmailAndPassword(data.email, data.password)
    .then(data => {
      dispatch({ type: "REMOVE_ERROR", location: "login", error: null });
      dispatch({ type: "SET_USER", uid: data.user.uid, email: data.user.email });
      history.push("/");
    })
    .catch(err => {
      dispatch({ type: "SET_ERROR", location: "login", error: err });
      console.error(err);
    });
};

export const logoutUser = history => dispatch => {
  auth
    .signOut()
    .then(() => {
      dispatch({ type: "SET_UNAUTHENTICATED" });
      history.push("/login");
    })
    .catch(err => console.error(err));
};

export const signupUser = (user, history) => dispatch => {
  auth
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(data => {
      dispatch({
        type: "SET_USER",
        uid: data.user.uid,
        email: data.user.email,
        username: user.username
      });
      dispatch(createUser(data.user.uid, user));
      history.push("/");
    })
    .catch(err => console.error(err));
};

export const createUser = (uid, user) => dispatch => {
  db.collection("users")
    .doc(uid)
    .set({
      username: user.username,
      email: user.email,
      uid
    })
    .catch(err => console.error(err));
};
