import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IHistoryChartDataType, IHistoryChartRequest } from './types/chartsType';

export const coreAPI = createApi({
    reducerPath: 'coreAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: `https://api-v2.upstox.com/`,
        prepareHeaders(headers) {
            const token = localStorage.getItem('accessToken')
            if (token) {
                headers.set('Authorization', "Bearer " + token);            
            }
            return headers;
        },
    }),
    tagTypes: [],
    endpoints: (builder) => ({
        getUpstockUrl: builder.query<any,void>({
            query: () =>"feed/market-data-feed/authorize",
        })
    })
});

export const { useLazyGetUpstockUrlQuery } = coreAPI;