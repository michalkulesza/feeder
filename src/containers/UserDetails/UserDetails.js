import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import Moment from "react-moment";
import "./UserDetails.scss";

import { Post } from "../../components";

import avatar from "../../res/avatar-default.png";

const UserDetails = ({ match }) => {
	useFirestoreConnect([{ collection: "userNames" }]);
	useFirestoreConnect([{ collection: "users" }]);
	useFirestoreConnect([{ collection: "posts" }]);
	const { userNames, users } = useSelector(state => state.firestore.data);
	const posts = useSelector(state => state.firestore.ordered.posts);
	const user = match?.params?.id;

	const [searchedUsersUid, setSearchedUsersUid] = useState(null);
	const [searchedUser, setSearchedUser] = useState(null);
	const [activeDisplay, setActiveDisplay] = useState(null);

	useEffect(() => {
		if (user && userNames && !searchedUsersUid) {
			userNames[user] && setSearchedUsersUid(userNames[user].uid);
		}

		if (searchedUsersUid && users) {
			users[searchedUsersUid] && setSearchedUser(users[searchedUsersUid]);
		}
	}, [user, userNames, searchedUsersUid, users]);

	return (
		<>
			<div className="userdetails">
				{searchedUser ? (
					<>
						<div className="userdetails-info">
							<div className="userdetails-avatar">
								<img src={avatar} alt="" />
							</div>
							<span>
								<div className="userdetails-name">{searchedUser.username}</div>
								<div className="userdetails-joined">
									Joined on:
									<Moment id="userdetails-date" format="D MMM YYYY">
										{searchedUser.joined}
									</Moment>
								</div>
							</span>
						</div>
						<div className="userdetails-stats">
							<div
								className={activeDisplay === "likes" ? "userdetails-stat active" : "userdetails-stat"}
								onClick={() => setActiveDisplay("likes")}
							>
								<span>{searchedUser.likedPostsUid ? searchedUser.likedPostsUid.length : "-"}</span> <p>Likes</p>
							</div>
							<div
								className={activeDisplay === "posts" ? "userdetails-stat active" : "userdetails-stat"}
								onClick={() => setActiveDisplay("posts")}
							>
								<span>{searchedUser.posts ? searchedUser.posts.length : "-"}</span> <p>Posts</p>
							</div>
						</div>
					</>
				) : (
					<div className="userdetails-empty">Loading...</div>
				)}
			</div>
			{activeDisplay === "likes" ? (
				searchedUser.likedPostsUid.length > 0 ? (
					searchedUser.likedPostsUid.map(like =>
						posts.map(post => post.id === like && <Post post={post} disableLike={true} />)
					)
				) : (
					<div className="noti-container">
						<span>User didn't liked any post yet...</span>
					</div>
				)
			) : activeDisplay === "posts" ? (
				searchedUser.posts.length > 0 ? (
					searchedUser.posts.map(userPost => {
						return posts.map(post => post.id === userPost && <Post post={post} disableLike={true} />);
					})
				) : (
					<div className="noti-container">
						<span>User doesn't have any posts yet...</span>
					</div>
				)
			) : null}
		</>
	);
};

export default UserDetails;
