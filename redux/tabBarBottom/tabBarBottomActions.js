import { SCROLL_DOWN } from "./tabBarBottomType";

export const scrollDownHome = (data1 = 0, data2 = 1) => {
  return {
    type: SCROLL_DOWN,
    payLoad: {
      data1,
      data2,
    },
  };
};
