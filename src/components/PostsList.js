import React from "react";
import Post from "./Post";

function PostsList({ posts }) {
  return (
    <div>
      {posts.length > 0
        ? posts.map(post => (
            <Post
              content={post.body}
              author={post.userName}
              createdAt={post.createdAt}
              key={post.id}
            />
          ))
        : ""}
    </div>
  );
}

export default PostsList;
