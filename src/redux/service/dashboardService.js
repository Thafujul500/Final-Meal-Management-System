// dashboard service

import { apiService } from "../api/apiService";

export const dashBoardService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getDashBoard: builder.query({
      query: (postBody) => ({
        url: "dash-board",
        method: "GET",
        body: postBody,
      }),
    }),
  }),
});

export const { useGetDashBoardQuery } = dashBoardService;
