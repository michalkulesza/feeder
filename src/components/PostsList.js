import React from "react";
import Post from "./Post";

function PostsList({ posts, uid }) {
  if (posts && uid) {
    return (
      posts.length > 0 &&
      posts.map(post => (
        <Post
          content={post.body}
          author={post.author}
          authorsUid={post.uid}
          currentUid={uid}
          createdAt={post.createdAt}
          key={post.id}
        />
      ))
    );
  }
}

export default PostsList;
