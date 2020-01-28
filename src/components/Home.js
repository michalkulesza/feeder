import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import InfoPost from "./InfoPost";
import PostsList from "./PostsList";

import getPosts from "../redux/actions/dataAction";

const Home = () => {
  const authenticated = useSelector(state => state.user.authenticated);
  const posts = useSelector(state => state.data);
  const dispatch = useDispatch();

  useEffect(() => {
    authenticated && dispatch(getPosts());
  }, [authenticated, dispatch]);

  return (
    <div className="container">
      <div className="home wrapper">
        {authenticated ? <PostsList posts={posts} /> : <InfoPost />}
      </div>
    </div>
  );
};

export default Home;
