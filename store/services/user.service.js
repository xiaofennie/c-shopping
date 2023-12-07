import apiSlice from './api'

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: ({ body }) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    getUserInfo: builder.query({
      query: () => ({
        url: '/api/auth/user',
        method: 'GET',
      }),
      providesTags: ['User'],
    }),

    createUser: builder.mutation({
      query: ({ body }) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    getUsers: builder.query({
      query: ({ page }) => ({
        url: `/api/user?page=${page}`,
        method: 'GET',
      }),
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: 'User',
                id: _id,
              })),
              'User',
            ]
          : ['User'],
    }),
  }),
})

export const { useLoginMutation, useGetUserInfoQuery, useCreateUserMutation, useGetUsersQuery } =
  userApiSlice
