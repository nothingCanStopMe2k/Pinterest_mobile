import { SCROLL_DOWN } from "./tabBarBottomType";

// ========================
// ========================

const initialState = {
  translateY: 0,
  opacity: 1,
};

const tabBarBottomReducers = (state = initialState, action) => {
  switch (action.type) {
    case SCROLL_DOWN:
      return {
        ...state,
        translateY: action.payLoad.data1,
        opacity: action.payLoad.data2,
      };
    default:
      return state;
  }
};

export default tabBarBottomReducers;
