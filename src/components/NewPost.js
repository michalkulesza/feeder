import React, { useState, useEffect } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/actions/postActions";

import PostMisc from "./PostMisc";

const NewPost = ({ uid, username }) => {
  const dispatch = useDispatch();
  const postsInitValue = {
    body: "",
    createdAt: undefined,
    author: undefined,
    uid: undefined
  };
  const [isMouseOn, setIsMouseOn] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [active, setActive] = useState(false);
  const [post, setPost] = useState(postsInitValue);

  useEffect(() => {
    if (isMouseOn || isFocus) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [isMouseOn, isFocus]);

  const handleChange = e => {
    setPost({ body: e.target.value, createdAt: new Date().toISOString(), author: username, uid });
  };

  const handleNewPost = () => {
    if (
      post.body !== "" &&
      post.createdAt !== undefined &&
      post.author !== undefined &&
      post.uid !== undefined
    ) {
      dispatch(addPost(post));
      setPost(postsInitValue);
    }
  };

  return (
    <div
      className="post"
      onMouseEnter={() => setIsMouseOn(true)}
      onMouseLeave={() => setIsMouseOn(false)}
    >
      <div className="post-header">
        <div className="post-avatar"></div>
        <div className="post-body new-post-body">
          <TextareaAutosize
            id="textarea"
            onChange={handleChange}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={post.body}
            placeholder="Say something..."
          />
        </div>
      </div>
      <PostMisc active={active} handleNewPost={handleNewPost} />
    </div>
  );
};

export default NewPost;
