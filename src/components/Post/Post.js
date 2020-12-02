import React from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likePost, dislikePost } from "../../redux/actions/postActions";
import "./Post.scss";

import { PostSocial } from "../../components";

import MdTrash from "react-ionicons/lib/MdTrash";
import avatar from "../../res/avatar-default.png";

const Post = ({ post, currentUid, handleDelete, username }) => {
	const dispatch = useDispatch();

	const handleConfirmDelete = e => {
		e.currentTarget.parentElement.querySelector(".post-delete-confirmation").classList.add("active");
	};

	const handleConfirmCancel = e => {
		e.currentTarget.parentElement.parentElement.parentElement.classList.remove("active");
	};

	const handleLike = (username, currentUid, postKey) => {
		dispatch(likePost(username, currentUid, postKey));
	};
	const handleDislike = (username, currentUid, postKey) => {
		dispatch(dislikePost(username, currentUid, postKey));
	};

	return post ? (
		<div className="post">
			<div className="post-header">
				<div className="post-left">
					<div className="post-avatar">
						<img src={avatar} alt="" />
					</div>
					<span>
						<Link to={`/user/${post.author}`}>
							<div className="post-author">{post.author}</div>
						</Link>
						<div className="post-time">
							<Moment fromNow>{post.createdAt}</Moment>
						</div>
					</span>
				</div>
				<div className="post-body">
					<div dangerouslySetInnerHTML={{ __html: post.content }}></div>
				</div>
				<div className="post-delete" onClick={handleConfirmDelete}>
					{post.authorsUid === currentUid ? <MdTrash className="icon-delete" /> : ""}
				</div>
				<div className="post-delete-confirmation">
					<div className="post-delete-confirmation-wrapper">
						<p>Are you sure that you want to delete this post?</p>
						<span>
							<div className="button red" onClick={() => handleDelete(post.postKey)}>
								Delete
							</div>
							<div className="button" onClick={handleConfirmCancel}>
								Cancel
							</div>
						</span>
					</div>
				</div>
			</div>
			<PostSocial
				currentUid={currentUid}
				handleLike={handleLike}
				handleDislike={handleDislike}
				post={post}
				username={username}
			/>
		</div>
	) : null;
};

export default Post;
