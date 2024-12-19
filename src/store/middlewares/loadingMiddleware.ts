import {Action, Dispatch, Middleware, MiddlewareAPI} from "@reduxjs/toolkit";

import {albionApi} from "../api/api";
import {interfaceSliceActions} from "../interface/interface-slice";
const {setIsItemsDataLoading} = interfaceSliceActions;

export const loadingMiddleware: Middleware = (store: MiddlewareAPI<Dispatch<Action>>) => (next) => (action) => {
    if (albionApi.endpoints.getItemsData.matchPending(action)) {
        store.dispatch(setIsItemsDataLoading(true));
    }
    if (
        albionApi.endpoints.getItemsData.matchFulfilled(action) ||
        albionApi.endpoints.getItemsData.matchRejected(action)
    ) {
        store.dispatch(setIsItemsDataLoading(false));
    }
    return next(action);
};