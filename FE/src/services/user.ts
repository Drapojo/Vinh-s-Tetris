import { appConfigs } from "../configs/app.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateUser } from "../type/User.ts";

const baseUrl = appConfigs.baseUrl;
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/users`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["user"],
  endpoints: (builder) => ({
    getUserDetail: builder.query<unknown, void>({
      query: () => "/user",
    }),
    getUserData: builder.query<unknown, void>({
      query: () => "/user-data",
    }),
    updateUser: builder.mutation<unknown, UpdateUser>({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUserDataQuery,
  useGetUserDetailQuery,
  useUpdateUserMutation,
} = userApi;
