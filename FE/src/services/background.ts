import { appConfigs } from "../configs/app.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = appConfigs.baseUrl;
export const backgroundApi = createApi({
  reducerPath: "backgroundApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/background`,
  }),
  endpoints: (builder) => ({
    getBackground: builder.query<unknown, void>({
      query: () => "",
    }),
  }),
});

export const { useGetBackgroundQuery } = backgroundApi;
