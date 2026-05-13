import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import baseUrl from "../../utils/baseUrl";

export const employeeApi = createApi({
  reducerPath: "employeeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl()}/api/employee`,

    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.adminInfo?.token;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ["Employee"],

  endpoints: (builder) => ({
    addEmployee: builder.mutation({
      query: (data) => ({
        url: "/add-employee",
        method: "POST",
        body: data,
      }),

      invalidatesTags: ["Employee"],
    }),
    getEmployees: builder.query({
        query: () => ({
        url: "/",
        method: "GET",
      }),

      providesTags: ["Employee"],
    }),
  }),
});

export const { useAddEmployeeMutation, useGetEmployeesQuery } = employeeApi;
