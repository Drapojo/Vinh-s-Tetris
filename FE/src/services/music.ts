import {appConfigs} from "../configs/app.ts";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const baseUrl = appConfigs.baseUrl;
export const musicApi = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/music`,
  }),
  endpoints: (builder) => ({
    getMusic: builder.query<any, void>({
      query: () => "",
    }),
  }),
});

export const { useGetMusicQuery } = musicApi;