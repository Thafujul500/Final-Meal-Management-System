// summary service

import { apiService } from "../api/apiService";

const summaryService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (postBody) => ({
        url: "summary",
        method: "GET",
        body: postBody,
      }),
    }),
  }),
});

export const { useGetSummaryQuery } = summaryService;
