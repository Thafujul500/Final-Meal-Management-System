import { apiService } from "./../../api/apiService";

export const authService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (postBody) => ({
        url: "/auth/login",
        method: "POST",
        body: postBody,
      }),
    }),
  }),
});

export const { useLoginMutation } = authService;
