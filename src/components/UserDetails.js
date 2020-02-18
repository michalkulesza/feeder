import React, { useEffect, useState } from "react";
import "./UserDetails.scss";
import avatar from "../res/avatar-default.png";
import { useSelector } from "react-redux";
import { useFirestoreConnect } from "react-redux-firebase";
import Moment from "react-moment";

import Post from "./Post";

const UserDetails = ({ match }) => {
  useFirestoreConnect([{ collection: "userNames" }]);
  useFirestoreConnect([{ collection: "users" }]);
  useFirestoreConnect([{ collection: "posts" }]);
  const userNames = useSelector(state => state.firestore.data.userNames);
  const users = useSelector(state => state.firestore.data.users);
  const posts = useSelector(state => state.firestore.ordered.posts);
  const user = match.params.id;

  const [searchedUsersUid, setSearchedUsersUid] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const [activeDisplay, setActiveDisplay] = useState(null);

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
    <>
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
              <div
                className={
                  activeDisplay === "likes" ? "userdetails-stat active" : "userdetails-stat"
                }
                onClick={() => setActiveDisplay("likes")}
              >
                <span>{searchedUser.likedPostsUid ? searchedUser.likedPostsUid.length : "-"}</span>{" "}
                <p>Likes</p>
              </div>
              <div
                className={
                  activeDisplay === "posts" ? "userdetails-stat active" : "userdetails-stat"
                }
                onClick={() => setActiveDisplay("posts")}
              >
                <span>{searchedUser.posts ? searchedUser.posts.length : "-"}</span> <p>Posts</p>
              </div>
            </div>
          </>
        ) : (
          <div className="userdetails-empty">Loading...</div>
        )}
      </div>
      {activeDisplay === "likes" ? (
        searchedUser.likedPostsUid.length > 0 ? (
          searchedUser.likedPostsUid.map(like => {
            return posts.map(post => {
              return (
                post.id === like && (
                  <Post
                    content={post.body}
                    author={post.author}
                    authorsUid={post.uid}
                    postId={post.id}
                    likes={post.likes}
                    likesUid={post.likesUid}
                    likesUsers={post.likesUsers}
                    createdAt={post.createdAt}
                    key={post.id}
                    postKey={post.id}
                    disableLike={true}
                  ></Post>
                )
              );
            });
          })
        ) : (
          <div className="noti-container">
            <span>User didn't liked any post yet...</span>
          </div>
        )
      ) : activeDisplay === "posts" ? (
        searchedUser.posts.length > 0 ? (
          searchedUser.posts.map(userPost => {
            return posts.map(post => {
              return (
                post.id === userPost && (
                  <Post
                    content={post.body}
                    author={post.author}
                    authorsUid={post.uid}
                    postId={post.id}
                    likes={post.likes}
                    likesUid={post.likesUid}
                    likesUsers={post.likesUsers}
                    createdAt={post.createdAt}
                    key={post.id}
                    postKey={post.id}
                    disableLike={true}
                  ></Post>
                )
              );
            });
          })
        ) : (
          <div className="noti-container">
            <span>User doesn't have any posts yet...</span>
          </div>
        )
      ) : null}
    </>
  );
};

export default UserDetails;
