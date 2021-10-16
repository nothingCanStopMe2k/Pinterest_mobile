import { SHOW_VIEWER, HIDE_VIEWER } from "./loadingType";

// ========================
// ========================

const initialState = {
  visible: false,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_VIEWER:
      return {
        ...state,
        visible: true,
      };
    case HIDE_VIEWER:
      return {
        ...state,
        visible: false,
      };
    default:
      return state;
  }
};

export default loadingReducer;
