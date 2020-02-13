import React, { useEffect, useState } from "react";
import avatar from "../res/avatar-default.png";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import Moment from "react-moment";

const UserDetails = ({ match }) => {
  useFirestoreConnect([{ collection: "userNames" }]);
  useFirestoreConnect([{ collection: "users" }]);
  const userNames = useSelector(state => state.firestore.data.userNames);
  const users = useSelector(state => state.firestore.data.users);
  const user = match.params.id;

  const [searchedUsersUid, setSearchedUsersUid] = useState(undefined);
  const [searchedUser, setSearchedUser] = useState(undefined);

  useEffect(() => {
    if (user && userNames && !searchedUsersUid) {
      if (userNames[user]) {
        setSearchedUsersUid(userNames[user].uid);
      }
    } else if (searchedUsersUid && users) {
      if (users[searchedUsersUid]) {
        setSearchedUser(users[searchedUsersUid]);
      }
    } else {
    }
  }, [user, userNames, searchedUsersUid, users]);

  return (
    <div className="userdetails">
      {searchedUser ? (
        <>
          <div className="userdetails-info">
            <div className="userdetails-avatar">
              <img src={avatar} alt="" />
            </div>
            <span>
              <div className="userdetails-name">{searchedUser.username}</div>
              <div className="userdetails-joined">
                Joined on:
                <Moment id="userdetails-date" format="D MMM YYYY">
                  {searchedUser.joined}
                </Moment>
              </div>
            </span>
          </div>
          <div className="userdetails-stats">
            <div className="userdetails-stat">
              <span>{searchedUser.likedPostsUid ? searchedUser.likedPostsUid.length : "-"}</span>{" "}
              <p>Likes</p>
            </div>
            <div className="userdetails-stat">
              <span>{searchedUser.posts ? searchedUser.posts.length : "-"}</span> <p>Posts</p>
            </div>
            <div className="userdetails-stat">
              <span>{searchedUser.comments ? searchedUser.comments.length : "-"}</span>{" "}
              <p>Comments</p>
            </div>
          </div>
        </>
      ) : (
        <div className="userdetails-empty">Loading...</div>
      )}
    </div>
  );
};

export default UserDetails;
