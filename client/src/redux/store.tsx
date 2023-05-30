// export default
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./redux";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

const makeStore = () => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    devTools: true,
  });
};

const store = makeStore();

// types
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// export stuff

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
