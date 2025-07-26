import { appConfigs } from "../configs/app.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QueryParam } from "../type/QueryParam.ts";

const baseUrl = appConfigs.baseUrl;
export const leaderboardApi = createApi({
  reducerPath: "leaderboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/leaderboard`,
  }),
  endpoints: (builder) => ({
    getLeaderboard: builder.query<unknown, QueryParam>({
      query: (data) =>
        `?Search=${data.Search}&PageIndex=${data.PageIndex}&PageSize=${data.PageSize}&SortBy=${data.SortBy}&SortOrder=${data.SortOrder}`,
    }),
  }),
});

export const { useGetLeaderboardQuery } = leaderboardApi;
