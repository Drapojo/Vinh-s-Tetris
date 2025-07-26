import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { leaderboardApi } from "../services/leaderboard.ts";
import { loginApi } from "../services/login.ts";
import { historyApi } from "../services/history.ts";
import { userApi } from "../services/user.ts";
import { musicApi } from "../services/music.ts";

export const store = configureStore({
  reducer: {
    [leaderboardApi.reducerPath]: leaderboardApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [historyApi.reducerPath]: historyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [musicApi.reducerPath]: musicApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(leaderboardApi.middleware)
      .concat(loginApi.middleware)
      .concat(historyApi.middleware)
      .concat(userApi.middleware)
      .concat(musicApi.middleware),
});

setupListeners(store.dispatch);
