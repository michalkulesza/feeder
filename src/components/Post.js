import React from "react";
import TimeAgo from "timeago-react";

const Post = props => {
  return (
    <div className="post">
      <div className="post-header">
        <div className="post-left">
          <div className="post-avatar"></div>
          <span>
            <div className="post-author">{props.author}</div>
            <div className="post-time">
              <TimeAgo datetime={props.createdAt} />
            </div>
          </span>
        </div>
        <div className="post-body">{props.content}</div>
      </div>
      <div className="post-misc"></div>
    </div>
  );
};

export default Post;
