import React from "react";
import { Post } from "../../components";

const PostsList = ({ posts, uid, handleDelete, username }) => {
	return posts
		? posts.length > 0 &&
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
		: null;
};

export default PostsList;
