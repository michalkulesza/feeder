import { SET_ERROR, REMOVE_ERROR } from "../types";

const initState = {
  login: null,
  register: null
};

const setError = (state = initState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return {
        ...state,
        [action.location]: action.error.message
      };
    case REMOVE_ERROR:
      return {
        ...state,
        [action.location]: action.error
      };
    default:
      return state;
  }
};

export default setError;
