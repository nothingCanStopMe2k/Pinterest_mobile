import { SHOW_COMMENT, HIDE_COMMENT } from "./commentType";

export const showComment = () => {
  return {
    type: SHOW_COMMENT,
  };
};
export const hideComment = () => {
  return {
    type: HIDE_COMMENT,
  };
};
