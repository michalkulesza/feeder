import React from "react";

const PostSocial = ({
  likes,
  likesUid,
  likesUsers,
  currentUid,
  handleLike,
  handleDislike,
  username,
  author,
  postKey
}) => {
  return (
    <div className="post-social">
      <span>
        <p>Likes: {likes}</p>
        {likes > 0 && likesUid.length > 0 ? (
          likesUid.map(like => {
            if (like === currentUid) {
              return (
                <div
                  className="button red"
                  onClick={() => handleDislike(username, currentUid, postKey)}
                  key={`${currentUid}${new Date()}`}
                >
                  Dislike
                </div>
              );
            } else {
              return (
                <div
                  className="button"
                  onClick={() => handleLike(username, currentUid, postKey)}
                  key={`${currentUid}${new Date()}`}
                >
                  Like
                </div>
              );
            }
          })
        ) : (
          <div
            className="button"
            onClick={() => handleLike(username, currentUid, postKey)}
            key={`${currentUid}${new Date()}`}
          >
            Like
          </div>
        )}
      </span>
    </div>
  );
};

export default PostSocial;
