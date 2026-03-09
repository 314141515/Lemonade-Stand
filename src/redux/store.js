import { configureStore } from "@reduxjs/toolkit";
import profitReducer from "./profitSlice";
import cartReducer from "./cartSlice";

const loadState = () => {
  try {
    const serialized = localStorage.getItem("lemonadeState");
    return serialized ? JSON.parse(serialized) : undefined;
  } catch {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem("lemonadeState", JSON.stringify(state));
  } catch {}
};

const store = configureStore({
  reducer: {
    profit: profitReducer,
    cart: cartReducer,
  },
  preloadedState: loadState(),
});

store.subscribe(() => saveState(store.getState()));

export default store;