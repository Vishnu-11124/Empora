import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import baseUrl from "../../utils/baseUrl";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl()}/api/auth`,
  }),

  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = authApi;
