import { appConfigs } from "../configs/app.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UpdateUser } from "../type/User.ts";
import { QueryParam } from "../type/QueryParam.ts";

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
  tagTypes: ["user", "users"],
  endpoints: (builder) => ({
    getUsers: builder.query<any, QueryParam>({
      query: (data) =>
        `?Search=${data.Search}&PageIndex=${data.PageIndex}&PageSize=${data.PageSize}&SortBy=${data.SortBy}&SortOrder=${data.SortOrder}`,
      providesTags: ["users"],
    }),
    getUserDetail: builder.query<any, void>({
      query: () => "/user",
      providesTags: ["user"],
    }),
    getUserData: builder.query<any, void>({
      query: () => "/user-data",
    }),
    updateUser: builder.mutation<any, UpdateUser>({
      query: (data) => ({
        url: "/user",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserDataQuery,
  useGetUserDetailQuery,
  useUpdateUserMutation,
} = userApi;
