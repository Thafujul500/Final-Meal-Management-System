// market service
import { apiService } from "../api/apiService";

export const marketService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getMarket: builder.query({
      query: () => ({
        // url: `market?page=${page}&limit=${10}`,
        url: "market",
        method: "GET",
      }),
    }),

    // crete cache update
    creteMarket: builder.mutation({
      query: ({ postBody }) => ({
        url: "market",
        method: "POST",
        body: postBody,
      }),
      // cash update
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            console.log(data);

            dispatch(
              apiService.util.updateQueryData(
                "getMarket",
                undefined,
                (draft) => {
                  console.log(JSON.stringify(draft));

                  draft?.data?.data?.unshift(data?.data?.market);
                }
              )
            );
          })
          .catch((error) => {
            console.log("error", error);
          });
      },
    }),

    // update Market
    updateMarket: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `market/${id}`,
        method: "PUT",
        body: postBody,
      }),
      onQueryStarted({ id, postBody }, { dispatch, queryFulfilled }) {
        queryFulfilled;
        queryFulfilled
          .then(({ data }) => {
            dispatch(
              apiService.util.updateQueryData(
                "getMarket",
                undefined,
                (draft) => {
                  let findIndex = draft?.data?.data?.findIndex(
                    (item) => item._id === id
                  );
                  draft.data.data[findIndex] = data?.data;
                }
              )
            );
          })
          .catch(({ error }) => {
            console.log(error);
          });
      },
    }),

    //delete Market
    deleteMarket: builder.mutation({
      query: (id) => ({
        url: `market/${id}`,
        method: "DELETE",
      }),
      onQueryStarted(id, { dispatch, queryFulfilled }) {
        queryFulfilled
          .then(({ data }) => {
            dispatch(
              apiService.util.updateQueryData(
                "getMarket",
                undefined,
                (draft) => {
                  if (draft?.data?.data) {
                    draft.data.data = draft.data.data.filter(
                      (item) => item._id !== id
                    );
                  }
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
  useCreteMarketMutation,
  useUpdateMarketMutation,
} = marketService;
