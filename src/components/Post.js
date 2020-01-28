import React from "react";

const Post = props => {
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-left">
          <div className="post-avatar"></div>
          <span>
            <div className="post-author">{props.author}</div>
            <div className="post-time">{props.createdAt}</div>
          </span>
        </div>
        <div className="post-body">{props.content}</div>
      </div>
      <div className="post-misc"></div>
    </div>
  );
};

export default Post;
