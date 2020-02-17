import React from "react";
import "./PostSocial.scss";
import { Link } from "react-router-dom";

const PostSocial = ({
  likes,
  likesUid,
  likesUsers,
  currentUid,
  handleLike,
  handleDislike,
  username,
  author,
  postKey,
  disableLike
}) => {
  return (
    <div className="post-social">
      <div className="post-social-liked">
        {likesUsers && likesUsers.length > 0 && <span>Liked by: </span>}
        {likesUsers && likesUsers.length > 0
          ? likesUsers.map(user => {
              return (
                <Link to={`/user/${user}`} key={new Date().getTime() * Math.random()}>
                  <div id="social-liked-by">{user}</div>
                </Link>
              );
            })
          : ""}
      </div>
      <span>
        <p>Likes: {likes}</p>
        {disableLike !== true &&
        likes > 0 &&
        likesUid.length > 0 &&
        likesUid.includes(currentUid) ? (
          <div
            className="button red"
            onClick={() => handleDislike(username, currentUid, postKey)}
            key={new Date().getTime() * Math.random()}
          >
            Dislike
          </div>
        ) : disableLike !== true ? (
          <div
            className="button"
            onClick={() => handleLike(username, currentUid, postKey)}
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
