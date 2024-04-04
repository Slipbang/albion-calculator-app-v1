import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {TSortCheckParams, TSortProfitParams} from "../api/api";

export type TQueryParams = {
    serverId: string;
    from: string;
    to: string;
    count: number,
    skip: number,
    profitSort: TSortProfitParams;
    checkSort: TSortCheckParams;
}

const initialState: TQueryParams = {
    serverId: 'aod_west',
    from: 'Fort Sterling',
    to: 'Black Market',
    count: 20,
    skip: 0,
    profitSort: 'BY_PERCENTAGE_PROFIT',
    checkSort: 'BY_LAST_TIME_CHECKED,',
}

const queryParamsSlice = createSlice({
    name: '@transportation',
    initialState,
    reducers: {
        setServer(state, action: PayloadAction<string>){
            state.serverId = action.payload;
        },
        setCityFrom(state, action: PayloadAction<string>){
            state.from = action.payload;
        },
        setCityTo(state, action: PayloadAction<string>){
            state.to = action.payload;
        },
        setProfitSort(state, action: PayloadAction<TSortProfitParams>){
            state.profitSort = action.payload;
        },
        setCheckSort(state, action: PayloadAction<TSortCheckParams>){
            state.checkSort = action.payload;
        },
    }
})

export const queryParamsSliceActions = queryParamsSlice.actions;
export default queryParamsSlice;