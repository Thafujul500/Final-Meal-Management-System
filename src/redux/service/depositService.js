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
        queryFulfilled
          .then(({ data }) => {
            console.log(data); // Ok
            dispatch(
              apiService.util.updateQueryData(
                "findDeposit",
                undefined,
                (draft) => {
                  console.log(JSON.stringify(draft));
                  // draft?.data?.data.unshift(data?.data?.deposit);
                }
              )
            );
          })
          .catch((error) => {
            console.log("error", error);
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
