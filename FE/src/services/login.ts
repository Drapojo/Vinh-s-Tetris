import { appConfigs } from "../configs/app.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = appConfigs.baseUrl;
export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/login`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<any, string>({
      query: (code) => ({
        url: "",
        method: "POST",
        body: {
          Code: code,
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = loginApi;
