// meal service

import { apiService } from "../api/apiService";

export const mealSearvice = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMeal: builder.query({
      query: (page) => ({
        url: `meal?page=${page}&limit=${10}`,
        // url: "meal",
        method: "GET",
      }),
    }),

    activeMeal: builder.query({
      query: (postBody) => ({
        url: "meal/active",
        method: "GET",
        body: postBody,
      }),
    }),
    createMeal: builder.mutation({
      query: ({ postBody }) => ({
        url: "meal",
        method: "POST",
        body: postBody,
      }),
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          console.log(data);
          dispatch(
            apiService.util.updateQueryData("getMeal", undefined, (draft) => {
              console.log(JSON.stringify(draft));
              draft?.data?.data?.unshift(data?.dara?.meal);
            })
          );
        });
      },
    }),

    updateMeal: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `meal/${id}`,
        method: "PUT",
        body: postBody,
      }),
    }),
    deleteMeal: builder.mutation({
      query: (id) => ({
        url: `meal/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMealQuery,
  useCreateMealMutation,
  useUpdateMealMutation,
  useDeleteMealMutation,
  useActiveMealQuery,
} = mealSearvice;
