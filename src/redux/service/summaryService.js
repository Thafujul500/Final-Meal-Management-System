// summary service

import { apiService } from "../api/apiService";

const summaryService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (page) => ({
        url: `summary?page=${page}&limit=${10}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetSummaryQuery } = summaryService;
