import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { deletePost } from "../redux/actions/postActions";
import { deleteUserLikes } from "../redux/actions/userAction";

import PostsList from "./PostsList";
import InfoPost from "./InfoPost";
import NewPost from "./NewPost";

const Home = () => {
  useFirestoreConnect([{ collection: "posts", orderBy: [["createdAt", "desc"]] }]);
  useFirestoreConnect([{ collection: "users" }]);

  const dispatch = useDispatch();
  const uid = useSelector(state => state.firebase.auth.uid);
  const posts = useSelector(state => state.firestore.ordered.posts);
  const username = useSelector(state => state.firebase.profile.username);
  const users = useSelector(state => state.firestore.data.users);

  const handleDeletePost = key => {
    let post = posts.find(post => {
      return post.id === key && post;
    });

    if (key && post) {
      dispatch(deleteUserLikes(post, users));
      dispatch(deletePost(key));
    }
  };

  return (
    <div className="container">
      <div className="home wrapper">
        {uid && posts ? (
          <>
            <NewPost uid={uid} username={username} />
            <PostsList
              posts={posts}
              uid={uid}
              handleDelete={handleDeletePost}
              username={username}
            />
          </>
        ) : uid && !posts ? (
          <>
            <NewPost uid={uid} username={username} />
            <InfoPost>There are no posts yet.</InfoPost>
          </>
        ) : (
          <InfoPost>Please log in to see the feed.</InfoPost>
        )}
      </div>
    </div>
  );
};

export default Home;
