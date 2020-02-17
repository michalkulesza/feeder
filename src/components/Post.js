import React from "react";
import "./Post.scss";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { likePost } from "../redux/actions/postActions";
import { dislikePost } from "../redux/actions/postActions";

import MdTrash from "react-ionicons/lib/MdTrash";
import PostSocial from "../components/PostSocial";
import avatar from "../res/avatar-default.png";

const Post = ({
  author,
  createdAt,
  content,
  authorsUid,
  currentUid,
  handleDelete,
  postKey,
  likes,
  likesUid,
  likesUsers,
  username
}) => {
  const dispatch = useDispatch();

  const handleConfirmDelete = e => {
    e.currentTarget.parentElement
      .querySelector(".post-delete-confirmation")
      .classList.add("active");
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

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-left">
          <div className="post-avatar">
            <img src={avatar} alt="" />
          </div>
          <span>
            <Link to={`/user/${author}`}>
              <div className="post-author">{author}</div>
            </Link>
            <div className="post-time">
              {/* <TimeAgo datetime={createdAt} /> */}
              <Moment fromNow>{createdAt}</Moment>
            </div>
          </span>
        </div>
        <div className="post-body">
          <p>{content}</p>
        </div>
        <div className="post-delete" onClick={handleConfirmDelete}>
          {authorsUid === currentUid ? <MdTrash className="icon-delete" /> : ""}
        </div>
        <div className="post-delete-confirmation">
          <div className="post-delete-confirmation-wrapper">
            <p>Are you sure that you want to delete this post?</p>
            <span>
              <div className="button red" onClick={() => handleDelete(postKey)}>
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
        likes={likes}
        likesUid={likesUid}
        likesUsers={likesUsers}
        currentUid={currentUid}
        handleLike={handleLike}
        handleDislike={handleDislike}
        postKey={postKey}
        author={author}
        username={username}
      />
    </div>
  );
};

export default Post;
