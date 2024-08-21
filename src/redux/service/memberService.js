// member service

import { apiService } from "../api/apiService";

export const memberService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMember: builder.query({
      query: (page) => ({
        url: `member?page=${page}&limit=${10}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMemberQuery } = memberService;
