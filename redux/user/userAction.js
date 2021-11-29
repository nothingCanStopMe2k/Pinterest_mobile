import { CURRENT_USER } from "./userType";
import { GET_CURRENT_USER } from "./userType";

export const addCurrentUser = (accessToken, userID) => {
  return {
    type: CURRENT_USER,
    payLoad: {
      accessToken,
      userID,
    },
  };
};

export const getCurrentUser = (user) => {
  return {
      type: GET_CURRENT_USER,
      payLoad: user
  }
}
