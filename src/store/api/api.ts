import {TransportationData} from "../../types/transportationTypes";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {IItemsData} from "../../types/InfoTableTypes";

export const srcRoute = 'https://render.albiononline.com/v1/item/';
const baseUrl = 'https://albion-profit-calculator.com/api';

//const baseUrlAODP = `https://west.albion-online-data.com`;

export type TSortProfitParams = 'BY_PERCENTAGE_PROFIT' | 'BY_PROFIT' | 'BY_PROFIT_VOLUME';
export type TSortCheckParams = 'BY_LAST_TIME_CHECKED,' | '';

export interface IQueryTransportationParams{
    from: string;
    to: string;
    count: number;
    skip: number;
    serverId: string;
    profitSort: TSortProfitParams;
    checkSort: TSortCheckParams;
}

export interface IQueryItemsParams {
    itemsParams: string;
    isBlackMarket: boolean;
    serverId: string;
}

export const albionApi = createApi({
    reducerPath: 'albion/api',
    baseQuery: fetchBaseQuery({
        baseUrl,
    }),
    endpoints: build => ({
        getTransportationsData: build.query<TransportationData[], IQueryTransportationParams>({
            query: ({from, to, count, skip, profitSort, checkSort, serverId}) => ({
                url: `transportations/sort?from=${from}&to=${to}&count=${count}&skip=${skip}&sort=${checkSort}${profitSort}&serverId=${serverId}`,
            }),
        }),
        getItemsData: build.query<IItemsData[], IQueryItemsParams>({
            query: ({itemsParams, isBlackMarket, serverId}) => ({
                url: `data?items=${itemsParams}&locations=${!!isBlackMarket ? 'Black%20Market,' : ''}Thetford,Bridgewatch,Lymhurst,Caerleon,Martlock,Fort%20Sterling,Brecilien&serverId=${serverId}`,
            })
        }),
    })
})

export const { useGetTransportationsDataQuery, useLazyGetItemsDataQuery, useGetItemsDataQuery} = albionApi;
