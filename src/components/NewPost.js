import React, { useState, useEffect } from "react";
import "./NewPost.scss";
// import TextareaAutosize from "react-textarea-autosize";
import { useDispatch } from "react-redux";
import { addPost } from "../redux/actions/postActions";
import { Editor, EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

import PostMisc from "./PostMisc";
import avatar from "../res/avatar-default.png";

const NewPost = ({ uid, username, users }) => {
  const dispatch = useDispatch();
  const postsInitValue = {
    body: "",
    createdAt: undefined,
    author: username,
    uid,
    likes: 0,
    likesUsers: [],
    likesUid: []
  };

  const [isFocus, setIsFocus] = useState(false);
  const [active, setActive] = useState(false);
  const [post, setPost] = useState(postsInitValue);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorContentInHTML] = useState(null);
  let editor = React.createRef();

  useEffect(() => {
    isFocus ? setActive(true) : setActive(false);
  }, [isFocus]);

  const onEditorChange = editorState => {
    setEditorState(editorState);
    setPost({
      ...postsInitValue,
      body: stateToHTML(editorState.getCurrentContent()),
      createdAt: new Date().toISOString()
    });
    console.log(post.body);
  };

  const handleNewPost = () => {
    post.body.trimLeft();

    if (post.body !== "" && post.createdAt && post.author && post.uid) {
      let currentUserPosts = users[uid].posts;
      dispatch(addPost(post, currentUserPosts));
      setPost(postsInitValue);
      setEditorState(EditorState.createEmpty());
    }
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="post-avatar">
          <img src={avatar} alt="" />
        </div>
        <div className="post-body new-post-body">
          <Editor
            editorState={editorState}
            onChange={onEditorChange}
            placeholder="Say something..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            ref={editor}
          />
        </div>
      </div>
      <div dangerouslySetInnerHTML={editorContentInHTML}></div>
      <PostMisc active={active} handleNewPost={handleNewPost} />
    </div>
  );
};

export default NewPost;
