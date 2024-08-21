// market service

import { apiService } from "../api/apiService";

export const marketService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMarket: builder.query({
      query: (page) => ({
        url: `market?page=${page}&limit=${10}`,
        method: "GET",
      }),
    }),

    // crate Market
    crateMarket: builder.mutation({
      query: ({ postBody }) => ({
        url: "market",
        method: "POST",
        body: postBody,
      }),
    }),

    onQueryStarted(postBody, { dispatch, queryFulfilled }) {
      queryFulfilled.then(({ data }) => {
        console.log(data);

        dispatch(
          apiService.util.updateQueryData("getMarket", undefined, (draft) => {
            draft.unshift(data?.data);
            return draft;
          })
        );
      });
    },

    // update Market
    updateMarket: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `market/${id}`,
        method: "PUT",
        body: postBody,
      }),

      onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          console.log("data", data);

          dispatch(
            apiService.util.updateQueryData("getMarket", undefined, (draft) => {
              const finindex = draft?.data?.data?.find(
                (item) => item?._id === id
              );
              draft[finindex] = data?.data;
              return draft;
            })
          );
        });
      },
    }),

    //delete Market
    deleteMarket: builder.mutation({
      query: (id) => ({
        url: `market/${id}`,
        method: "DELETE",
      }),
      onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        console.log("id", id);

        queryFulfilled;
        queryFulfilled
          .then(({ data }) => {
            dispatch(
              apiService.util.updateQueryData(
                "getMarket",
                undefined,
                (draft) => {
                  return (draft = draft?.filter((item) => item?._id !== id));
                }
              )
            );
          })
          .catch(({ error }) => {
            console.log(error);
          });
      },
    }),
  }),
});
export const {
  useGetMarketQuery,
  useDeleteMarketMutation,
  useCrateMarketMutation,
  useUpdateMarketMutation,
} = marketService;
