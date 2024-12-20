import {combineReducers, configureStore} from "@reduxjs/toolkit";
import profitSlice from "./profit/profit-slice";
import languageSlice from "./language/language-slice";
import artefactSlice from "./artefacts/artefact-slice";
import {useDispatch} from "react-redux";
import {albionApi} from "./api/api";
import {setupListeners} from "@reduxjs/toolkit/query";
import GMProfitSlice from "./GMProfit/gm-profit-slice";
import interfaceSlice from "./interface/interface-slice";
import queryParamsSlice from "./queryParams/query-params-slice";
import {loadingMiddleware} from "./middlewares/loadingMiddleware";

const rootReducer = combineReducers({
    interface: interfaceSlice.reducer,
    profit: profitSlice.reducer,
    GMProfit: GMProfitSlice.reducer,
    language: languageSlice.reducer,
    artefacts: artefactSlice.reducer,
    transportationQueryParams: queryParamsSlice.reducer,
    [albionApi.reducerPath]: albionApi.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loadingMiddleware, albionApi.middleware),
})

setupListeners(store.dispatch); // для refetchOnFocus!!!

export type RootState = ReturnType<typeof store.getState>;
//export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
