import { appConfigs } from "../configs/app.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CreateHistories } from "../type/Histories.ts";
import { QueryParam } from "../type/QueryParam.ts";

const baseUrl = appConfigs.baseUrl;
export const historyApi = createApi({
  reducerPath: "historyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/histories`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["histories"],
  endpoints: (builder) => ({
    getHistories: builder.query<any, QueryParam>({
      query: (data) =>
        `?Search=${data.Search}&PageIndex=${data.PageIndex}&PageSize=${data.PageSize}&SortBy=${data.SortBy}&SortOrder=${data.SortOrder}`,
      providesTags: ["histories"],
    }),
    addHistory: builder.mutation<any, CreateHistories>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: {
          Lines: data.Lines,
          Points: data.Points,
          Time: data.Time,
          Level: data.Level,
        },
      }),
      invalidatesTags: ["histories"],
    }),
  }),
});

export const { useAddHistoryMutation, useGetHistoriesQuery } = historyApi;
