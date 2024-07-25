import { configureStore } from "@reduxjs/toolkit";
import { chartsAPI } from "./api/chartsApi";
import { upstockAPI } from "./api/upstockApi";
import { coreAPI } from "./api/coreApi";

export const store = configureStore({
  reducer: {
    [chartsAPI.reducerPath]: chartsAPI.reducer,
    [upstockAPI.reducerPath]: upstockAPI.reducer,
    [coreAPI.reducerPath]: coreAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      chartsAPI.middleware,
      upstockAPI.middleware,
      coreAPI.middleware,
    ]),
});

export type RootStore = ReturnType<typeof store.getState>;
