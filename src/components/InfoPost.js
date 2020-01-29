import React from "react";

const InfoPost = props => {
  return (
    <div className="post info-post">
      <p>{props.children}</p>
    </div>
  );
};

export default InfoPost;
