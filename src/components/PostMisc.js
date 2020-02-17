import React from "react";
import "./PostMisc.scss";

const PostMisc = ({ active, handleNewPost }) => {
  return (
    <div className={active ? "post-misc active" : "post-misc"}>
      <span></span>

      <div className="right">
        <div className="button green" onClick={handleNewPost}>
          Send it
        </div>
      </div>
    </div>
  );
};

export default PostMisc;
