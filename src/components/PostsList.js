import React from "react";
import Post from "./Post";

function PostsList({ posts }) {
  return (
    <>
      {posts &&
        posts.length > 0 &&
        posts.map(post => (
          <Post content={post.body} author={post.author} createdAt={post.createdAt} key={post.id} />
        ))}
    </>
  );
}

export default PostsList;
