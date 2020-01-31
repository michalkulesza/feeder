import React from "react";
import { useSelector } from "react-redux";
import InfoPost from "./InfoPost";
import PostsList from "./PostsList";
import { useFirestoreConnect } from "react-redux-firebase";

const Home = () => {
  useFirestoreConnect([{ collection: "posts", orderBy: [["createdAt", "desc"]] }]);

  const authUid = useSelector(state => state.firebase.auth.uid);
  const posts = useSelector(state => state.firestore.ordered.posts);

  return (
    <div className="container">
      <div className="home wrapper">
        {authUid && posts ? (
          <PostsList posts={posts} />
        ) : authUid && !posts ? (
          <InfoPost>There are no posts yet.</InfoPost>
        ) : (
          <InfoPost>Please log in to see the feed.</InfoPost>
        )}
      </div>
    </div>
  );
};

export default Home;
