
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHistoryChartDataType, IHistoryChartRequest } from './types/chartsType';

export const chartsAPI = createApi({
    reducerPath: 'chartsAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_API_URL}/api/`,
        prepareHeaders(headers) {
            // const token = import.meta.env.VITE_DATA_ACCESS_TOKEN;
            // if (token) {
            //     headers.set('access-token', token);
            // }
            return headers;
        },
    }),
    tagTypes: ["historicalData"],
    endpoints: (builder) => ({
        getHistoricalChart: builder.mutation<IHistoryChartDataType[], IHistoryChartRequest>({
            query: (payload) =>{
                return {
                    url: "historical",
                    method: "POST",
                    body: payload
                }
            }
        })
    })
});

export const { useGetHistoricalChartMutation } = chartsAPI;

