import React from "react";

const PostMisc = ({ active, handleNewPost }) => {
  return (
    <div className={active ? "post-misc active" : "post-misc"}>
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
