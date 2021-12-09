import { SHOW_COMMENT, HIDE_COMMENT } from "./commentType";

// ========================
// ========================

const initialState = {
  visible: false,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_COMMENT:
      return {
        ...state,
        visible: true,
      };
    case HIDE_COMMENT:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};

export default commentReducer;
