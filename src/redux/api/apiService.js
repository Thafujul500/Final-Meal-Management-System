import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { baseURl } from "../../config";
const getBearerToken = () => {
  return localStorage.getItem("token");
};

const baseQuery = fetchBaseQuery({
  baseUrl: baseURl,
  prepareHeaders: (headers) => {
    let token = getBearerToken();
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiService = createApi({
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
