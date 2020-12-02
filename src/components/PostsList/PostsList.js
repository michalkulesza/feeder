import React from "react";
import { Post } from "../../components";

const PostsList = ({ posts, uid, handleDelete, username }) => {
	return posts
		? posts.length > 0 &&
				posts.map(post => <Post post={post} currentUid={uid} handleDelete={handleDelete} username={username} />)
		: null;
};

export default PostsList;
