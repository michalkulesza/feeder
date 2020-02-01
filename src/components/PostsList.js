import React from "react";
import Post from "./Post";

function PostsList({ posts, uid, handleDelete }) {
  if (posts && uid) {
    return (
      posts.length > 0 &&
      posts.map(post => (
        <Post
          content={post.body}
          author={post.author}
          authorsUid={post.uid}
          postId={post.id}
          currentUid={uid}
          createdAt={post.createdAt}
          key={post.id}
          postKey={post.id}
          handleDelete={handleDelete}
        />
      ))
    );
  }
}

export default PostsList;
