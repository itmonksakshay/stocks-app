import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const apiUrl = import.meta.env.VITE_UPSTOCK_LOGIN_API_URL;
export const upstockAPI = createApi({
    reducerPath: 'upstockAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${apiUrl}/v2/`,
        prepareHeaders(headers) {
            // const token = import.meta.env.VITE_DATA_ACCESS_TOKEN;
            // if (token) {
               headers.set('accept', 'application/json');
               headers.set('Content-Type', 'application/x-www-form-urlencoded');
            // }
            return headers;
        },
    }),
    tagTypes: ["historicalData"],
    endpoints: (builder) => ({
        getLogin: builder.query<any,any>({
            query: ({clientId,redirectUrl,responseType}) =>`login/authorization/dialog?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=${responseType}`,
            transformResponse:(response)=>{
                console.log(response,'response');
                return response;
            }
        }),
        getAccessToken:builder.mutation<any, any>({
            query: (payload) =>{
                return {
                    url: "login/authorization/token",
                    method: "POST",
                    body: new URLSearchParams(payload)
                }
            }
        })
    })
});

export const { useLazyGetLoginQuery,useGetAccessTokenMutation } = upstockAPI;