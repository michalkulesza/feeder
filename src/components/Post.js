import React from "react";
import TimeAgo from "timeago-react";
import MdTrash from "react-ionicons/lib/MdTrash";

import PostSocial from "../components/PostSocial";

const Post = ({ author, createdAt, content, authorsUid, currentUid, handleDelete, postKey }) => {
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
        <div className="post-delete">
          {authorsUid === currentUid ? (
            <MdTrash className="icon-delete" onClick={() => handleDelete(postKey)} />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Post;
