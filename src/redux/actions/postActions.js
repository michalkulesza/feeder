import { db } from "../../firebase/fireConfig";
import { enqueueSnackbar } from "./uiActions";

export const addPost = data => dispatch => {
  db.collection("posts")
    .doc()
    .set(data)
    .then(() => {
      dispatch(
        enqueueSnackbar({
          message: `Post added`,
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "info", //default, success, error, info, warning
            autoHideDuration: 4000,
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "center"
            }
          }
        })
      );
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `Error adding post`,
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

export const deletePost = data => dispatch => {
  db.collection("posts")
    .doc(data)
    .delete()
    .then(() => {
      dispatch(
        enqueueSnackbar({
          message: `Your post has been deleted`,
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
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `Error deleting the post`,
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
