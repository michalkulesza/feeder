import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import { deletePost } from "../redux/actions/postActions";
import { deleteLikesFromUser, deletePostFromUser } from "../redux/actions/userAction";

import { PostsList, InfoPost, NewPost } from "../components";
import "./Home.scss";

const Home = () => {
	useFirestoreConnect([{ collection: "posts", orderBy: [["createdAt", "desc"]] }]);
	useFirestoreConnect([{ collection: "users" }]);

	const dispatch = useDispatch();
	const uid = useSelector(state => state.firebase.auth.uid);
	const posts = useSelector(state => state.firestore.ordered.posts);
	const username = useSelector(state => state.firebase.profile.username);
	const users = useSelector(state => state.firestore.data.users);

	const handleDeletePost = key => {
		let post = posts.find(post => {
			return post.id === key && post;
		});

		if (key && post) {
			dispatch(deleteLikesFromUser(post, users));
			dispatch(deletePostFromUser(key, users[uid]));
			dispatch(deletePost(key));
		}
	};

	return (
		<div className="container">
			<div className="home wrapper">
				{uid && posts && posts.length > 0 ? (
					<>
						<NewPost uid={uid} username={username} users={users} />
						<PostsList posts={posts} uid={uid} handleDelete={handleDeletePost} username={username} />
					</>
				) : (uid && !posts) || (uid && posts === undefined) || (uid && posts.length === 0) ? (
					<>
						<NewPost uid={uid} username={username} />
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
