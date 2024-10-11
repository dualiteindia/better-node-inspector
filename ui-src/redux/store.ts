import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const rootReducer = combineReducers({
  counter: counterReducer,
});

const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

export default makeStore;
