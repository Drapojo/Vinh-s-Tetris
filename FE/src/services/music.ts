import { appConfigs } from "../configs/app.ts";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = appConfigs.baseUrl;
export const musicApi = createApi({
  reducerPath: "musicApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/music`,
  }),
  tagTypes: ["musics"],
  endpoints: (builder) => ({
    getMusic: builder.query<unknown, void>({
      query: () => "",
      providesTags: ["musics"],
    }),
    addMusic: builder.mutation<unknown, { name: string; url: string }>({
      query: (data) => ({
        url: "",
        method: "POST",
        body: {
          name: data.name,
          url: data.url,
        },
      }),
      invalidatesTags: ["musics"],
    }),
    deleteMusic: builder.mutation<unknown, number>({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["musics"],
    }),
  }),
});

export const { useGetMusicQuery, useDeleteMusicMutation, useAddMusicMutation } = musicApi;
