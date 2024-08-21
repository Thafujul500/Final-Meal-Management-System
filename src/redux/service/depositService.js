// deposit service
import { apiService } from "../api/apiService";

export const depositService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    findDeposit: builder.query({
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
          console.log(`cash update : ${data}`);
          dispatch(
            apiService.util.updateQueryData(
              "getDeposit",
              undefined,
              (draft) => {
                draft?.unshift(data?.data?.deposit);
                return draft;
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
                const finindex = draft?.finindex((item) => item?._id === id);
                return (dispatch[finindex] = data?.data);
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
  useFindDepositQuery,
} = depositService;
