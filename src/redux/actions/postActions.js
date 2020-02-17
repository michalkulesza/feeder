import { db } from "../../firebase/fireConfig";
import { enqueueSnackbar } from "./uiActions";
import { addPostToUser } from "./userAction";

export const addPost = (data, posts) => dispatch => {
  let docId = db.collection("posts").doc().id;
  let authorUid = data.uid;

  db.collection("posts")
    .doc(docId)
    .set(data)
    .then(() => {
      dispatch(addPostToUser(docId, authorUid, posts));
    })
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

export const likePost = (username, currentUid, postKey) => dispatch => {
  dispatch(addLikeToPost(username, currentUid, postKey));
  dispatch(addLikeToUser(currentUid, postKey));
};

export const addLikeToPost = (username, currentUid, postKey) => dispatch => {
  db.collection("posts")
    .doc(postKey)
    .get()
    .then(doc => {
      const data = doc.data();
      let likes = data.likes;
      let likesUid = data.likesUid;
      let likesUsers = data.likesUsers;

      likesUid.push(currentUid);
      likesUsers.push(username);
      likes = likes + 1;

      db.collection("posts")
        .doc(postKey)
        .update({
          likes,
          likesUid,
          likesUsers
        })
        .catch(err => {
          dispatch(
            enqueueSnackbar({
              message: `Error liking the post`,
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
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `Error liking the post`,
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

export const addLikeToUser = (currentUid, postKey) => dispatch => {
  db.collection("users")
    .doc(currentUid)
    .get()
    .then(doc => {
      const data = doc.data();
      let likedPostsUid = data.likedPostsUid;

      likedPostsUid.push(postKey);

      db.collection("users")
        .doc(currentUid)
        .update({
          likedPostsUid
        })
        .catch(err => {
          dispatch(
            enqueueSnackbar({
              message: `Error liking the post`,
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
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `Error liking the post`,
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

export const dislikePost = (username, currentUid, postKey) => dispatch => {
  dispatch(removeLikeFromPost(username, currentUid, postKey));
  dispatch(removeLikeFromUser(currentUid));
};

export const removeLikeFromPost = (username, currentUid, postKey) => dispatch => {
  db.collection("posts")
    .doc(postKey)
    .get()
    .then(doc => {
      const data = doc.data();
      let likes = data.likes;
      let likesUsers = data.likesUsers;
      let likesUid = data.likesUid;

      likes = likes - 1;
      likesUsers.splice(likesUsers.indexOf(username), 1);
      likesUid.splice(likesUid.indexOf(currentUid), 1);

      db.collection("posts")
        .doc(postKey)
        .update({
          likes,
          likesUid,
          likesUsers
        })
        .catch(err => {
          dispatch(
            enqueueSnackbar({
              message: `Error disliking the post`,
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
          console.erro(err);
        });
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `Error disliking the post`,
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

export const removeLikeFromUser = (currentUid, postKey) => dispatch => {
  db.collection("users")
    .doc(currentUid)
    .get()
    .then(doc => {
      let data = doc.data();
      let likedPostsUid = data.likedPostsUid;
      likedPostsUid.splice(likedPostsUid.indexOf(postKey), 1);

      db.collection("users")
        .doc(currentUid)
        .update({
          likedPostsUid
        })
        .catch(err => {
          console.error(err);
          dispatch(
            enqueueSnackbar({
              message: `Error disliking the post`,
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
        });
    })
    .catch(err => {
      dispatch(
        enqueueSnackbar({
          message: `Error disliking the post`,
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
