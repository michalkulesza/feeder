import { auth } from "../../firebase/fireConfig";
import { db } from "../../firebase/fireConfig";
import { enqueueSnackbar } from "./uiActions";

export const loginUser = (data, history) => dispatch => {
  auth
    .signInWithEmailAndPassword(data.email, data.password)
    .then(data => {
      dispatch({ type: "REMOVE_ERROR", location: "login", error: null });
      dispatch({ type: "SET_USER", uid: data.user.uid, email: data.user.email });
      dispatch(
        enqueueSnackbar({
          message: `Successfully logged in!`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success", //default, success, error, info, warning
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            }
          }
        })
      );
      history.push("/");
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `${err.message}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error", //default, success, error, info, warning
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            }
          }
        })
      );
      console.error(err.message);
    });
};

export const logoutUser = history => dispatch => {
  auth
    .signOut()
    .then(() => {
      history.push("/login");
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `${err.message}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error", //default, success, error, info, warning
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            }
          }
        })
      );
      console.error(err);
    });
};

export const signupUser = (user, history) => dispatch => {
  auth
    .createUserWithEmailAndPassword(user.email, user.password)
    .then(data => {
      dispatch(createUser(data.user.uid, user));
      dispatch(createUserName(data.user.uid, user.username));
      dispatch(
        enqueueSnackbar({
          message: `Account has been successfully created!`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success", //default, success, error, info, warning
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            }
          }
        })
      );
      history.push("/");
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `${err.message}`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error", //default, success, error, info, warning
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            }
          }
        })
      );
      console.error(err);
    });
};

export const createUserName = (uid, username) => dispatch => {
  db.collection("userNames")
    .doc(username)
    .set({
      uid
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `Error occured while creating user`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error", //default, success, error, info, warning
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            }
          }
        })
      );
      console.error(err);
    });
};

export const createUser = (uid, user) => dispatch => {
  db.collection("users")
    .doc(uid)
    .set({
      username: user.username,
      email: user.email,
      uid
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `Error occured while creating user`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error", //default, success, error, info, warning
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            }
          }
        })
      );
      console.error(err);
    });
};
