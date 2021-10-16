import { SHOW_VIEWER, HIDE_VIEWER } from "./loadingType";

export const showLoading = () => {
  return {
    type: SHOW_VIEWER,
  };
};
export const hideLoading = () => {
  return {
    type: HIDE_VIEWER,
  };
};
