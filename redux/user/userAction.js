import { CURRENT_USER } from "./userType";

export const addCurrentUser = (accessToken, userID) => {
  return {
    type: CURRENT_USER,
    payLoad: {
      accessToken,
      userID,
    },
  };
};
