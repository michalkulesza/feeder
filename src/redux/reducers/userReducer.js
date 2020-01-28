import { SET_USER, SET_UNAUTHENTICATED } from "../types";

const initState = {
  authenticated: false,
  uid: null,
  email: null,
  username: null
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_UNAUTHENTICATED:
      console.log("SET UNAUTHENTICATED");
      return initState;
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        uid: action.uid,
        email: action.email,
        username: action.username
      };

    default:
      return state;
  }
};

export default userReducer;
