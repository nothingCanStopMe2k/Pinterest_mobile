import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import loadingReducer from "./loading/loadingReducers";
import tabBarBottomReducers from "./tabBarBottom/tabBarBottomReducers";

const rootReducers = combineReducers({
  loadingReducer,
  tabBarBottomReducers,
});

const store = createStore(rootReducers, applyMiddleware(thunk));
console.log("STORE REDUX: ", store.getState());
export default store;
