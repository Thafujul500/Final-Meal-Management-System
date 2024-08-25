// deposit service
import { apiService } from "../api/apiService";

export const depositService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    getDeposit: builder.query({
      query: (page) => ({
        url: `deposit?page=${page}&limit=${10}`,
        method: "GET",
      }),
    }),

    createDeposit: builder.mutation({
      query: ({ postBody }) => ({
        url: "deposit",
        method: "POST",
        body: postBody,
      }),
      // cash update
      onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          console.log(data);

          dispatch(
            apiService.util.updateQueryData(
              "getDeposit",
              undefined,
              (draft) => {
                console.log(JSON.stringify(draft));

                // draft?.data?.data.unshift()
              }
            )
          );
        });
      },
    }),

    updateDeposit: builder.mutation({
      query: ({ id, postBody }) => ({
        url: `deposit/${id}`,
        method: "PUT",
        body: postBody,
      }),

      onQueryStarted({ id }, { dispatch, queryFulfilled }) {
        queryFulfilled.then(({ data }) => {
          dispatch(
            apiService.util.updateQueryData(
              "getDeposit",
              undefined,
              (draft) => {
                // const finindex = draft?.finindex((item) => item?._id === id);
                // (draft?.data?.data[finindex] = data?.data);
              }
            )
          );
        });
      },
    }),
    deleteDeposit: builder.mutation({
      query: ({ id }) => ({
        url: `deposit/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateDepositMutation,
  useDeleteDepositMutation,
  useUpdateDepositMutation,
  useGetDepositQuery,
} = depositService;
