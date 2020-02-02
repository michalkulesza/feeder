import React from "react";
import TimeAgo from "timeago-react";
import MdTrash from "react-ionicons/lib/MdTrash";

import PostSocial from "../components/PostSocial";

const Post = ({ author, createdAt, content, authorsUid, currentUid, handleDelete, postKey }) => {
  const handleConfirmDelete = e => {
    e.currentTarget.parentElement
      .querySelector(".post-delete-confirmation")
      .classList.add("active");
  };

  const handleConfirmCancel = e => {
    e.currentTarget.parentElement.parentElement.parentElement.classList.remove("active");
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-left">
          <div className="post-avatar"></div>
          <span>
            <div className="post-author">{author}</div>
            <div className="post-time">
              <TimeAgo datetime={createdAt} />
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
    </div>
  );
};

export default Post;
