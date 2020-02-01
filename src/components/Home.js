import React from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";

import PostsList from "./PostsList";
import InfoPost from "./InfoPost";
import NewPost from "./NewPost";

const Home = () => {
  useFirestoreConnect([{ collection: "posts", orderBy: [["createdAt", "desc"]] }]);

  const uid = useSelector(state => state.firebase.auth.uid);
  const posts = useSelector(state => state.firestore.ordered.posts);
  const userName = useSelector(state => state.firebase.profile.displayName);

  return (
    <div className="container">
      <div className="home wrapper">
        {uid && posts ? (
          <>
            <NewPost uid={uid} username={userName} />
            <PostsList posts={posts} uid={uid} />
          </>
        ) : uid && !posts ? (
          <>
            <NewPost uid={uid} username={userName} />
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
