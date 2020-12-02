import React from "react";
import { Link } from "react-router-dom";

import "./PostSocial.scss";

const PostSocial = ({ currentUid, handleLike, handleDislike, username, post }) => {
	return (
		<div className="post-social">
			<div className="post-social-liked">
				{post?.likesUsers && post.likesUsers.length > 0 && <span>Liked by: </span>}
				{post?.likesUsers && post.likesUsers.length > 0
					? post?.likesUsers.map(user => {
							return (
								<Link to={`/user/${user}`} key={new Date().getTime() * Math.random()}>
									<div id="social-liked-by">{user}</div>
								</Link>
							);
					  })
					: ""}
			</div>
			<span>
				<p>Likes: {post?.likes}</p>
				{post?.disableLike !== true &&
				post?.likes > 0 &&
				post?.likesUid?.length > 0 &&
				post?.likesUid?.includes(currentUid) ? (
					<div
						className="button red"
						onClick={() => handleDislike(username, currentUid, post.postKey)}
						key={new Date().getTime() * Math.random()}
					>
						Dislike
					</div>
				) : post.disableLike !== true ? (
					<div
						className="button"
						onClick={() => handleLike(username, currentUid, post.postKey)}
						key={new Date().getTime() * Math.random()}
					>
						Like
					</div>
				) : null}
			</span>
		</div>
	);
};

export default PostSocial;
