import { CURRENT_USER } from "./userType";

// ========================
// ========================

const initialState = {
  accessToken: "",
  userID: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CURRENT_USER:
      return {
        ...state,
        accessToken: action.payLoad.accessToken,
        userID: action.payLoad.userID,
      };
    default:
      return state;
  }
};

export default userReducer;
