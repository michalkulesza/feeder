import React from "react";
import Post from "./Post";

function PostsList({ posts, uid, handleDelete, username }) {
  if (posts) {
    return (
      posts.length > 0 &&
      posts.map(post => (
        <Post
          content={post.body}
          author={post.author}
          authorsUid={post.uid}
          postId={post.id}
          likes={post.likes}
          likesUid={post.likesUid}
          likesUsers={post.likesUsers}
          currentUid={uid}
          createdAt={post.createdAt}
          key={post.id}
          postKey={post.id}
          handleDelete={handleDelete}
          username={username}
        />
      ))
    );
  }
}

export default PostsList;
