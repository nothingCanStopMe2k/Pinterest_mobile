import { CURRENT_USER } from "./userType";
import { GET_CURRENT_USER } from "./userType";

// ========================
// ========================

const initialState = {
  accessToken: "",
  userID: "",
  user: {}
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        accessToken: action.payLoad.accessToken,
        userID: action.payLoad.userID,
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        user: action.payLoad
      };
    default:
      return state;
  }
};

export default userReducer;
