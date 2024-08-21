// member service

import { apiService } from "../api/apiService";

export const memberService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMember: builder.query({
      query: (postBody) => ({
        url: "member",
        method: "GET",
        body: postBody,
      }),
    }),
  }),
});

export const { useGetMemberQuery } = memberService;
