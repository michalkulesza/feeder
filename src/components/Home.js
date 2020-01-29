import React from "react";
import { useSelector } from "react-redux";
import InfoPost from "./InfoPost";
import PostsList from "./PostsList";
import { useFirestoreConnect } from "react-redux-firebase";

const Home = () => {
  useFirestoreConnect([{ collection: "posts", orderBy: [["createdAt", "desc"]] }]);
  const authenticated = useSelector(state => state.user.authenticated);
  const posts = useSelector(state => state.firestore.ordered);

  return (
    <div className="container">
      <div className="home wrapper">
        {authenticated && posts ? (
          <PostsList posts={posts.posts} />
        ) : authenticated && !posts ? (
          <InfoPost>There are no posts yet.</InfoPost>
        ) : (
          <InfoPost>Please log in to see the feed.</InfoPost>
        )}
      </div>
    </div>
  );
};

export default Home;
