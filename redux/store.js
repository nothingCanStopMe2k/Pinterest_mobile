import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loadingReducer from "./loading/loadingReducers";
import tabBarBottomReducers from "./tabBarBottom/tabBarBottomReducers";
import userReducer from "./user/userReducers";

const rootReducers = combineReducers({
  loadingReducer,
  tabBarBottomReducers,
  userReducer,
});

const store = createStore(rootReducers, applyMiddleware(thunk));
console.log("STORE REDUX: ", store.getState());
export default store;
