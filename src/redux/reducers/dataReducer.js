import { GET_POSTS } from "../types";

const initState = {};

const getPosts = (state = initState, action) => {
  switch (action.type) {
    case GET_POSTS:
      return action.docs;
    default:
      return state;
  }
};

export default getPosts;
