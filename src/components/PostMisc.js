import React from "react";

const PostMisc = ({ isActive, handleNewPost }) => {
  return (
    <div className={isActive ? "post-misc active" : "post-misc"}>
      <span></span>

      <div className="right">
        <div className="button" onClick={handleNewPost}>
          Send it
        </div>
      </div>
    </div>
  );
};

export default PostMisc;
